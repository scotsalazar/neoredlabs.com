const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const defaultBusinessPosts = require('./data/default-business-posts');
const openPositions = require('./data/open-positions.json');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function normalizeEnvValue(value) {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function normalizeAdminTokenInput(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return normalizeEnvValue(value.replace(/^ADMIN_API_TOKEN\s*=\s*/i, ''));
}

[
  'DATABASE_URL',
  'ADMIN_API_TOKEN',
  'ADMIN_SESSION_SECRET',
  'OPENAI_API_KEY',
  'OPENAI_ASSESSMENT_MODEL',
  'APPLICANT_TOKEN_HASH_SECRET',
  'APPLICANT_TOKEN_TTL_DAYS',
  'CAREERS_BASE_URL',
  'NEXT_STEP_EMAIL_WEBHOOK_URL',
  'APPLICATION_RECEIVED_WEBHOOK_URL'
].forEach((key) => {
  if (process.env[key] !== undefined) {
    process.env[key] = normalizeEnvValue(process.env[key]);
  }
});

const app = express();
const prisma = new PrismaClient();
app.locals.prisma = prisma;

const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN?.trim() || '';
const ADMIN_SESSION_COOKIE = 'neolabs_admin_session';
const ADMIN_SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim() || '';
const OPENAI_ASSESSMENT_MODEL = process.env.OPENAI_ASSESSMENT_MODEL?.trim() || 'gpt-5.4-nano';
const CAREER_ASSESSMENT_PASSING_SCORE = 60;
const CAREER_ASSESSMENT_MANUAL_REVIEW_SCORE = 50;
const APPLICANT_TOKEN_HASH_SECRET =
  process.env.APPLICANT_TOKEN_HASH_SECRET?.trim() ||
  ADMIN_TOKEN ||
  'development-applicant-token-secret-change-me';
const APPLICANT_TOKEN_TTL_DAYS = Math.max(
  1,
  Math.round(Number(process.env.APPLICANT_TOKEN_TTL_DAYS || 7)) || 7
);
const CAREERS_BASE_URL = (process.env.CAREERS_BASE_URL?.trim() || 'https://careers.neoredlabs.com')
  .replace(/\/+$/, '');
const NEXT_STEP_EMAIL_WEBHOOK_URL = process.env.NEXT_STEP_EMAIL_WEBHOOK_URL?.trim() || '';
const APPLICATION_RECEIVED_WEBHOOK_URL = process.env.APPLICATION_RECEIVED_WEBHOOK_URL?.trim() || '';
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET?.trim() ||
  APPLICANT_TOKEN_HASH_SECRET ||
  ADMIN_TOKEN ||
  'development-admin-session-secret-change-me';

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
const TOKEN_REGEX = /^[A-Za-z0-9_-]{32,}$/;
const PHONE_REGEX = /^[+0-9 ()-]{7,24}$/;
const GCASH_REGEX = /^[0-9 +()-]{7,32}$/;
const CONTRACT_PDF_MAX_BYTES = 10 * 1024 * 1024;
const APPLICATION_STATUSES = {
  ASSESSMENT_COMPLETED: 'assessment_completed',
  FOLLOW_UP_SENT: 'follow_up_sent',
  JOB_OFFER_ACCEPTED: 'job_offer_accepted',
  JOB_OFFER_DECLINED: 'job_offer_declined'
};
const CAREER_ASSESSMENT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    score: {
      type: 'integer',
      minimum: 1,
      maximum: 100
    },
    categoryScores: {
      type: 'object',
      additionalProperties: false,
      properties: {
        authenticity: { type: 'integer', minimum: 0, maximum: 20 },
        detail: { type: 'integer', minimum: 0, maximum: 20 },
        structure: { type: 'integer', minimum: 0, maximum: 20 },
        processThinking: { type: 'integer', minimum: 0, maximum: 20 },
        modernTechExperience: { type: 'integer', minimum: 0, maximum: 20 }
      },
      required: [
        'authenticity',
        'detail',
        'structure',
        'processThinking',
        'modernTechExperience'
      ]
    },
    aiGeneratedRisk: {
      type: 'string',
      enum: ['low', 'medium', 'high']
    },
    recommendation: {
      type: 'string',
      enum: ['pass', 'manual_review', 'decline']
    },
    summary: {
      type: 'string'
    },
    strengths: {
      type: 'array',
      items: { type: 'string' }
    },
    concerns: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: [
    'score',
    'categoryScores',
    'aiGeneratedRisk',
    'recommendation',
    'summary',
    'strengths',
    'concerns'
  ]
};
app.set('trust proxy', 1);
app.use(express.json());

function clampInteger(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, Math.round(number)));
}

function getResponseOutputText(responseData) {
  if (typeof responseData?.output_text === 'string') {
    return responseData.output_text;
  }

  const outputItems = Array.isArray(responseData?.output) ? responseData.output : [];

  for (const item of outputItems) {
    const contentItems = Array.isArray(item?.content) ? item.content : [];
    for (const content of contentItems) {
      if (typeof content?.text === 'string') {
        return content.text;
      }
    }
  }

  return '';
}

