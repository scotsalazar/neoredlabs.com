import { API_BASE, handleJsonResponse } from './config.js';

async function handleResponse(response) {
  return handleJsonResponse(response, 'Job offer API is unavailable right now.');
}

export async function validateJobOfferToken(token, { signal } = {}) {
  const response = await fetch(`${API_BASE}/job-offer-tokens/validate`, {
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

export async function downloadJobOfferContract(token, { signal } = {}) {
  const response = await fetch(`${API_BASE}/job-offer-tokens/contract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/pdf, application/json'
    },
    body: JSON.stringify({ token }),
    signal
  });

  if (response.ok) {
    return response.blob();
  }

  let message = 'Unable to load contract agreement.';
  try {
    const payload = await response.json();
    message = payload?.error || message;
  } catch (_error) {
    // Keep the fallback message when the server response is not JSON.
  }

  throw new Error(message);
}

export async function submitJobOfferResponse(data, { signal } = {}) {
  const response = await fetch(`${API_BASE}/job-offer-tokens/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data),
    signal
  });

  return handleResponse(response);
}

export default {
  validateJobOfferToken,
  downloadJobOfferContract,
  submitJobOfferResponse
};
