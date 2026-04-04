import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import {
  createBusinessPost,
  deleteBusinessPost,
  fetchAdminBusinessPosts,
  updateBusinessPost,
} from '../lib/api/businessPosts.js';

const initialForm = {
  title: '',
  slug: '',
  category: '',
  summary: '',
  content: '',
  imageUrl: '/illustrations/business-dashboard-rollout.svg',
  publishedAt: '',
  isPublished: true,
};

const toDateTimeLocal = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (part) => String(part).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const BusinessAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadPosts = async (adminToken = token) => {
    setLoading(true);
    setError('');
    try {
      const payload = await fetchAdminBusinessPosts(adminToken);
      setPosts(payload.posts || []);
    } catch (err) {
      setError(err?.message || 'Unable to load admin business posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('neolabs_admin_token') : '';
    if (stored) {
      setToken(stored);
      loadPosts(stored);
    } else {
      loadPosts('');
    }
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };

      if (name === 'title' && !editingId) {
        next.slug = slugify(value);
      }

      return next;
    });
  };

  const handleTokenSave = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('neolabs_admin_token', token);
    }
    await loadPosts(token);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      summary: post.summary,
      content: post.content || '',
      imageUrl: post.imageUrl,
      publishedAt: toDateTimeLocal(post.publishedAt),
      isPublished: post.isPublished,
    });
    setMessage('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null
    };

    try {
      if (editingId) {
        await updateBusinessPost(editingId, payload, token);
        setMessage('Business post updated.');
      } else {
        await createBusinessPost(payload, token);
        setMessage('Business post created.');
      }
      resetForm();
      await loadPosts(token);
    } catch (err) {
      setError(err?.message || 'Unable to save business post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (typeof window !== 'undefined' && !window.confirm('Delete this business post?')) {
      return;
    }

    setError('');
    setMessage('');
    try {
      await deleteBusinessPost(id, token);
      if (editingId === id) {
        resetForm();
      }
      setMessage('Business post deleted.');
      await loadPosts(token);
    } catch (err) {
      setError(err?.message || 'Unable to delete business post.');
    }
  };

  return (
    <Layout
      title="Business Admin | NeoLabs"
      description="Internal business post management for NeoLabs."
    >
      <section className="bg-slate-100">
        <div className="section-container py-16">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="surface-panel p-8">
              <div className="space-y-4">
                <p className="eyebrow">Internal admin</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Manage Business posts</h1>
                <p className="text-sm leading-7 text-slate-600">
                  Use this page to keep the Business section historical in SQLite rather than hardcoded locally. If `ADMIN_API_TOKEN` is configured on the server, enter it below.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="password"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary"
                  placeholder="Optional admin token"
                />
                <button type="button" onClick={handleTokenSave} className="btn-secondary">
                  Refresh admin view
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                <input name="title" value={form.title} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="slug" value={form.slug} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Slug" required />
                  <input name="category" value={form.category} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Category" required />
                </div>
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="/illustrations/business-dashboard-rollout.svg" required />
                <textarea name="summary" rows={3} value={form.summary} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Summary" required />
                <textarea name="content" rows={8} value={form.content} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Full content" required />
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <input type="datetime-local" name="publishedAt" value={form.publishedAt} onChange={handleChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" />
                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
                    Published
                  </label>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : editingId ? 'Update post' : 'Create post'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Reset form
                  </button>
                </div>
              </form>

              <div className="mt-6 min-h-[1.25rem]">
                {message && <p className="text-sm font-medium text-primary">{message}</p>}
                {error && <p className="text-sm font-medium text-red-500">{error}</p>}
              </div>
            </div>

            <div className="surface-panel p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">History</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Saved business posts</h2>
                </div>
                {loading && <p className="text-sm text-slate-500">Loading...</p>}
              </div>

              <div className="mt-6 space-y-4">
                {posts.map((post) => (
                  <article key={post.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-950">{post.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{post.summary}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                          {post.slug} / {post.isPublished ? 'Published' : 'Draft'} / {post.publishedAtLabel || 'No publish date'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="btn-secondary px-4 py-2" onClick={() => handleEdit(post)}>Edit</button>
                        <button type="button" className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50" onClick={() => handleDelete(post.id)}>Delete</button>
                      </div>
                    </div>
                  </article>
                ))}
                {!loading && posts.length === 0 && <p className="text-sm text-slate-500">No posts found.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BusinessAdmin;
