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

export async function submitApplicantContinuation(token, { signal } = {}) {
  const response = await fetch(`${API_BASE}/applicant-tokens/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token, confirmed: true }),
    signal
  });

  return handleResponse(response);
}

export default {
  validateApplicantToken,
  submitApplicantContinuation
};
