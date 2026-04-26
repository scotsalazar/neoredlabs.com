// @vitest-environment node
import request from 'supertest';

process.env.ADMIN_API_TOKEN = 'admin-test-token';
process.env.APPLICANT_TOKEN_HASH_SECRET = 'route-test-secret';
process.env.NEXT_STEP_EMAIL_WEBHOOK_URL = 'https://example.test/next-step-email';

const serverModule = await import('../../server/index.js');
const app = serverModule.default || serverModule;

function buildApplication(overrides = {}) {
  return {
    id: 11,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Prompt Engineer',
    score: 88,
    passed: true,
    passingScore: 70,
    recommendation: 'pass',
    aiGeneratedRisk: 'low',
    summary: 'Strong practical answers.',
    createdAt: new Date(),
    ...overrides
  };
}

function buildToken(rawToken, overrides = {}) {
  return {
    id: 31,
    careerApplicationId: 11,
    tokenHash: app.hashApplicantToken(rawToken),
    expiresAt: new Date(Date.now() + 60_000),
    usedAt: null,
    revokedAt: null,
    sentAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    careerApplication: buildApplication(),
    ...overrides
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  app.locals.prisma = {};
});

describe('applicant token routes', () => {
  it('validates a usable token without returning token material', async () => {
    const rawToken = app.generateApplicantToken();
    app.locals.prisma = {
      applicantToken: {
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken))
      }
    };

    const response = await request(app)
      .post('/api/applicant-tokens/validate')
      .send({ token: rawToken })
      .expect(200);

    expect(response.body.valid).toBe(true);
    expect(response.body.applicant).toEqual({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Prompt Engineer'
    });
    expect(JSON.stringify(response.body)).not.toContain(rawToken);
    expect(JSON.stringify(response.body)).not.toContain(app.hashApplicantToken(rawToken));
  });

  it('returns a generic invalid response for expired tokens', async () => {
    const rawToken = app.generateApplicantToken();
    app.locals.prisma = {
      applicantToken: {
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken, {
          expiresAt: new Date(Date.now() - 60_000)
        }))
      }
    };

    const response = await request(app)
      .post('/api/applicant-tokens/validate')
      .send({ token: rawToken })
      .expect(200);

    expect(response.body).toEqual({ valid: false });
  });

  it('marks a token used when the applicant confirms continuation', async () => {
    const rawToken = app.generateApplicantToken();
    const tx = {
      applicantToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken, { usedAt: new Date() }))
      }
    };

    app.locals.prisma = {
      $transaction: vi.fn((callback) => callback(tx))
    };

    const response = await request(app)
      .post('/api/applicant-tokens/submit')
      .send({ token: rawToken, confirmed: true })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(tx.applicantToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        tokenHash: app.hashApplicantToken(rawToken),
        usedAt: null,
        revokedAt: null
      })
    }));
  });

  it('rejects a reused token on submit', async () => {
    const rawToken = app.generateApplicantToken();
    const tx = {
      applicantToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 0 })
      }
    };

    app.locals.prisma = {
      $transaction: vi.fn((callback) => callback(tx))
    };

    const response = await request(app)
      .post('/api/applicant-tokens/submit')
      .send({ token: rawToken, confirmed: true })
      .expect(400);

    expect(response.body.error).toBe('This link is invalid or has expired.');
  });

  it('requires admin authorization for the career application list', async () => {
    app.locals.prisma = {
      careerApplication: {
        findMany: vi.fn()
      }
    };

    await request(app)
      .get('/api/admin/career-applications?passed=true')
      .expect(401);
  });

  it('sends a next-step email through the configured webhook', async () => {
    const application = buildApplication();
    const createdToken = {
      id: 44,
      expiresAt: new Date(Date.now() + 60_000),
      sentAt: null,
      usedAt: null,
      revokedAt: null
    };

    const tx = {
      applicantToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        create: vi.fn().mockResolvedValue(createdToken)
      }
    };

    app.locals.prisma = {
      careerApplication: {
        findUnique: vi.fn().mockResolvedValue(application)
      },
      applicantToken: {
        update: vi.fn().mockResolvedValue({
          ...createdToken,
          sentAt: new Date()
        })
      },
      $transaction: vi.fn((callback) => callback(tx))
    };

    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    const response = await request(app)
      .post('/api/admin/career-applications/11/next-step-email')
      .set('x-admin-token', 'admin-test-token')
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(JSON.stringify(response.body)).not.toContain('next-step?token=');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.test/next-step-email',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('/next-step?token=')
      })
    );
  });
});
