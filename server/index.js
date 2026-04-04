const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const defaultBusinessPosts = require('./data/default-business-posts');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const prisma = new PrismaClient();
app.locals.prisma = prisma;

const jobsFilePath = path.join(__dirname, 'data', 'open-positions.json');
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN?.trim() || '';

const DEFAULT_SLOTS = [
  { slot: '09:00', capacity: 5 },
  { slot: '10:00', capacity: 5 },
  { slot: '11:00', capacity: 5 },
  { slot: '13:00', capacity: 5 },
  { slot: '14:00', capacity: 5 },
  { slot: '15:00', capacity: 5 }
];

const SLOT_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIGRATIONS = [
  {
    table: 'SlotAvailability',
    filePath: path.resolve(__dirname, '../prisma/migrations/20231109000000_init/migration.sql')
  },
  {
    table: 'BusinessPost',
    filePath: path.resolve(__dirname, '../prisma/migrations/20260404000100_business_posts/migration.sql')
  }
];

app.use(express.json());

function parseDateOnly(dateStr) {
  if (typeof dateStr !== 'string' || !DATE_REGEX.test(dateStr)) {
    return null;
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function startOfNextDay(date) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

function formatDateOnly(date) {
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(date) {
  if (!date) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
}

function toBusinessPostResponse(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category,
    summary: post.summary,
    content: post.content,
    imageUrl: post.imageUrl,
    publishedAt: post.publishedAt,
    publishedAtLabel: formatDateLabel(post.publishedAt),
    isPublished: post.isPublished,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  };
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseOptionalDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

function isAdminAuthorized(req) {
  if (!ADMIN_TOKEN) {
    return true;
  }

  return req.get('x-admin-token') === ADMIN_TOKEN;
}

function requireAdmin(req, res, next) {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Admin authorization failed.' });
  }

  return next();
}

function validateBusinessPostPayload(body, { partial = false } = {}) {
  const errors = [];
  const data = {};

  const textFields = ['title', 'slug', 'category', 'summary', 'content', 'imageUrl'];
  textFields.forEach((field) => {
    const value = body?.[field];
    if (value === undefined) {
      if (!partial) {
        errors.push(`${field} is required.`);
      }
      return;
    }
    if (typeof value !== 'string' || value.trim().length === 0) {
      errors.push(`${field} must be a non-empty string.`);
      return;
    }
    data[field] = value.trim();
  });

  if (data.slug) {
    data.slug = slugify(data.slug) || slugify(data.title);
  } else if (data.title) {
    data.slug = slugify(data.title);
  }

  if (!partial && !data.slug) {
    errors.push('slug is required.');
  }

  if (body?.isPublished !== undefined) {
    data.isPublished = Boolean(body.isPublished);
  } else if (!partial) {
    data.isPublished = true;
  }

  if (body?.publishedAt !== undefined) {
    const parsedDate = parseOptionalDate(body.publishedAt);
    if (body.publishedAt && !parsedDate) {
      errors.push('publishedAt must be a valid ISO date.');
    } else {
      data.publishedAt = parsedDate;
    }
  } else if (!partial) {
    data.publishedAt = new Date();
  }

  return {
    errors,
    data
  };
}

function parseSqlStatements(sql) {
  return sql
    .split(';')
    .map((statement) =>
      statement
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .trim()
    )
    .filter(Boolean);
}

async function tableExists(tableName) {
  const result = await prisma.$queryRawUnsafe(
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name = '${tableName}' LIMIT 1;`
  );

  return Array.isArray(result) && result.length > 0;
}

async function applyMigrationFile(filePath) {
  const sql = await fs.promises.readFile(filePath, 'utf8');
  const statements = parseSqlStatements(sql);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
  }
}

async function ensureDatabaseSchema() {
  for (const migration of MIGRATIONS) {
    const exists = await tableExists(migration.table);
    if (!exists) {
      await applyMigrationFile(migration.filePath);
    }
  }
}

async function ensureSlotsForDate(slotDate) {
  const endOfDay = startOfNextDay(slotDate);
  const existing = await prisma.slotAvailability.findMany({
    where: {
      slotDate: {
        gte: slotDate,
        lt: endOfDay
      }
    }
  });

  if (existing.length > 0) {
    return existing;
  }

  return prisma.$transaction(async (tx) => {
    const baseDate = slotDate.getTime();
    const creations = DEFAULT_SLOTS.map((config) =>
      tx.slotAvailability.create({
        data: {
          slotDate: new Date(baseDate),
          slot: config.slot,
          capacity: config.capacity
        }
      })
    );
    return Promise.all(creations);
  });
}

async function loadSlotsWithCounts(slotDate) {
  const endOfDay = startOfNextDay(slotDate);
  return prisma.slotAvailability.findMany({
    where: {
      slotDate: {
        gte: slotDate,
        lt: endOfDay
      }
    },
    orderBy: { slot: 'asc' },
    include: {
      _count: {
        select: { appointments: true }
      }
    }
  });
}

async function ensureDefaultBusinessPosts() {
  for (const post of defaultBusinessPosts) {
    const exists = await prisma.businessPost.findUnique({
      where: { slug: post.slug }
    });

    if (!exists) {
      await prisma.businessPost.create({
        data: {
          ...post,
          publishedAt: post.publishedAt ? new Date(post.publishedAt) : null
        }
      });
    }
  }
}

app.get('/api/jobs', async (_req, res) => {
  try {
    const raw = await fs.promises.readFile(jobsFilePath, 'utf8');
    const jobs = JSON.parse(raw);

    const response = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      team: job.team,
      location: job.location,
      applyUrl: job.applyUrl,
    }));

    return res.json({ jobs: response });
  } catch (error) {
    console.error('Failed to load job openings', error);
    return res.status(500).json({ error: 'Unable to load job openings' });
  }
});

app.get('/api/business-posts', async (_req, res) => {
  try {
    const posts = await prisma.businessPost.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }]
    });

    return res.json({ posts: posts.map(toBusinessPostResponse) });
  } catch (error) {
    console.error('Failed to load business posts', error);
    return res.status(500).json({ error: 'Unable to load business posts' });
  }
});

app.get('/api/business-posts/:slug', async (req, res) => {
  try {
    const post = await prisma.businessPost.findUnique({
      where: { slug: req.params.slug }
    });

    if (!post || !post.isPublished) {
      return res.status(404).json({ error: 'Business post not found.' });
    }

    return res.json({ post: toBusinessPostResponse(post) });
  } catch (error) {
    console.error('Failed to load business post', error);
    return res.status(500).json({ error: 'Unable to load business post' });
  }
});

app.get('/api/admin/business-posts', requireAdmin, async (_req, res) => {
  try {
    const posts = await prisma.businessPost.findMany({
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }]
    });
    return res.json({ posts: posts.map(toBusinessPostResponse) });
  } catch (error) {
    console.error('Failed to load admin business posts', error);
    return res.status(500).json({ error: 'Unable to load admin business posts' });
  }
});

app.post('/api/admin/business-posts', requireAdmin, async (req, res) => {
  const { errors, data } = validateBusinessPostPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] });
  }

  try {
    const existing = await prisma.businessPost.findUnique({
      where: { slug: data.slug }
    });

    if (existing) {
      return res.status(409).json({ error: 'A business post with that slug already exists.' });
    }

    const created = await prisma.businessPost.create({
      data
    });

    return res.status(201).json({ post: toBusinessPostResponse(created) });
  } catch (error) {
    console.error('Failed to create business post', error);
    return res.status(500).json({ error: 'Unable to create business post' });
  }
});

app.put('/api/admin/business-posts/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid business post id.' });
  }

  const { errors, data } = validateBusinessPostPayload(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] });
  }

  try {
    const existing = await prisma.businessPost.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Business post not found.' });
    }

    if (data.slug && data.slug !== existing.slug) {
      const slugTaken = await prisma.businessPost.findUnique({ where: { slug: data.slug } });
      if (slugTaken) {
        return res.status(409).json({ error: 'A business post with that slug already exists.' });
      }
    }

    const updated = await prisma.businessPost.update({
      where: { id },
      data
    });

    return res.json({ post: toBusinessPostResponse(updated) });
  } catch (error) {
    console.error('Failed to update business post', error);
    return res.status(500).json({ error: 'Unable to update business post' });
  }
});

app.delete('/api/admin/business-posts/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid business post id.' });
  }

  try {
    await prisma.businessPost.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete business post', error);
    return res.status(500).json({ error: 'Unable to delete business post' });
  }
});

app.get('/api/available-slots', async (req, res) => {
  try {
    const { date } = req.query;
    const parsedDate = parseDateOnly(date);
    if (!parsedDate) {
      return res.status(400).json({ error: 'Invalid or missing date parameter. Use YYYY-MM-DD.' });
    }

    await ensureSlotsForDate(parsedDate);
    const slots = await loadSlotsWithCounts(parsedDate);

    const response = slots.map((slot) => {
      const remaining = Math.max(slot.capacity - slot._count.appointments, 0);
      return {
        id: slot.id,
        date: formatDateOnly(slot.slotDate),
        slot: slot.slot,
        capacity: slot.capacity,
        booked: slot._count.appointments,
        remaining,
        isAvailable: remaining > 0
      };
    });

    return res.json({ date: formatDateOnly(parsedDate), slots: response });
  } catch (error) {
    console.error('Failed to load available slots', error);
    return res.status(500).json({ error: 'Unable to load available slots' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { fullName, email, notes, date, slot } = req.body || {};

    if (typeof fullName !== 'string' || fullName.trim().length === 0) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (typeof slot !== 'string' || !SLOT_REGEX.test(slot.trim())) {
      return res.status(400).json({ error: 'Slot must be provided as HH:MM (24h).' });
    }

    const parsedDate = parseDateOnly(date);
    if (!parsedDate) {
      return res.status(400).json({ error: 'A valid date (YYYY-MM-DD) is required.' });
    }

    const normalizedSlot = slot.trim();

    let slotAvailability = await prisma.slotAvailability.findUnique({
      where: {
        slotDate_slot: {
          slotDate: parsedDate,
          slot: normalizedSlot
        }
      }
    });

    if (!slotAvailability) {
      await ensureSlotsForDate(parsedDate);
      slotAvailability = await prisma.slotAvailability.findUnique({
        where: {
          slotDate_slot: {
            slotDate: parsedDate,
            slot: normalizedSlot
          }
        }
      });
    }

    if (!slotAvailability) {
      return res.status(404).json({ error: 'Requested slot is unavailable.' });
    }

    const existingCount = await prisma.appointment.count({
      where: { slotAvailabilityId: slotAvailability.id }
    });

    if (existingCount >= slotAvailability.capacity) {
      return res.status(409).json({ error: 'Requested slot is fully booked.' });
    }

    const created = await prisma.appointment.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        notes: typeof notes === 'string' && notes.trim().length > 0 ? notes.trim() : null,
        slotAvailability: {
          connect: { id: slotAvailability.id }
        }
      },
      include: {
        slotAvailability: true
      }
    });

    return res.status(201).json({
      id: created.id,
      fullName: created.fullName,
      email: created.email,
      notes: created.notes,
      slot: created.slotAvailability.slot,
      date: formatDateOnly(created.slotAvailability.slotDate),
      createdAt: created.createdAt
    });
  } catch (error) {
    console.error('Failed to create appointment', error);
    return res.status(500).json({ error: 'Unable to create appointment' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const port = process.env.PORT || 4000;

async function start() {
  try {
    await prisma.$connect();
    await ensureDatabaseSchema();
    await ensureDefaultBusinessPosts();
    app.locals.prisma = prisma;
    app.listen(port, () => {
      console.log(`NeoLabs API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

function shutdown(signal) {
  return async () => {
    console.log(`Received ${signal}. Closing NeoLabs API.`);
    await prisma.$disconnect().catch((err) => {
      console.error('Error disconnecting Prisma', err);
    });
    process.exit(0);
  };
}

if (require.main === module) {
  start();
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, shutdown(signal));
  });
}

module.exports = app;
