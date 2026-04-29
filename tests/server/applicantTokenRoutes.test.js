// @vitest-environment node
import request from 'supertest';

process.env.ADMIN_API_TOKEN = 'admin-test-token';
process.env.APPLICANT_TOKEN_HASH_SECRET = 'route-test-secret';
process.env.OPENAI_API_KEY = 'openai-test-key';

const serverModule = await import('../../server/index.js');
const app = serverModule.default || serverModule;
const originalNodeEnv = process.env.NODE_ENV;

function buildToken(rawToken, overrides = {}) {
  return {
    id: 31,
    careerApplicationId: null,
    applicantName: 'Alex Johnson',
    applicantEmail: 'alex@example.com',
    tokenHash: app.hashApplicantToken(rawToken),
    resumeTokenHash: null,
    expiresAt: new Date(Date.now() + 60_000),
    claimedAt: null,
    usedAt: null,
    revokedAt: null,
    sentAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  };
}

function mockOpenAiScore(overrides = {}) {
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
        concerns: ['None'],
        ...overrides
      })
    })
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  app.locals.prisma = {};
  process.env.NODE_ENV = originalNodeEnv;
});

describe('assessment invite token routes', () => {
  it('creates an http-only admin session cookie for a valid admin key', async () => {
    const response = await request(app)
      .post('/api/admin/session')
      .send({ token: 'admin-test-token' })
      .expect(200);

    expect(response.body).toEqual({ authenticated: true });
    expect(response.headers['set-cookie']?.[0]).toContain('neolabs_admin_session=');
    expect(response.headers['set-cookie']?.[0]).toContain('HttpOnly');
  });

  it('accepts admin keys pasted from env files', async () => {
    const response = await request(app)
      .post('/api/admin/session')
      .send({ token: 'ADMIN_API_TOKEN="admin-test-token"' })
      .expect(200);

    expect(response.body).toEqual({ authenticated: true });
  });

  it('allows admin routes with a valid admin session cookie', async () => {
    app.locals.prisma = {
      applicantToken: {
        findMany: vi.fn().mockResolvedValue([])
      }
    };

    const loginResponse = await request(app)
      .post('/api/admin/session')
      .send({ token: 'admin-test-token' })
      .expect(200);

    await request(app)
      .get('/api/admin/applicant-tokens')
      .set('Cookie', loginResponse.headers['set-cookie'])
      .expect(200);
  });

  it('rejects admin session creation with a wrong admin key', async () => {
    await request(app)
      .post('/api/admin/session')
      .send({ token: 'wrong-token' })
      .expect(401);
  });

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

  it('claims an invite once and returns a separate resume token', async () => {
    const rawToken = app.generateApplicantToken();
    const tx = {
      applicantToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken, {
          claimedAt: new Date(),
          resumeTokenHash: 'stored-resume-token-hash'
        }))
      }
    };
    app.locals.prisma = {
      $transaction: vi.fn((callback) => callback(tx))
    };

    const response = await request(app)
      .post('/api/applicant-tokens/claim')
      .send({ token: rawToken })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.resumeToken).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(response.body.applicant).toEqual({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Prompt Engineer'
    });
    expect(JSON.stringify(response.body)).not.toContain(rawToken);
    expect(tx.applicantToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        tokenHash: app.hashApplicantToken(rawToken),
        claimedAt: null,
        usedAt: null,
        revokedAt: null
      }),
      data: expect.objectContaining({
        claimedAt: expect.any(Date),
        resumeTokenHash: expect.any(String)
      })
    }));
  });

  it('resumes a claimed invite using only the resume token', async () => {
    const rawToken = app.generateApplicantToken();
    const resumeToken = app.generateApplicantToken();
    app.locals.prisma = {
      applicantToken: {
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken, {
          claimedAt: new Date(),
          resumeTokenHash: app.hashApplicantToken(resumeToken)
        }))
      }
    };

    const response = await request(app)
      .post('/api/applicant-tokens/resume')
      .send({ resumeToken })
      .expect(200);

    expect(response.body.valid).toBe(true);
    expect(response.body.applicant).toEqual({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Prompt Engineer'
    });
    expect(app.locals.prisma.applicantToken.findUnique).toHaveBeenCalledWith({
      where: { resumeTokenHash: app.hashApplicantToken(resumeToken) }
    });
  });

  it('does not validate an invite after it has been claimed', async () => {
    const rawToken = app.generateApplicantToken();
    app.locals.prisma = {
      applicantToken: {
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken, {
          claimedAt: new Date(),
          resumeTokenHash: app.hashApplicantToken(app.generateApplicantToken())
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

  it('seeds a dev-only passed assessment fixture', async () => {
    const createdApplication = {
      id: 202,
      name: 'Fixture Applicant',
      email: 'fixture@example.com',
      role: 'Prompt Engineer',
      score: 88,
      passed: true,
      passingScore: 60,
      recommendation: 'pass',
      aiGeneratedRisk: 'low',
      categoryScores: {
        authenticity: 18,
        detail: 17,
        structure: 17,
        processThinking: 18,
        modernTechExperience: 18
      },
      strengths: ['Dev-only fixture for verifying passed assessment flows.'],
      concerns: ['QA fixture only; do not treat as a real applicant assessment.'],
      summary: 'Dev-only seeded passing assessment used to verify the pass flow without impersonating an applicant.',
      createdAt: new Date()
    };
    app.locals.prisma = {
      careerApplication: {
        create: vi.fn().mockResolvedValue(createdApplication)
      }
    };

    const response = await request(app)
      .post('/api/dev/career-assessment/seed-pass')
      .set('x-admin-token', 'admin-test-token')
      .send({ name: 'Fixture Applicant', email: 'fixture@example.com' })
      .expect(201);

    expect(response.body.fixture).toBe(true);
    expect(response.body.assessment).toMatchObject({
      applicationId: 202,
      score: 88,
      passed: true,
      recommendation: 'pass'
    });
    expect(response.body.application).toMatchObject({
      id: 202,
      name: 'Fixture Applicant',
      email: 'fixture@example.com',
      passed: true,
      score: 88
    });
    expect(app.locals.prisma.careerApplication.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        name: 'Fixture Applicant',
        email: 'fixture@example.com',
        passed: true,
        score: 88,
        answerAiTools: expect.stringContaining('DEV FIXTURE')
      })
    }));
  });

  it('creates a secured job offer follow-up link for passed applicants', async () => {
    const application = {
      id: 101,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Prompt Engineer',
      passed: true,
      jobOfferDecision: null,
      contractAgreement: { id: 12 }
    };
    const createdOfferToken = {
      id: 81,
      careerApplicationId: 101,
      expiresAt: new Date(Date.now() + 60_000)
    };
    const tx = {
      jobOfferToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 0 }),
        create: vi.fn().mockResolvedValue(createdOfferToken)
      },
      careerApplication: {
        update: vi.fn().mockResolvedValue({})
      }
    };
    app.locals.prisma = {
      careerApplication: {
        findUnique: vi.fn().mockResolvedValue(application)
      },
      $transaction: vi.fn((callback) => callback(tx))
    };

    const response = await request(app)
      .post('/api/admin/career-applications/101/follow-up')
      .set('x-admin-token', 'admin-test-token')
      .expect(201);

    expect(response.body.offerUrl).toContain('/offer-response?token=');
    expect(tx.jobOfferToken.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        careerApplicationId: 101,
        tokenHash: expect.any(String)
      })
    }));
    expect(tx.careerApplication.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        applicationStatus: 'follow_up_sent',
        followUpSentAt: expect.any(Date)
      })
    }));
  });

  it('validates a usable job offer response token', async () => {
    const rawToken = app.generateApplicantToken();
    app.locals.prisma = {
      jobOfferToken: {
        findUnique: vi.fn().mockResolvedValue({
          id: 91,
          tokenHash: app.hashApplicantToken(rawToken),
          expiresAt: new Date(Date.now() + 60_000),
          usedAt: null,
          revokedAt: null,
          careerApplication: {
            name: 'Alex Johnson',
            email: 'alex@example.com',
            role: 'Prompt Engineer',
            applicationStatus: 'follow_up_sent'
          }
        })
      }
    };

    const response = await request(app)
      .post('/api/job-offer-tokens/validate')
      .send({ token: rawToken })
      .expect(200);

    expect(response.body.valid).toBe(true);
    expect(response.body.applicant).toEqual({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Prompt Engineer',
      status: 'follow_up_sent',
      contractAgreement: null
    });
  });

  it('submits a job offer response and updates application status once', async () => {
    const rawToken = app.generateApplicantToken();
    const offerToken = {
      id: 91,
      careerApplicationId: 101,
      tokenHash: app.hashApplicantToken(rawToken),
      expiresAt: new Date(Date.now() + 60_000),
      usedAt: null,
      revokedAt: null,
      careerApplication: {
        id: 101,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer'
      }
    };
    const tx = {
      jobOfferToken: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 })
      },
      careerApplication: {
        update: vi.fn().mockResolvedValue({})
      }
    };
    app.locals.prisma = {
      jobOfferToken: {
        findUnique: vi.fn().mockResolvedValue(offerToken)
      },
      $transaction: vi.fn((callback) => callback(tx))
    };

    const response = await request(app)
      .post('/api/job-offer-tokens/respond')
      .send({
        token: rawToken,
        earliestStartDate: '2026-05-15',
        mobileNumberGcash: '09171234567',
        hasWorkingComputer: true,
        contractAgreementAccepted: true,
        decision: 'accepted'
      })
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      status: 'job_offer_accepted',
      decision: 'accepted'
    });
    expect(tx.jobOfferToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        tokenHash: app.hashApplicantToken(rawToken),
        usedAt: null,
        revokedAt: null
      }),
      data: expect.objectContaining({
        usedAt: expect.any(Date)
      })
    }));
    expect(tx.careerApplication.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 101 },
      data: expect.objectContaining({
        applicationStatus: 'job_offer_accepted',
        earliestStartDate: expect.any(Date),
        gcashAccountNumber: '09171234567',
        mobileNumber: '09171234567',
        hasWorkingComputer: true,
        contractAgreementAcceptedAt: expect.any(Date),
        jobOfferDecision: 'accepted',
        jobOfferRespondedAt: expect.any(Date)
      })
    }));
  });

  it('requires admin authorization for the dev seed route', async () => {
    await request(app)
      .post('/api/dev/career-assessment/seed-pass')
      .send({ name: 'Fixture Applicant', email: 'fixture@example.com' })
      .expect(401);
  });

  it('disables the dev seed route in production', async () => {
    process.env.NODE_ENV = 'production';

    await request(app)
      .post('/api/dev/career-assessment/seed-pass')
      .set('x-admin-token', 'admin-test-token')
      .send({ name: 'Fixture Applicant', email: 'fixture@example.com' })
      .expect(404);
  });

  it('stores the assessment and consumes the claimed session exactly once', async () => {
    const rawToken = app.generateApplicantToken();
    const resumeToken = app.generateApplicantToken();
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
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken, {
          claimedAt: new Date(),
          resumeTokenHash: app.hashApplicantToken(resumeToken)
        }))
      },
      $transaction: vi.fn((callback) => callback(tx))
    };
    mockOpenAiScore({
      score: 55,
      categoryScores: {
        authenticity: 11,
        detail: 11,
        structure: 11,
        processThinking: 11,
        modernTechExperience: 11
      },
      recommendation: 'decline',
      summary: 'Close score for human review.'
    });

    const response = await request(app)
      .post('/api/career-assessment')
      .send({
        resumeToken,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'Prompt Engineer',
        answers: {
          q1: 'I have used OpenAI to build workflow prompts.',
          q2: 'An API is a contract for systems to exchange data.',
          q3: 'I have worked on automations and chatbot prototypes.'
        },
        ownerAnswers: {
          projectOwnership: 'I can own planning, coordination, delivery, and launch.',
          offsiteSalesFocus: 'I can commit to off-site training and SME sales research weekly.',
          crossFunctionalGrowth: 'Part-time terms are workable for me.',
          passions: 'I enjoy business systems, automations, and practical AI tools.'
        }
      })
      .expect(200);

    expect(response.body.assessment.applicationId).toBe(101);
    expect(tx.applicantToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        resumeTokenHash: app.hashApplicantToken(resumeToken),
        claimedAt: {
          not: null
        },
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
    expect(tx.careerApplication.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        ownerAnswers: {
          projectOwnership: 'I can own planning, coordination, delivery, and launch.',
          offsiteSalesFocus: 'I can commit to off-site training and SME sales research weekly.',
          crossFunctionalGrowth: 'Part-time terms are workable for me.',
          passions: 'I enjoy business systems, automations, and practical AI tools.'
        },
        passed: false,
        recommendation: 'manual_review',
        score: 55
      })
    }));
  });

  it('rejects assessment submissions when the invite profile does not match', async () => {
    const rawToken = app.generateApplicantToken();
    const resumeToken = app.generateApplicantToken();
    app.locals.prisma = {
      applicantToken: {
        findUnique: vi.fn().mockResolvedValue(buildToken(rawToken, {
          claimedAt: new Date(),
          resumeTokenHash: app.hashApplicantToken(resumeToken)
        }))
      }
    };

    const response = await request(app)
      .post('/api/career-assessment')
      .send({
        resumeToken,
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
