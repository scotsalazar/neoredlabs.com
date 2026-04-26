import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';
import { validateApplicantToken } from '../lib/api/applicantTokens.js';

const ApplicantNextStep = () => {
  const location = useLocation();
  const token = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('token') || '';
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [applicant, setApplicant] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function validateToken() {
      if (!token) {
        setError('Use your secure careers assessment invite link to continue.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const payload = await validateApplicantToken(token, { signal: controller.signal });

        if (!payload?.valid) {
          setError('This assessment invite is invalid, expired, or already used.');
          setApplicant(null);
          return;
        }

        setApplicant(payload.applicant);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to validate this assessment invite.');
        }
      } finally {
        setLoading(false);
      }
    }

    validateToken();

    return () => controller.abort();
  }, [token]);

  return (
    <Layout
      title="Career Assessment Invite | NeoLabs"
      description="Continue to your secured NeoLabs career assessment."
    >
      <GradientSection className="min-h-[calc(100vh-88px)] py-20">
        <div className="section-container">
          <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 text-light shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              Career assessment invite
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">
              Continue to Apply Now
            </h1>

            {loading && (
              <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-light/75">
                Checking your secure invite...
              </p>
            )}

            {!loading && error && (
              <p className="mt-6 rounded-2xl border border-secondary/25 bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
                {error}
              </p>
            )}

            {!loading && applicant && (
              <div className="mt-8 space-y-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-sm text-light/60">Invite assigned to</p>
                  <p className="mt-2 text-xl font-semibold text-light">{applicant.name}</p>
                  <p className="mt-1 text-sm text-light/70">{applicant.email}</p>
                </div>

                <a
                  className="btn-primary inline-flex bg-secondary text-dark hover:brightness-100"
                  href={`/careers?token=${encodeURIComponent(token)}`}
                >
                  Open assessment
                </a>
              </div>
            )}
          </div>
        </div>
      </GradientSection>
    </Layout>
  );
};

export default ApplicantNextStep;
