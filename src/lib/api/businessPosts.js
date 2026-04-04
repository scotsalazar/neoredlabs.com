const API_BASE = '/api';

function buildError(message, details) {
  const error = new Error(message);
  if (details) {
    error.details = details;
  }
  return error;
}

async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  throw buildError(payload?.error || `Request failed with status ${response.status}`, payload);
}

function adminHeaders(token) {
  return token ? { 'x-admin-token': token } : {};
}

export async function fetchBusinessPosts() {
  const response = await fetch(`${API_BASE}/business-posts`);
  return handleResponse(response);
}

export async function fetchBusinessPost(slug) {
  const response = await fetch(`${API_BASE}/business-posts/${slug}`);
  return handleResponse(response);
}

export async function fetchAdminBusinessPosts(token) {
  const response = await fetch(`${API_BASE}/admin/business-posts`, {
    headers: {
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export async function createBusinessPost(data, token) {
  const response = await fetch(`${API_BASE}/admin/business-posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...adminHeaders(token)
    },
    body: JSON.stringify(data)
  });

  return handleResponse(response);
}

export async function updateBusinessPost(id, data, token) {
  const response = await fetch(`${API_BASE}/admin/business-posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...adminHeaders(token)
    },
    body: JSON.stringify(data)
  });

  return handleResponse(response);
}

export async function deleteBusinessPost(id, token) {
  const response = await fetch(`${API_BASE}/admin/business-posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...adminHeaders(token)
    }
  });

  return handleResponse(response);
}

export default {
  fetchBusinessPosts,
  fetchBusinessPost,
  fetchAdminBusinessPosts,
  createBusinessPost,
  updateBusinessPost,
  deleteBusinessPost
};
