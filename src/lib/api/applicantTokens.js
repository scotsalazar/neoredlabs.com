const API_BASE = '/api';

function buildError(message, details) {
  const error = new Error(message);
  if (details) {
    error.details = details;
  }
  return error;
}

async function handleResponse(response) {
  let payload = null;

  try {
    payload = await response.json();
  } catch (error) {
    // ignore empty or malformed JSON
  }

  if (response.ok) {
    return payload;
  }

  throw buildError(payload?.error || `Request failed with status ${response.status}`, payload);
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