function normalizeCareerAssessment(rawAssessment) {
  const categoryScores = {
    authenticity: clampInteger(rawAssessment?.categoryScores?.authenticity, 0, 20),
    detail: clampInteger(rawAssessment?.categoryScores?.detail, 0, 20),
    structure: clampInteger(rawAssessment?.categoryScores?.structure, 0, 20),
    processThinking: clampInteger(rawAssessment?.categoryScores?.processThinking, 0, 20),
    modernTechExperience: clampInteger(rawAssessment?.categoryScores?.modernTechExperience, 0, 20)
  };
  const computedScore = Object.values(categoryScores).reduce((sum, value) => sum + value, 0);
  const score = clampInteger(computedScore || rawAssessment?.score, 1, 100);
  const passed = score >= CAREER_ASSESSMENT_PASSING_SCORE;
  const requiresManualReview = !passed && score >= CAREER_ASSESSMENT_MANUAL_REVIEW_SCORE;

  return {
    score,
    passed,
    passingScore: CAREER_ASSESSMENT_PASSING_SCORE,
    categoryScores,
    aiGeneratedRisk: ['low', 'medium', 'high'].includes(rawAssessment?.aiGeneratedRisk)
      ? rawAssessment.aiGeneratedRisk
      : 'medium',
    recommendation: passed
      ? 'pass'
      : requiresManualReview
        ? 'manual_review'
        : rawAssessment?.recommendation === 'decline'
          ? 'decline'
          : 'manual_review',
    summary: typeof rawAssessment?.summary === 'string'
      ? rawAssessment.summary.slice(0, 320)
      : 'Assessment completed.',
    strengths: Array.isArray(rawAssessment?.strengths) && rawAssessment.strengths.length > 0
      ? rawAssessment.strengths.slice(0, 3).map((item) => String(item).slice(0, 180))
      : ['Submitted answers were reviewed.'],
    concerns: Array.isArray(rawAssessment?.concerns) && rawAssessment.concerns.length > 0
      ? rawAssessment.concerns.slice(0, 3).map((item) => String(item).slice(0, 180))
      : ['No detailed concern was provided.']
  };
}

function buildDevPassingAssessment() {
  return {
    score: 88,
    passed: true,
    passingScore: CAREER_ASSESSMENT_PASSING_SCORE,
    recommendation: 'pass',
    aiGeneratedRisk: 'low',
    categoryScores: {
      authenticity: 18,
      detail: 17,
      structure: 17,
      processThinking: 18,
      modernTechExperience: 18
    },
    strengths: [
      'Dev-only fixture for verifying passed assessment flows.',
      'Shows practical AI, API, and workflow signals.',
      'Avoids submitting fabricated candidate answers.'
    ],
    concerns: ['QA fixture only; do not treat as a real applicant assessment.'],
    summary: 'Dev-only seeded passing assessment used to verify the pass flow without impersonating an applicant.'
  };
}

async function sendApplicationReceivedWebhook({ application, assessment, answers, ownerAnswers }) {
  if (!APPLICATION_RECEIVED_WEBHOOK_URL) {
    return { skipped: true };
  }

  try {
    const response = await fetch(APPLICATION_RECEIVED_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        type: 'career_application_received',
        event: 'application_received',
        submittedAt: new Date().toISOString(),
        applicant: {
          name: application.name,
          email: application.email,
          role: application.role
        },
        application: {
          id: application.id,
          status: application.applicationStatus,
          createdAt: application.createdAt
        },
        answers,
        ownerAnswers,
        assessment: {
          score: assessment.score,
          passed: assessment.passed,
          passingScore: assessment.passingScore,
          recommendation: assessment.recommendation,
          aiGeneratedRisk: assessment.aiGeneratedRisk,
          categoryScores: assessment.categoryScores,
          strengths: assessment.strengths,
          concerns: assessment.concerns,
          summary: assessment.summary
        },
        replyEmailContext: {
          subject: 'Application received - NeoLabs Prompt Engineer',
          message:
            'Your Prompt Engineer profile has been received. It will undergo human review, and we will contact you via email for further details if selected.'
        }
      })
    });

    if (!response.ok) {
      console.warn('Application received webhook returned a non-OK response.');
      return { success: false, status: response.status };
    }

    return { success: true, status: response.status };
  } catch (error) {
    console.warn('Application received webhook failed.', error);
    return { success: false };
  }
}

async function scoreCareerAssessment({ name, role, answers }) {
  const payload = {
    model: OPENAI_ASSESSMENT_MODEL,
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: [
              'You are assessing a junior Prompt Engineer application for Neo Redlabs Studio.',
              'Return only the structured JSON requested by the schema.',
              'Score from 1 to 100. A score of 60 or higher passes. Scores from 50 to 59 should be treated as manual_review, not a final fail.',
              'Use these five 20-point categories: authenticity, detail, structure, processThinking, modernTechExperience.',
              'Authenticity means the answer sounds specific, personal, and non-generic. You may estimate AI-generated risk from style and specificity, but do not claim certainty.',
              'Reward clear process thinking, concrete examples, actual experience with modern tools, and practical understanding of APIs, AI tools, mobile apps, chatbots, automations, or workflows.',
              'Penalize vague claims, generic AI-sounding answers, missing process, no real examples, or no evidence of modern tech experience.',
              'The final score should equal the sum of the five category scores.'
            ].join(' ')
          }
        ]
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: JSON.stringify({
              candidateName: name,
              role,
              questions: [
                {
                  criterion: 'AI tool experience',
                  question: 'What experience do you have with Claude, OpenAI, or other AI tools?',
                  answer: answers.q1
                },
                {
                  criterion: 'API understanding',
                  question: 'In your own words, what is an API?',
                  answer: answers.q2
                },
                {
                  criterion: 'Modern app/workflow experience',
                  question: 'Have you worked on mobile applications, chatbots, automations, or AI workflows before?',
                  answer: answers.q3
                }
              ]
            })
          }
        ]
      }
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'career_assessment_score',
        strict: true,
        schema: CAREER_ASSESSMENT_SCHEMA
      }
    },
    max_output_tokens: 900
  };

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = responseData?.error?.message || 'OpenAI assessment request failed.';
    throw new Error(message);
  }

  const outputText = getResponseOutputText(responseData);
  if (!outputText) {
    throw new Error('OpenAI assessment returned no structured output.');
  }

  return normalizeCareerAssessment(JSON.parse(outputText));
}

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

