const express = require('express');
const path = require('node:path');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const prisma = new PrismaClient();
app.locals.prisma = prisma;

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

app.use(express.json());

function parseDateOnly(dateStr) {
  if (typeof dateStr !== 'string' || !DATE_REGEX.test(dateStr)) {
    return null;
  }
  const [year, month, day] = dateStr.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  return utcDate;
}

function startOfNextDay(date) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

function formatDateOnly(date) {
  return date.toISOString().slice(0, 10);
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
    app.locals.prisma = prisma;
    app.listen(port, () => {
      console.log(`Appointments service listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

function shutdown(signal) {
  return async () => {
    console.log(`Received ${signal}. Closing appointments service.`);
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
