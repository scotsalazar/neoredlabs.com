import fallbackPostsSource from '../../data/defaultBusinessPosts.js';

const API_BASE = '/api';

function buildError(message, details) {
  const error = new Error(message);
  if (details) {
    error.details = details;
  }
  return error;
}

function formatDateLabel(value) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

function normalizePost(post, index = 0) {
  return {
    ...post,
    id: post.id ?? index + 1,
    publishedAtLabel: post.publishedAtLabel || formatDateLabel(post.publishedAt),
  };
}

const fallbackPosts = fallbackPostsSource.map(normalizePost);

async function parseResponseBody(response) {
  const contentType = response.headers.get('content-type') || '';
  const rawText = await response.text();

  if (!rawText) {
    return null;
  }

  if (!contentType.includes('application/json')) {
    throw buildError('Latest feed is unavailable right now.', {
      code: 'NON_JSON_RESPONSE',
      preview: rawText.slice(0, 120)
    });
  }

  try {
    return JSON.parse(rawText);
  } catch (error) {
    throw buildError('Latest feed returned invalid JSON.', {
      code: 'INVALID_JSON',
      preview: rawText.slice(0, 120)
    });
  }
}

async function handleResponse(response) {
  const payload = await parseResponseBody(response);

  if (response.ok) {
    return payload;
  }

  throw buildError(payload?.error || `Request failed with status ${response.status}`, payload);
}

function adminHeaders(token) {
  return token ? { 'x-admin-token': token } : {};
}

export async function fetchBusinessPosts() {
  try {
    const response = await fetch(`${API_BASE}/business-posts`);
    const payload = await handleResponse(response);
    return {
      posts: (payload?.posts || []).map(normalizePost)
    };
  } catch (error) {
    return { posts: fallbackPosts };
  }
}

export async function fetchBusinessPost(slug) {
  try {
    const response = await fetch(`${API_BASE}/business-posts/${slug}`);
    const payload = await handleResponse(response);
    return {
      post: payload?.post ? normalizePost(payload.post) : null
    };
  } catch (error) {
    const fallbackPost = fallbackPosts.find((post) => post.slug === slug);
    if (fallbackPost) {
      return { post: fallbackPost };
    }
    throw error;
  }
}

export async function fetchAdminBusinessPosts(token) {
  const response = await fetch(`${API_BASE}/admin/business-posts`, {
    headers: {
      ...adminHeaders(token)
    }
  });

  const payload = await handleResponse(response);
  return {
    posts: (payload?.posts || []).map(normalizePost)
  };
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
