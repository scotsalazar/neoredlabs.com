import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import {
  fetchCareerApplications,
  sendCareerNextStepEmail
} from '../lib/api/careerAdmin.js';

const statusLabels = {
  sent: 'Sent',
  used: 'Used',
  expired: 'Expired',
  revoked: 'Revoked',
  created: 'Created',
  none: 'No link'
};

const CareerAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadApplications = async (adminToken = token) => {
    setLoading(true);
    setError('');

    try {
      const payload = await fetchCareerApplications(adminToken, { passed: true });
      setApplications(payload.applications || []);
    } catch (err) {
      setError(err.message || 'Unable to load career applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('neolabs_admin_token') : '';
    if (stored) {
      setToken(stored);
      loadApplications(stored);
    } else {
      loadApplications('');
    }
  }, []);

  const handleTokenSave = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('neolabs_admin_token', token);
    }
    await loadApplications(token);
  };

  const handleSend = async (applicationId) => {
    setSendingId(applicationId);
    setError('');
    setMessage('');

    try {
      await sendCareerNextStepEmail(applicationId, token);
      setMessage('Next-step email sent.');
      await loadApplications(token);
    } catch (err) {
      setError(err.message || 'Unable to send next-step email.');
    } finally {
      setSendingId(null);
    }
  };

  return (
    <Layout
      title="Career Admin | NeoLabs"
      description="Internal career application management for NeoLabs."
    >
      <section className="bg-page-muted">
        <div className="section-container py-16">
          <div className="surface-panel p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">Internal admin</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong">
                  Career applicants
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-copy">
                  Send one-time next-step links to applicants who passed the first assessment.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="password"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  className="w-full min-w-[260px] rounded-2xl border border-line bg-page px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                  placeholder="Optional admin token"
                />
                <button type="button" onClick={handleTokenSave} className="btn-secondary">
                  Refresh
                </button>
              </div>
            </div>

            <div className="mt-6 min-h-[1.25rem]">
              {message && <p className="text-sm font-medium text-primary">{message}</p>}
              {error && <p className="text-sm font-medium text-red-500">{error}</p>}
            </div>

            <div className="mt-8 space-y-4">
              {loading && <p className="text-sm text-copy">Loading applicants...</p>}

              {!loading && applications.map((application) => {
                const status = application.latestToken?.status || 'none';
                const canSend = Boolean(application.email);

                return (
                  <article key={application.id} className="rounded-[1.5rem] border border-line bg-page p-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          {application.role} / score {application.score}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-ink-strong">
                          {application.name}
                        </h2>
                        <p className="mt-1 text-sm text-copy">
                          {application.email || 'No email on file'}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-copy">
                          {application.summary}
                        </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-copy">
                          Link status: {statusLabels[status] || status}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn-primary self-start disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => handleSend(application.id)}
                        disabled={!canSend || sendingId === application.id}
                      >
                        {sendingId === application.id ? 'Sending...' : 'Send next-step email'}
                      </button>
                    </div>
                  </article>
                );
              })}

              {!loading && applications.length === 0 && (
                <p className="text-sm text-copy">No passed applicants found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerAdmin;
