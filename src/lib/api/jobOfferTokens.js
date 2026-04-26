const API_BASE = '/api';

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

  throw new Error(payload?.error || `Request failed with status ${response.status}`);
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
