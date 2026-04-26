const API_BASE = '/api';

function buildError(message, details) {
  const error = new Error(message);
  if (details) {
    error.details = details;
  }
  return error;
}

function adminHeaders(token) {
  return token ? { 'x-admin-token': token } : {};
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

export async function fetchCareerApplications(token, { passed = true } = {}) {
  const search = new URLSearchParams();
  if (passed !== undefined) {
    search.set('passed', String(passed));
  }

  const response = await fetch(`${API_BASE}/admin/career-applications?${search.toString()}`, {
    headers: {
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function sendCareerNextStepEmail(applicationId, token) {
  const response = await fetch(`${API_BASE}/admin/career-applications/${applicationId}/next-step-email`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function createJobOfferFollowUp(applicationId, token) {
  const response = await fetch(`${API_BASE}/admin/career-applications/${applicationId}/follow-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function fetchApplicantTokens(token) {
  const response = await fetch(`${API_BASE}/admin/applicant-tokens`, {
    headers: {
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function createApplicantToken(data, token) {
  const response = await fetch(`${API_BASE}/admin/applicant-tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...adminHeaders(token)
    },
    body: JSON.stringify(data)
  });

  return handleResponse(response);
}

export default {
  fetchCareerApplications,
  createJobOfferFollowUp,
  sendCareerNextStepEmail,
  fetchApplicantTokens,
  createApplicantToken
};
