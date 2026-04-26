import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import {
  createApplicantToken,
  fetchApplicantTokens
} from '../lib/api/careerAdmin.js';

const statusLabels = {
  sent: 'Sent',
  used: 'Used',
  expired: 'Expired',
  revoked: 'Revoked',
  created: 'Active',
  none: 'No link'
};

const initialInviteForm = {
  name: '',
  email: ''
};

const CareerAdmin = () => {
  const [tokens, setTokens] = useState([]);
  const [form, setForm] = useState(initialInviteForm);
  const [adminToken, setAdminToken] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadTokens = async (token = adminToken) => {
    setLoading(true);
    setError('');

    try {
      const payload = await fetchApplicantTokens(token);
      setTokens(payload.tokens || []);
    } catch (err) {
      setError(err.message || 'Unable to load assessment invites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('neolabs_admin_token') : '';
    if (stored) {
      setAdminToken(stored);
      loadTokens(stored);
    } else {
      loadTokens('');
    }
  }, []);

  const handleTokenSave = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('neolabs_admin_token', adminToken);
    }
    await loadTokens(adminToken);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateInvite = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError('');
    setMessage('');
    setGeneratedLink('');

    try {
      const payload = await createApplicantToken(form, adminToken);
      setGeneratedLink(payload.inviteUrl || '');
      setMessage('Assessment invite link created. Send this link manually to the applicant.');
      setForm(initialInviteForm);
      await loadTokens(adminToken);
    } catch (err) {
      setError(err.message || 'Unable to create assessment invite link.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Layout
      title="Career Admin | NeoLabs"
      description="Internal career assessment invite management for NeoLabs."
    >
      <section className="bg-page-muted">
        <div className="section-container py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-panel p-8">
              <div>
                <p className="eyebrow">Internal admin</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong">
                  Create assessment invite
                </h1>
                <p className="mt-3 text-sm leading-7 text-copy">
                  Generate a one-time secure link for the Prompt Engineer assessment. You can copy the generated link and send it manually.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="password"
                  value={adminToken}
                  onChange={(event) => setAdminToken(event.target.value)}
                  className="w-full rounded-2xl border border-line bg-page px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                  placeholder="Admin token"
                />
                <button type="button" onClick={handleTokenSave} className="btn-secondary">
                  Refresh
                </button>
              </div>

              <form className="mt-8 grid gap-4" onSubmit={handleCreateInvite}>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-ink-strong">Applicant name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="rounded-2xl border border-line bg-page px-4 py-3 text-ink"
                    placeholder="Alex Johnson"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-ink-strong">Applicant email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-2xl border border-line bg-page px-4 py-3 text-ink"
                    placeholder="alex@example.com"
                    required
                  />
                </label>

                <button type="submit" className="btn-primary justify-self-start" disabled={creating}>
                  {creating ? 'Creating...' : 'Create secure link'}
                </button>
              </form>

              <div className="mt-6 min-h-[1.25rem]">
                {message && <p className="text-sm font-medium text-primary">{message}</p>}
                {error && <p className="text-sm font-medium text-red-500">{error}</p>}
              </div>

              {generatedLink && (
                <div className="mt-6 rounded-[1.25rem] border border-line bg-page p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Secure assessment link
                  </p>
                  <input
                    className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink"
                    value={generatedLink}
                    readOnly
                    onFocus={(event) => event.target.select()}
                  />
                </div>
              )}
            </div>

            <div className="surface-panel p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Invite history</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-strong">
                    Recent assessment links
                  </h2>
                </div>
                {loading && <p className="text-sm text-copy">Loading...</p>}
              </div>

              <div className="mt-6 space-y-4">
                {!loading && tokens.map((token) => (
                  <article key={token.id} className="rounded-[1.5rem] border border-line bg-page p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-ink-strong">{token.name}</h3>
                        <p className="mt-1 text-sm text-copy">{token.email}</p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-copy">
                          {statusLabels[token.status] || token.status} / expires {new Date(token.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                      {token.careerApplicationId && (
                        <p className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          Application #{token.careerApplicationId}
                        </p>
                      )}
                    </div>
                  </article>
                ))}

                {!loading && tokens.length === 0 && (
                  <p className="text-sm text-copy">No assessment invites found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerAdmin;
