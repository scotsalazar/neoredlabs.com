import { API_BASE, handleJsonResponse } from './config.js';

function adminHeaders(token) {
  return token ? { 'x-admin-token': token } : {};
}

async function handleResponse(response) {
  return handleJsonResponse(response, 'Admin API is unavailable right now.');
}

export async function createAdminSession(token) {
  const response = await fetch(`${API_BASE}/admin/session`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ token })
  });

  return handleResponse(response);
}

export async function clearAdminSession(token) {
  const response = await fetch(`${API_BASE}/admin/session`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function fetchCareerApplications(token, { passed = true } = {}) {
  const search = new URLSearchParams();
  if (passed !== undefined) {
    search.set('passed', String(passed));
  }

  const response = await fetch(`${API_BASE}/admin/career-applications?${search.toString()}`, {
    credentials: 'include',
    headers: {
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function sendCareerNextStepEmail(applicationId, token) {
  const response = await fetch(`${API_BASE}/admin/career-applications/${applicationId}/next-step-email`, {
    method: 'POST',
    credentials: 'include',
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
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function uploadContractAgreement(applicationId, file, token) {
  const response = await fetch(`${API_BASE}/admin/career-applications/${applicationId}/contract`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/pdf',
      'x-contract-filename': file.name,
      ...adminHeaders(token)
    },
    body: file
  });

  return handleResponse(response);
}

export async function fetchApplicantTokens(token) {
  const response = await fetch(`${API_BASE}/admin/applicant-tokens`, {
    credentials: 'include',
    headers: {
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function createApplicantToken(data, token) {
  const response = await fetch(`${API_BASE}/admin/applicant-tokens`, {
    method: 'POST',
    credentials: 'include',
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
  createAdminSession,
  clearAdminSession,
  fetchCareerApplications,
  createJobOfferFollowUp,
  uploadContractAgreement,
  sendCareerNextStepEmail,
  fetchApplicantTokens,
  createApplicantToken
};