function timingSafeStringEqual(actual, expected) {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);

  return (
    actualBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

function isAdminTokenValid(token) {
  if (!ADMIN_TOKEN) {
    return false;
  }

  return timingSafeStringEqual(normalizeAdminTokenInput(token), ADMIN_TOKEN);
}

function parseCookies(header = '') {
  return header.split(';').reduce((cookies, part) => {
    const index = part.indexOf('=');
    if (index === -1) return cookies;

    const name = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (!name) return cookies;

    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
}

function signAdminSessionPayload(payload) {
  return crypto
    .createHmac('sha256', ADMIN_SESSION_SECRET)
    .update(payload)
    .digest('base64url');
}

function createAdminSessionValue(now = new Date()) {
  const expiresAt = now.getTime() + ADMIN_SESSION_TTL_MS;
  const nonce = crypto.randomBytes(16).toString('base64url');
  const payload = `${expiresAt}.${nonce}`;
  const signature = signAdminSessionPayload(payload);

  return `${payload}.${signature}`;
}

function verifyAdminSessionValue(value, now = new Date()) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const parts = value.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const [expiresAtRaw, nonce, signature] = parts;
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= now.getTime() || !nonce || !signature) {
    return false;
  }

  return timingSafeStringEqual(signature, signAdminSessionPayload(`${expiresAtRaw}.${nonce}`));
}

function getAdminSession(req) {
  const cookies = parseCookies(req.get('cookie') || '');
  return cookies[ADMIN_SESSION_COOKIE] || '';
}

function setAdminSessionCookie(req, res) {
  const secure = req.secure || req.get('x-forwarded-proto') === 'https' || process.env.NODE_ENV === 'production';
  const parts = [
    `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(createAdminSessionValue())}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${Math.floor(ADMIN_SESSION_TTL_MS / 1000)}`
  ];

  if (secure) {
    parts.push('Secure');
  }

  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearAdminSessionCookie(res) {
  res.setHeader('Set-Cookie', `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

function isAdminAuthorized(req) {
  if (isAdminTokenValid(req.get('x-admin-token') || '')) {
    return true;
  }

  return verifyAdminSessionValue(getAdminSession(req));
}

function requireAdmin(req, res, next) {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Admin authorization failed.' });
  }

  return next();
}

function requireDevTool(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found.' });
  }

  if (ADMIN_TOKEN && !isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Admin authorization failed.' });
  }

  return next();
}

function getPrismaClient(req) {
  return req?.app?.locals?.prisma || prisma;
}

function generateApplicantToken() {
  return crypto.randomBytes(32).toString('base64url');
}

function hashApplicantToken(token, secret = APPLICANT_TOKEN_HASH_SECRET) {
  if (typeof token !== 'string' || !TOKEN_REGEX.test(token)) {
    return null;
  }

  return crypto
    .createHmac('sha256', secret)
    .update(token)
    .digest('hex');
}

function buildNextStepUrl(token) {
  return `${CAREERS_BASE_URL}/next-step?token=${encodeURIComponent(token)}`;
}

function buildAssessmentInviteUrl(token) {
  return `${CAREERS_BASE_URL}/careers?token=${encodeURIComponent(token)}`;
}

function buildJobOfferUrl(token) {
  return `${CAREERS_BASE_URL}/offer-response?token=${encodeURIComponent(token)}`;
}

function getApplicantTokenExpiry(now = new Date()) {
  return new Date(now.getTime() + APPLICANT_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
}

function getJobOfferTokenExpiry(now = new Date()) {
  return getApplicantTokenExpiry(now);
}

function getApplicantTokenStatus(token) {
  if (!token) return 'none';
  if (token.usedAt) return 'used';
  if (token.revokedAt) return 'revoked';
  if (new Date(token.expiresAt).getTime() <= Date.now()) return 'expired';
  if (token.claimedAt) return 'in_progress';
  if (token.sentAt) return 'sent';
  return 'created';
}

function sanitizeContractFileName(fileName) {
  const fallback = 'contract-agreement.pdf';
  const baseName = path.basename(typeof fileName === 'string' ? fileName : fallback)
    .replace(/[^\w .()-]/g, '_')
    .trim();
  const normalized = baseName || fallback;
  const withExtension = normalized.toLowerCase().endsWith('.pdf')
    ? normalized
    : `${normalized}.pdf`;

  return withExtension.slice(0, 160);
}

function isPdfBuffer(buffer) {
  return Buffer.isBuffer(buffer) && buffer.length > 4 && buffer.subarray(0, 4).toString('utf8') === '%PDF';
}

function toContractAgreementResponse(contractAgreement) {
  if (!contractAgreement) return null;

  return {
    fileName: contractAgreement.fileName,
    contentType: contractAgreement.contentType,
    uploadedAt: contractAgreement.uploadedAt,
    updatedAt: contractAgreement.updatedAt
  };
}

function isApplicantTokenUsable(token, now = new Date()) {
  return Boolean(
    token &&
    !token.usedAt &&
    !token.revokedAt &&
    !token.claimedAt &&
    new Date(token.expiresAt).getTime() > now.getTime()
  );
}

function isApplicantTokenResumable(token, now = new Date()) {
  return Boolean(
    token &&
    token.claimedAt &&
    !token.usedAt &&
    !token.revokedAt &&
    new Date(token.expiresAt).getTime() > now.getTime()
  );
}

function toCareerApplicationResponse(application) {
  const latestToken = Array.isArray(application.applicantTokens)
    ? application.applicantTokens[0]
    : null;
  const latestOfferToken = Array.isArray(application.jobOfferTokens)
    ? application.jobOfferTokens[0]
    : null;

  return {
    id: application.id,
    name: application.name,
    email: application.email,
    role: application.role,
    answers: {
      aiTools: application.answerAiTools,
      api: application.answerApi,
      modernWorkflows: application.answerModernWorkflows
    },
    ownerAnswers: application.ownerAnswers || {},
    score: application.score,
    passed: application.passed,
    passingScore: application.passingScore,
    recommendation: application.recommendation,
    aiGeneratedRisk: application.aiGeneratedRisk,
    categoryScores: application.categoryScores,
    strengths: application.strengths,
    concerns: application.concerns,
    summary: application.summary,
    applicationStatus: application.applicationStatus,
    followUpSentAt: application.followUpSentAt,
    earliestStartDate: application.earliestStartDate,
    gcashAccountNumber: application.gcashAccountNumber,
    mobileNumber: application.mobileNumber,
    hasWorkingComputer: application.hasWorkingComputer,
    contractAgreement: toContractAgreementResponse(application.contractAgreement),
    contractAgreementAcceptedAt: application.contractAgreementAcceptedAt,
    jobOfferDecision: application.jobOfferDecision,
    jobOfferRespondedAt: application.jobOfferRespondedAt,
    createdAt: application.createdAt,
    latestToken: latestToken
      ? {
          id: latestToken.id,
          status: getApplicantTokenStatus(latestToken),
          expiresAt: latestToken.expiresAt,
          usedAt: latestToken.usedAt,
          revokedAt: latestToken.revokedAt,
          sentAt: latestToken.sentAt
        }
      : null,
    latestOfferToken: latestOfferToken
      ? {
          id: latestOfferToken.id,
          expiresAt: latestOfferToken.expiresAt,
          usedAt: latestOfferToken.usedAt,
          revokedAt: latestOfferToken.revokedAt
        }
      : null
  };
}

function toApplicantPrefill(application) {
  return {
    name: application.name,
    email: application.email,
    role: application.role
  };
}

function toApplicantTokenPrefill(token) {
  return {
    name: token.applicantName,
    email: token.applicantEmail,
    role: 'Prompt Engineer'
  };
}

function toApplicantTokenResponse(token) {
  return {
    id: token.id,
    name: token.applicantName,
    email: token.applicantEmail,
    status: getApplicantTokenStatus(token),
    expiresAt: token.expiresAt,
    usedAt: token.usedAt,
    revokedAt: token.revokedAt,
    claimedAt: token.claimedAt,
    sentAt: token.sentAt,
    createdAt: token.createdAt,
    careerApplicationId: token.careerApplicationId,
    applicationPassed: token.careerApplication?.passed ?? null
  };
}

async function findUsableApplicantToken(prismaClient, rawToken) {
  const tokenHash = hashApplicantToken(rawToken);
  if (!tokenHash) return null;

  const token = await prismaClient.applicantToken.findUnique({
    where: { tokenHash }
  });

  return isApplicantTokenUsable(token) ? token : null;
}

async function findResumableApplicantToken(prismaClient, rawResumeToken) {
  const resumeTokenHash = hashApplicantToken(rawResumeToken);
  if (!resumeTokenHash) return null;

  const token = await prismaClient.applicantToken.findUnique({
    where: { resumeTokenHash }
  });

  return isApplicantTokenResumable(token) ? token : null;
}

function isJobOfferTokenUsable(token, now = new Date()) {
  return Boolean(
    token &&
    !token.usedAt &&
    !token.revokedAt &&
    new Date(token.expiresAt).getTime() > now.getTime()
  );
}

async function findUsableJobOfferToken(prismaClient, rawToken, { includeContractData = false } = {}) {
  const tokenHash = hashApplicantToken(rawToken);
  if (!tokenHash) return null;

  const token = await prismaClient.jobOfferToken.findUnique({
    where: { tokenHash },
    include: {
      careerApplication: {
        include: {
          contractAgreement: includeContractData
            ? true
            : {
                select: {
                  id: true,
                  fileName: true,
                  contentType: true,
                  uploadedAt: true,
                  updatedAt: true
                }
              }
        }
      }
    }
  });

  return isJobOfferTokenUsable(token) ? token : null;
}

function toJobOfferPrefill(application) {
  return {
    name: application.name,
    email: application.email,
    role: application.role,
    status: application.applicationStatus,
    contractAgreement: toContractAgreementResponse(application.contractAgreement)
  };
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
      continue;
    }

    const hasLegacyImageUrl =
      exists.imageUrl?.startsWith('/illustrations/') ||
      exists.imageUrl?.startsWith('/assets/images/solutions/');

    if (hasLegacyImageUrl && exists.imageUrl !== post.imageUrl) {
      await prisma.businessPost.update({
        where: { slug: post.slug },
        data: { imageUrl: post.imageUrl }
      });
    }
  }
}

app.get('/api/jobs', async (_req, res) => {
  try {
    const response = openPositions.map((job) => ({
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

app.get('/api/health', (_req, res) => {
  return res.json({ ok: true });
});

app.post('/api/admin/session', (req, res) => {
  const token = normalizeAdminTokenInput(req.body?.token);

  if (!isAdminTokenValid(token)) {
    clearAdminSessionCookie(res);
    return res.status(401).json({ error: 'Admin authorization failed.' });
  }

  setAdminSessionCookie(req, res);
  return res.json({ authenticated: true });
});

app.delete('/api/admin/session', (_req, res) => {
  clearAdminSessionCookie(res);
  return res.json({ authenticated: false });
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

app.get('/api/admin/career-applications', requireAdmin, async (req, res) => {
  const prismaClient = getPrismaClient(req);
  const passedFilter = req.query.passed;
  const where = {};

  if (passedFilter === 'true') {
    where.passed = true;
  } else if (passedFilter === 'false') {
    where.passed = false;
  }

  try {
    const applications = await prismaClient.careerApplication.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      include: {
        applicantTokens: {
          orderBy: [{ createdAt: 'desc' }],
          take: 1
        },
        jobOfferTokens: {
          orderBy: [{ createdAt: 'desc' }],
          take: 1
        },
        contractAgreement: {
          select: {
            id: true,
            fileName: true,
            contentType: true,
            uploadedAt: true,
            updatedAt: true
          }
        }
      }
    });

    return res.json({
      applications: applications.map(toCareerApplicationResponse)
    });
  } catch (error) {
    console.error('Failed to load career applications', error);
    return res.status(500).json({ error: 'Unable to load career applications.' });
  }
});

app.get('/api/admin/applicant-tokens', requireAdmin, async (req, res) => {
  const prismaClient = getPrismaClient(req);

  try {
    const tokens = await prismaClient.applicantToken.findMany({
      orderBy: [{ createdAt: 'desc' }],
      take: 50,
      include: {
        careerApplication: {
          select: {
            passed: true
          }
        }
      }
    });

    return res.json({ tokens: tokens.map(toApplicantTokenResponse) });
  } catch (error) {
    console.error('Failed to load applicant tokens', error);
    return res.status(500).json({ error: 'Unable to load applicant tokens.' });
  }
});

app.post('/api/admin/applicant-tokens', requireAdmin, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const prismaClient = getPrismaClient(req);

  if (!name) {
    return res.status(400).json({ error: 'Applicant name is required.' });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'A valid applicant email is required.' });
  }

  try {
    const rawToken = generateApplicantToken();
    const tokenHash = hashApplicantToken(rawToken);
    const expiresAt = getApplicantTokenExpiry();

    await prismaClient.applicantToken.updateMany({
      where: {
        applicantEmail: email,
        usedAt: null,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    });

    const createdToken = await prismaClient.applicantToken.create({
      data: {
        applicantName: name,
        applicantEmail: email,
        tokenHash,
        expiresAt
      }
    });

    return res.status(201).json({
      token: toApplicantTokenResponse(createdToken),
      inviteUrl: buildAssessmentInviteUrl(rawToken)
    });
  } catch (error) {
    console.error('Failed to create assessment invite token', error);
    return res.status(500).json({ error: 'Unable to create assessment invite link.' });
  }
});

app.post('/api/admin/career-applications/:id/next-step-email', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid career application id.' });
  }

  return res.status(410).json({
    error: 'Next-step emails have been replaced by manual assessment invite links.'
  });

  if (!NEXT_STEP_EMAIL_WEBHOOK_URL) {
    return res.status(500).json({ error: 'Next-step email webhook is not configured.' });
  }

  const prismaClient = getPrismaClient(req);

  try {
    const application = await prismaClient.careerApplication.findUnique({
      where: { id }
    });

    if (!application) {
      return res.status(404).json({ error: 'Career application not found.' });
    }

    if (!application.passed) {
      return res.status(400).json({ error: 'Only successful step-1 applicants can receive a next-step link.' });
    }

    if (!application.email || !EMAIL_REGEX.test(application.email)) {
      return res.status(400).json({ error: 'Applicant must have a valid email before sending a next-step link.' });
    }

    const rawToken = generateApplicantToken();
    const tokenHash = hashApplicantToken(rawToken);
    const expiresAt = getApplicantTokenExpiry();
    const nextStepUrl = buildNextStepUrl(rawToken);

    const createdToken = await prismaClient.$transaction(async (tx) => {
      await tx.applicantToken.updateMany({
        where: {
          careerApplicationId: application.id,
          usedAt: null,
          revokedAt: null
        },
        data: {
          revokedAt: new Date()
        }
      });

      return tx.applicantToken.create({
        data: {
          careerApplicationId: application.id,
          applicantName: application.name,
          applicantEmail: application.email,
          tokenHash,
          expiresAt
        }
      });
    });

    const webhookResponse = await fetch(NEXT_STEP_EMAIL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        type: 'career_next_step',
        applicationId: application.id,
        name: application.name,
        email: application.email,
        role: application.role,
        expiresAt: expiresAt.toISOString(),
        nextStepUrl
      })
    });

    if (!webhookResponse.ok) {
      await prismaClient.applicantToken.update({
        where: { id: createdToken.id },
        data: { revokedAt: new Date() }
      });
      return res.status(502).json({ error: 'Unable to send next-step email right now.' });
    }

    const sentToken = await prismaClient.applicantToken.update({
      where: { id: createdToken.id },
      data: { sentAt: new Date() }
    });

    return res.status(201).json({
      success: true,
      token: {
        id: sentToken.id,
        status: getApplicantTokenStatus(sentToken),
        expiresAt: sentToken.expiresAt,
        sentAt: sentToken.sentAt
      }
    });
  } catch (error) {
    console.error('Failed to send career next-step email', error);
    return res.status(500).json({ error: 'Unable to send next-step email.' });
  }
});

app.put(
  '/api/admin/career-applications/:id/contract',
  requireAdmin,
  express.raw({ type: ['application/pdf', 'application/octet-stream'], limit: CONTRACT_PDF_MAX_BYTES }),
  async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid career application id.' });
    }

    const pdfBuffer = Buffer.isBuffer(req.body) ? req.body : null;
    if (!isPdfBuffer(pdfBuffer)) {
      return res.status(400).json({ error: 'Upload a valid PDF contract agreement.' });
    }

    const prismaClient = getPrismaClient(req);
    const fileName = sanitizeContractFileName(req.get('x-contract-filename'));

    try {
      const application = await prismaClient.careerApplication.findUnique({
        where: { id },
        select: { id: true }
      });

      if (!application) {
        return res.status(404).json({ error: 'Career application not found.' });
      }

      const contractAgreement = await prismaClient.contractAgreement.upsert({
        where: { careerApplicationId: id },
        create: {
          careerApplicationId: id,
          fileName,
          contentType: 'application/pdf',
          data: pdfBuffer
        },
        update: {
          fileName,
          contentType: 'application/pdf',
          data: pdfBuffer,
          uploadedAt: new Date()
        },
        select: {
          fileName: true,
          contentType: true,
          uploadedAt: true,
          updatedAt: true
        }
      });

      await prismaClient.careerApplication.update({
        where: { id },
        data: { contractAgreementAcceptedAt: null }
      });

      return res.json({
        success: true,
        contractAgreement: toContractAgreementResponse(contractAgreement)
      });
    } catch (error) {
      console.error('Failed to upload contract agreement', error);
      return res.status(500).json({ error: 'Unable to upload contract agreement.' });
    }
  }
);

app.post('/api/admin/career-applications/:id/follow-up', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid career application id.' });
  }

  const prismaClient = getPrismaClient(req);

  try {
    const application = await prismaClient.careerApplication.findUnique({
      where: { id },
      include: {
        contractAgreement: {
          select: { id: true }
        }
      }
    });

    if (!application) {
      return res.status(404).json({ error: 'Career application not found.' });
    }

    if (!application.passed) {
      return res.status(400).json({ error: 'Only passed applicants can receive a job offer follow-up link.' });
    }

    if (application.jobOfferDecision) {
      return res.status(400).json({ error: 'This applicant has already responded to the job offer.' });
    }

    if (!application.contractAgreement) {
      return res.status(400).json({ error: 'Upload a contract agreement PDF before creating the job offer link.' });
    }

    const rawToken = generateApplicantToken();
    const tokenHash = hashApplicantToken(rawToken);
    const expiresAt = getJobOfferTokenExpiry();

    const createdToken = await prismaClient.$transaction(async (tx) => {
      await tx.jobOfferToken.updateMany({
        where: {
          careerApplicationId: application.id,
          usedAt: null,
          revokedAt: null
        },
        data: {
          revokedAt: new Date()
        }
      });

      const nextToken = await tx.jobOfferToken.create({
        data: {
          careerApplicationId: application.id,
          tokenHash,
          expiresAt
        }
      });

      await tx.careerApplication.update({
        where: { id: application.id },
        data: {
          applicationStatus: APPLICATION_STATUSES.FOLLOW_UP_SENT,
          followUpSentAt: new Date()
        }
      });

      return nextToken;
    });

    return res.status(201).json({
      success: true,
      offerUrl: buildJobOfferUrl(rawToken),
      token: {
        id: createdToken.id,
        expiresAt: createdToken.expiresAt
      },
      applicationStatus: APPLICATION_STATUSES.FOLLOW_UP_SENT
    });
  } catch (error) {
    console.error('Failed to create job offer follow-up link', error);
    return res.status(500).json({ error: 'Unable to create follow-up link.' });
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

app.post('/api/career-assessment', async (req, res) => {
  const { name, role, answers } = req.body || {};
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const resumeToken = typeof req.body?.resumeToken === 'string' ? req.body.resumeToken.trim() : '';
  const resumeTokenHash = hashApplicantToken(resumeToken);
  const prismaClient = getPrismaClient(req);

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not configured.' });
  }

  if (!resumeTokenHash) {
    return res.status(400).json({ error: 'A valid assessment session is required.' });
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  if (role !== 'Prompt Engineer') {
    return res.status(400).json({ error: 'Prompt Engineer is the role accepting applications right now.' });
  }

  const normalizedAnswers = {
    q1: typeof answers?.q1 === 'string' ? answers.q1.trim() : '',
    q2: typeof answers?.q2 === 'string' ? answers.q2.trim() : '',
    q3: typeof answers?.q3 === 'string' ? answers.q3.trim() : ''
  };
  const normalizedOwnerAnswers = {
    projectOwnership: typeof req.body?.ownerAnswers?.projectOwnership === 'string'
      ? req.body.ownerAnswers.projectOwnership.trim()
      : '',
    offsiteSalesFocus: typeof req.body?.ownerAnswers?.offsiteSalesFocus === 'string'
      ? req.body.ownerAnswers.offsiteSalesFocus.trim()
      : '',
    crossFunctionalGrowth: typeof req.body?.ownerAnswers?.crossFunctionalGrowth === 'string'
      ? req.body.ownerAnswers.crossFunctionalGrowth.trim()
      : '',
    passions: typeof req.body?.ownerAnswers?.passions === 'string'
      ? req.body.ownerAnswers.passions.trim()
      : ''
  };

  if (!normalizedAnswers.q1 || !normalizedAnswers.q2 || !normalizedAnswers.q3) {
    return res.status(400).json({ error: 'All assessment answers are required.' });
  }

  try {
    const applicantToken = await findResumableApplicantToken(prismaClient, resumeToken);

    if (!applicantToken) {
      return res.status(400).json({ error: 'This assessment session is invalid or has expired.' });
    }

    if (applicantToken.applicantName.trim() !== name.trim() || applicantToken.applicantEmail !== email) {
      return res.status(400).json({ error: 'This assessment invite does not match the applicant profile.' });
    }

    const assessment = await scoreCareerAssessment({
      name: name.trim(),
      role,
      answers: normalizedAnswers
    });

    const application = await prismaClient.$transaction(async (tx) => {
      const now = new Date();
      const claimed = await tx.applicantToken.updateMany({
        where: {
          resumeTokenHash,
          claimedAt: {
            not: null
          },
          usedAt: null,
          revokedAt: null,
          expiresAt: {
            gt: now
          }
        },
        data: {
          usedAt: now
        }
      });

      if (claimed.count !== 1) {
        const error = new Error('Applicant token is not usable.');
        error.code = 'TOKEN_NOT_USABLE';
        throw error;
      }

      const createdApplication = await tx.careerApplication.create({
        data: {
          name: name.trim(),
          email,
          role,
          answerAiTools: normalizedAnswers.q1,
          answerApi: normalizedAnswers.q2,
          answerModernWorkflows: normalizedAnswers.q3,
          ownerAnswers: normalizedOwnerAnswers,
          score: assessment.score,
          passed: assessment.passed,
          passingScore: assessment.passingScore,
          recommendation: assessment.recommendation,
          aiGeneratedRisk: assessment.aiGeneratedRisk,
          categoryScores: assessment.categoryScores,
          strengths: assessment.strengths,
          concerns: assessment.concerns,
          summary: assessment.summary
        }
      });

      await tx.applicantToken.update({
        where: { resumeTokenHash },
        data: {
          careerApplicationId: createdApplication.id
        }
      });

      return createdApplication;
    });

    sendApplicationReceivedWebhook({
      application,
      assessment,
      answers: normalizedAnswers,
      ownerAnswers: normalizedOwnerAnswers
    }).catch((webhookError) => {
      console.warn('Unable to queue application received webhook.', webhookError);
    });

    return res.json({
      assessment: {
        ...assessment,
        applicationId: application.id
      }
    });
  } catch (error) {
    if (error.code === 'TOKEN_NOT_USABLE') {
      return res.status(400).json({ error: 'This assessment session is invalid or has expired.' });
    }

    console.error('Failed to score career assessment', error);
    return res.status(502).json({
      error: 'Unable to score the assessment right now.'
    });
  }
});

app.post('/api/dev/career-assessment/seed-pass', requireDevTool, async (req, res) => {
  const name = typeof req.body?.name === 'string' && req.body.name.trim()
    ? req.body.name.trim()
    : 'Dev Passed Applicant';
  const email = typeof req.body?.email === 'string' && req.body.email.trim()
    ? req.body.email.trim().toLowerCase()
    : 'dev.passed@example.com';
  const role = typeof req.body?.role === 'string' && req.body.role.trim()
    ? req.body.role.trim()
    : 'Prompt Engineer';
  const prismaClient = getPrismaClient(req);

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  if (role !== 'Prompt Engineer') {
    return res.status(400).json({ error: 'Prompt Engineer is the role accepting applications right now.' });
  }

  const answers = {
    q1: 'DEV FIXTURE: Passing QA seed for AI tool experience.',
    q2: 'DEV FIXTURE: Passing QA seed for API understanding.',
    q3: 'DEV FIXTURE: Passing QA seed for mobile, chatbot, automation, or AI workflow experience.'
  };
  const assessment = buildDevPassingAssessment();

  try {
    const application = await prismaClient.careerApplication.create({
      data: {
        name,
        email,
        role,
        answerAiTools: answers.q1,
        answerApi: answers.q2,
        answerModernWorkflows: answers.q3,
        score: assessment.score,
        passed: assessment.passed,
        passingScore: assessment.passingScore,
        recommendation: assessment.recommendation,
        aiGeneratedRisk: assessment.aiGeneratedRisk,
        categoryScores: assessment.categoryScores,
        strengths: assessment.strengths,
        concerns: assessment.concerns,
        summary: assessment.summary
      }
    });

    return res.status(201).json({
      fixture: true,
      application: toCareerApplicationResponse({
        ...application,
        applicantTokens: []
      }),
      assessment: {
        ...assessment,
        applicationId: application.id
      }
    });
  } catch (error) {
    console.error('Failed to seed dev passing career assessment', error);
    return res.status(500).json({ error: 'Unable to seed passing career assessment.' });
  }
});

app.post('/api/applicant-tokens/validate', async (req, res) => {
  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  const prismaClient = getPrismaClient(req);

  try {
    const applicantToken = await findUsableApplicantToken(prismaClient, token);

    if (!applicantToken) {
      return res.json({ valid: false });
    }

    return res.json({
      valid: true,
      applicant: toApplicantTokenPrefill(applicantToken),
      expiresAt: applicantToken.expiresAt
    });
  } catch (error) {
    console.error('Failed to validate applicant token', error);
    return res.status(500).json({ error: 'Unable to validate next-step link.' });
  }
});

app.post('/api/applicant-tokens/claim', async (req, res) => {
  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  const tokenHash = hashApplicantToken(token);
  const prismaClient = getPrismaClient(req);

  if (!tokenHash) {
    return res.status(400).json({ error: 'This assessment invite is invalid or has expired.' });
  }

  try {
    const now = new Date();
    const resumeToken = generateApplicantToken();
    const resumeTokenHash = hashApplicantToken(resumeToken);

    const applicantToken = await prismaClient.$transaction(async (tx) => {
      const updated = await tx.applicantToken.updateMany({
        where: {
          tokenHash,
          usedAt: null,
          revokedAt: null,
          claimedAt: null,
          expiresAt: {
            gt: now
          }
        },
        data: {
          claimedAt: now,
          resumeTokenHash
        }
      });

      if (updated.count !== 1) {
        const error = new Error('Applicant token is not claimable.');
        error.code = 'TOKEN_NOT_CLAIMABLE';
        throw error;
      }

      return tx.applicantToken.findUnique({ where: { tokenHash } });
    });

    return res.json({
      success: true,
      resumeToken,
      applicant: toApplicantTokenPrefill(applicantToken),
      claimedAt: applicantToken.claimedAt,
      expiresAt: applicantToken.expiresAt
    });
  } catch (error) {
    if (error.code === 'TOKEN_NOT_CLAIMABLE') {
      return res.status(400).json({ error: 'This assessment invite is invalid, expired, or already in progress.' });
    }

    console.error('Failed to claim applicant token', error);
    return res.status(500).json({ error: 'Unable to start assessment.' });
  }
});

app.post('/api/applicant-tokens/resume', async (req, res) => {
  const resumeToken = typeof req.body?.resumeToken === 'string' ? req.body.resumeToken.trim() : '';
  const prismaClient = getPrismaClient(req);

  try {
    const applicantToken = await findResumableApplicantToken(prismaClient, resumeToken);

    if (!applicantToken) {
      return res.json({ valid: false });
    }

    return res.json({
      valid: true,
      applicant: toApplicantTokenPrefill(applicantToken),
      claimedAt: applicantToken.claimedAt,
      expiresAt: applicantToken.expiresAt
    });
  } catch (error) {
    console.error('Failed to resume applicant token', error);
    return res.status(500).json({ error: 'Unable to resume assessment.' });
  }
});

app.post('/api/applicant-tokens/submit', async (req, res) => {
  return res.status(410).json({
    error: 'Assessment invites must be submitted through the Careers assessment.'
  });
});

app.post('/api/job-offer-tokens/validate', async (req, res) => {
  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  const prismaClient = getPrismaClient(req);

  try {
    const offerToken = await findUsableJobOfferToken(prismaClient, token);

    if (!offerToken) {
      return res.json({ valid: false });
    }

    return res.json({
      valid: true,
      applicant: toJobOfferPrefill(offerToken.careerApplication),
      expiresAt: offerToken.expiresAt
    });
  } catch (error) {
    console.error('Failed to validate job offer token', error);
    return res.status(500).json({ error: 'Unable to validate job offer link.' });
  }
});

app.post('/api/job-offer-tokens/contract', async (req, res) => {
  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  const prismaClient = getPrismaClient(req);

  try {
    const offerToken = await findUsableJobOfferToken(prismaClient, token, {
      includeContractData: true
    });

    if (!offerToken?.careerApplication?.contractAgreement) {
      return res.status(404).json({ error: 'Contract agreement is not available for this offer.' });
    }

    const contractAgreement = offerToken.careerApplication.contractAgreement;
    res.setHeader('Content-Type', contractAgreement.contentType || 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${sanitizeContractFileName(contractAgreement.fileName).replace(/"/g, '')}"`
    );
    res.setHeader('Cache-Control', 'no-store');
    return res.send(Buffer.from(contractAgreement.data));
  } catch (error) {
    console.error('Failed to load job offer contract agreement', error);
    return res.status(500).json({ error: 'Unable to load contract agreement.' });
  }
});

