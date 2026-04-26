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
  submitJobOfferResponse
};
