import { API_BASE, handleJsonResponse } from './config.js';

async function handleResponse(response) {
  return handleJsonResponse(response, 'Assessment invite API is unavailable right now.');
}

export async function validateApplicantToken(token, { signal } = {}) {
  const response = await fetch(`${API_BASE}/applicant-tokens/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token }),
    signal
  });

  return handleResponse(response);
}

export async function claimApplicantToken(token, { signal } = {}) {
  const response = await fetch(`${API_BASE}/applicant-tokens/claim`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token }),
    signal
  });

  return handleResponse(response);
}

export async function resumeApplicantToken(resumeToken, { signal } = {}) {
  const response = await fetch(`${API_BASE}/applicant-tokens/resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ resumeToken }),
    signal
  });

  return handleResponse(response);
}

export default {
  validateApplicantToken,
  claimApplicantToken,
  resumeApplicantToken
};