app.post('/api/job-offer-tokens/respond', async (req, res) => {
  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  const tokenHash = hashApplicantToken(token);
  const decision = typeof req.body?.decision === 'string' ? req.body.decision.trim().toLowerCase() : '';
  const contractAgreementAccepted = req.body?.contractAgreementAccepted === true;
  const earliestStartDate = parseDateOnly(req.body?.earliestStartDate);
  const mobileNumberGcash = typeof req.body?.mobileNumberGcash === 'string'
    ? req.body.mobileNumberGcash.trim()
    : '';
  const hasWorkingComputer = req.body?.hasWorkingComputer === true
    ? true
    : req.body?.hasWorkingComputer === false
      ? false
      : null;
  const prismaClient = getPrismaClient(req);

  if (!tokenHash) {
    return res.status(400).json({ error: 'This job offer link is invalid or has expired.' });
  }

  if (!['accepted', 'declined'].includes(decision)) {
    return res.status(400).json({ error: 'Choose whether to accept or decline the job offer.' });
  }

  if (decision === 'accepted' && !contractAgreementAccepted) {
    return res.status(400).json({ error: 'Confirm that you have read the contract agreement before accepting.' });
  }

  if (!earliestStartDate) {
    return res.status(400).json({ error: 'Earliest start date is required.' });
  }

  if (!mobileNumberGcash || !GCASH_REGEX.test(mobileNumberGcash) || !PHONE_REGEX.test(mobileNumberGcash)) {
    return res.status(400).json({ error: 'A valid Mobile number / GCash is required.' });
  }

  if (hasWorkingComputer === null) {
    return res.status(400).json({ error: 'Choose whether you have a working personal laptop/computer.' });
  }

  try {
    const offerToken = await findUsableJobOfferToken(prismaClient, token);

    if (!offerToken) {
      return res.status(400).json({ error: 'This job offer link is invalid or has expired.' });
    }

    const nextStatus = decision === 'accepted'
      ? APPLICATION_STATUSES.JOB_OFFER_ACCEPTED
      : APPLICATION_STATUSES.JOB_OFFER_DECLINED;

    await prismaClient.$transaction(async (tx) => {
      const now = new Date();
      const used = await tx.jobOfferToken.updateMany({
        where: {
          tokenHash,
          usedAt: null,
          revokedAt: null,
          expiresAt: {
            gt: now
          }
        },
        data: {
          usedAt: now
        }
      });

      if (used.count !== 1) {
        const error = new Error('Job offer token is not usable.');
        error.code = 'TOKEN_NOT_USABLE';
        throw error;
      }

      await tx.careerApplication.update({
        where: { id: offerToken.careerApplicationId },
        data: {
          applicationStatus: nextStatus,
          earliestStartDate,
          gcashAccountNumber: mobileNumberGcash,
          mobileNumber: mobileNumberGcash,
          hasWorkingComputer,
          contractAgreementAcceptedAt: decision === 'accepted' ? now : null,
          jobOfferDecision: decision,
          jobOfferRespondedAt: now
        }
      });
    });

    return res.json({
      success: true,
      status: nextStatus,
      decision
    });
  } catch (error) {
    if (error.code === 'TOKEN_NOT_USABLE') {
      return res.status(400).json({ error: 'This job offer link is invalid or has expired.' });
    }

    console.error('Failed to submit job offer response', error);
    return res.status(500).json({ error: 'Unable to submit job offer response.' });
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

const distPath = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }

    return res.sendFile(indexPath);
  });
}

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const port = process.env.PORT || 4000;

async function start() {
  try {
    await prisma.$connect();
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

module.exports = Object.assign(app, {
  generateApplicantToken,
  hashApplicantToken,
  buildNextStepUrl,
  buildAssessmentInviteUrl,
  isApplicantTokenUsable,
  getApplicantTokenStatus
});
