import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';
import {
  submitApplicantContinuation,
  validateApplicantToken
} from '../lib/api/applicantTokens.js';

const ApplicantNextStep = () => {
  const location = useLocation();
  const initialToken = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('token') || '';
  }, [location.search]);

  const [token] = useState(initialToken);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applicant, setApplicant] = useState(null);
  const [expiresAt, setExpiresAt] = useState('');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function validateToken() {
      if (!token) {
        setError('This next-step link is invalid or has expired.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const payload = await validateApplicantToken(token, { signal: controller.signal });

        if (!payload?.valid) {
          setError('This next-step link is invalid or has expired.');
          setApplicant(null);
          return;
        }

        setApplicant(payload.applicant);
        setExpiresAt(payload.expiresAt || '');

        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', '/next-step');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to validate this next-step link.');
        }
      } finally {
        setLoading(false);
      }
    }

    validateToken();

    return () => controller.abort();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!confirmed || !token) return;

    setSubmitting(true);
    setError('');

    try {
      await submitApplicantContinuation(token);
      setComplete(true);
    } catch (err) {
      setError(err.message || 'Unable to submit your confirmation.');
    } finally {
      setSubmitting(false);
    }
  };

  const expiryLabel = expiresAt
    ? new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(new Date(expiresAt))
    : '';

  return (
    <Layout
      title="Career Next Step | NeoLabs"
      description="Continue your NeoLabs career application."
    >
      <GradientSection className="min-h-[calc(100vh-88px)] py-20">
        <div className="section-container">
          <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 text-light shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              Career next step
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">
              Continue your application
            </h1>

            {loading && (
              <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-light/75">
                Checking your secure link...
              </p>
            )}

            {!loading && error && (
              <p className="mt-6 rounded-2xl border border-secondary/25 bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
                {error}
              </p>
            )}

            {!loading && applicant && !complete && (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <label className="block space-y-3">
                  <span className="text-sm font-semibold">Name</span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-light"
                    value={applicant.name || ''}
                    readOnly
                  />
                </label>

                <label className="block space-y-3">
                  <span className="text-sm font-semibold">Email</span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-light"
                    value={applicant.email || ''}
                    readOnly
                  />
                </label>

                {expiryLabel && (
                  <p className="text-sm leading-6 text-light/65">
                    Link valid through {expiryLabel}.
                  </p>
                )}

                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-light/75">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={confirmed}
                    onChange={(event) => setConfirmed(event.target.checked)}
                  />
                  <span>I confirm that I want to continue with the NeoLabs hiring process.</span>
                </label>

                <button
                  type="submit"
                  className="btn-primary bg-secondary text-dark hover:brightness-100 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!confirmed || submitting}
                >
                  {submitting ? 'Submitting...' : 'Confirm next step'}
                </button>
              </form>
            )}

            {complete && (
              <div className="mt-8 rounded-[1.5rem] border border-secondary/25 bg-secondary/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                  Confirmed
                </p>
                <p className="mt-3 text-base leading-7 text-light/80">
                  Thanks, {applicant?.name || 'candidate'}. Your confirmation has been received.
                </p>
              </div>
            )}
          </div>
        </div>
      </GradientSection>
    </Layout>
  );
};

export default ApplicantNextStep;
