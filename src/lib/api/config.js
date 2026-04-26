export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

export function buildError(message, details) {
  const error = new Error(message);
  if (details) {
    error.details = details;
  }
  return error;
}

export async function parseJsonResponse(response, fallbackMessage = 'API request failed.') {
  const contentType = response.headers.get('content-type') || '';
  const rawText = await response.text();

  if (!rawText) {
    return null;
  }

  if (!contentType.includes('application/json')) {
    throw buildError(fallbackMessage, {
      code: 'NON_JSON_RESPONSE',
      status: response.status,
      preview: rawText.slice(0, 120)
    });
  }

  try {
    return JSON.parse(rawText);
  } catch (error) {
    throw buildError('API returned invalid JSON.', {
      code: 'INVALID_JSON',
      status: response.status,
      preview: rawText.slice(0, 120)
    });
  }
}

export async function handleJsonResponse(response, fallbackMessage = 'API request failed.') {
  const payload = await parseJsonResponse(response, fallbackMessage);

  if (response.ok) {
    return payload || {};
  }

  throw buildError(payload?.error || `Request failed with status ${response.status}`, payload);
}
