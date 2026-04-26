// @vitest-environment node
import request from 'supertest';

process.env.ADMIN_API_TOKEN = 'admin-test-token';
process.env.APPLICANT_TOKEN_HASH_SECRET = 'route-test-secret';
process.env.OPENAI_API_KEY = 'openai-test-key';

const serverModule = await import('../../server/index.js');
const app = serverModule.default || serverModule;

function buildToken(rawToken, overrides = {}) {
  return {
    id: 31,
    careerApplicationId: null,
    applicantName: 'Alex Johnson',
    applicantEmail: 'alex@example.com',
    tokenHash: app.hashApplicantToken(rawToken),
    expiresAt: new Date(Date.now() + 60_000),
    usedAt: null,
    revokedAt: null,
    sentAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  };
}

function mockOpenAiScore() {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      output_text: JSON.stringify({
        score: 88,
        categoryScores: {
          authenticity: 18,
          detail: 18,
          structure: 17,
          processThinking: 18,
          modernTechExperience: 17
        },
        aiGeneratedRisk: 'low',
        recommendation: 'pass',
        summary: 'Strong practical answers.',
        strengths: ['Specific examples'],
        concerns: ['None']
      })
    })
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  app.locals.prisma = {};
});

describe('assessment invite token routes', () => {
  it('validates a usable assessment invite without returning token material', async () => {
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

  it('returns a generic invalid response for expired invites', async () => {
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

  it('creates a manual assessment invite link for admins', async () => {
    const createdToken = buildToken(app.generateApplicantToken(), { id: 44 });
    app.locals.prisma = {
      applicantToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 0 }),
        create: vi.fn().mockResolvedValue(createdToken)
      }
    };

    const response = await request(app)
      .post('/api/admin/applicant-tokens')
      .set('x-admin-token', 'admin-test-token')
      .send({ name: 'Alex Johnson', email: 'alex@example.com' })
      .expect(201);

    expect(response.body.inviteUrl).toContain('/careers?token=');
    expect(response.body.token).toMatchObject({
      id: 44,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      status: 'created'
    });
    expect(app.locals.prisma.applicantToken.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        applicantName: 'Alex Johnson',
        applicantEmail: 'alex@example.com'
      })
    }));
  });

  it('requires admin authorization for invite creation', async () => {
    await request(app)
      .post('/api/admin/applicant-tokens')
      .send({ name: 'Alex Johnson', email: 'alex@example.com' })
      .expect(401);
  });

  it('stores the assessment and consumes the invite exactly once', async () => {
    const rawToken = app.generateApplicantToken();
    const createdApplication = {
      id: 101,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Prompt Engineer'
    };
    const tx = {
      applicantToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        update: vi.fn().mockResolvedValue({})
      },
      careerApplication: {
        create: vi.fn().mockResolvedValue(createdApplication)
      }
    };

    app.locals.prisma = {
      applicantToken: {
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken))
      },
      $transaction: vi.fn((callback) => callback(tx))
    };
    mockOpenAiScore();

    const response = await request(app)
      .post('/api/career-assessment')
      .send({
        token: rawToken,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer',
        answers: {
          q1: 'I have used OpenAI to build workflow prompts.',
          q2: 'An API is a contract for systems to exchange data.',
          q3: 'I have worked on automations and chatbot prototypes.'
        }
      })
      .expect(200);

    expect(response.body.assessment.applicationId).toBe(101);
    expect(tx.applicantToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        tokenHash: app.hashApplicantToken(rawToken),
        usedAt: null,
        revokedAt: null
      }),
      data: expect.objectContaining({
        usedAt: expect.any(Date)
      })
    }));
    expect(tx.applicantToken.update).toHaveBeenCalledWith(expect.objectContaining({
      data: { careerApplicationId: 101 }
    }));
  });

  it('rejects assessment submissions when the invite profile does not match', async () => {
    const rawToken = app.generateApplicantToken();
    app.locals.prisma = {
      applicantToken: {
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken))
      }
    };

    const response = await request(app)
      .post('/api/career-assessment')
      .send({
        token: rawToken,
        name: 'Different Person',
        email: 'alex@example.com',
        role: 'Prompt Engineer',
        answers: {
          q1: 'Answer',
          q2: 'Answer',
          q3: 'Answer'
        }
      })
      .expect(400);

    expect(response.body.error).toBe('This assessment invite does not match the applicant profile.');
  });
});
