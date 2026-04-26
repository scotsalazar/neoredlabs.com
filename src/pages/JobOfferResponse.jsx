import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import {
  submitJobOfferResponse,
  validateJobOfferToken
} from '../lib/api/jobOfferTokens.js';

const initialForm = {
  earliestStartDate: '',
  mobileNumberGcash: '',
  hasWorkingComputer: '',
  decision: 'accepted'
};

const JobOfferResponse = () => {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [applicant, setApplicant] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedDecision, setSubmittedDecision] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawToken = params.get('token') || '';
    const controller = new AbortController();

    async function validate() {
      if (!rawToken) {
        setError('This job offer link is missing or invalid.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const payload = await validateJobOfferToken(rawToken, { signal: controller.signal });

        if (!payload?.valid) {
          setError('This job offer link is invalid, expired, or already used.');
          setApplicant(null);
          return;
        }

        setToken(rawToken);
        setApplicant(payload.applicant);

        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', '/offer-response');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to validate this job offer link.');
        }
      } finally {
        setLoading(false);
      }
    }

    validate();
    return () => controller.abort();
  }, [location.search]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDecisionChange = (decision) => {
    setForm((prev) => ({ ...prev, decision }));
  };

  const handleComputerChange = (hasWorkingComputer) => {
    setForm((prev) => ({ ...prev, hasWorkingComputer }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    if (!form.hasWorkingComputer) {
      setError('Choose whether you have a working personal laptop/computer.');
      setSubmitting(false);
      return;
    }

    try {
      const payload = await submitJobOfferResponse({
        token,
        earliestStartDate: form.earliestStartDate,
        mobileNumberGcash: form.mobileNumberGcash,
        hasWorkingComputer: form.hasWorkingComputer === 'yes',
        decision: form.decision
      });
      setSubmittedDecision(payload.decision);
      setToken('');
    } catch (err) {
      setError(err.message || 'Unable to submit your response.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      title="Job Offer Response | NeoLabs"
      description="Secure job offer response form for NeoLabs applicants."
    >
      <section className="bg-page-muted">
        <div className="section-container py-16">
          <div className="surface-panel mx-auto max-w-3xl p-8">
            <p className="eyebrow">Secure job offer response</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong">
              Accept or decline job offer
            </h1>

            {loading && <p className="mt-6 text-sm text-copy">Checking your secure link...</p>}

            {!loading && error && (
              <p className="mt-6 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {!loading && submittedDecision && (
              <div className="mt-6 rounded-[1rem] border border-line bg-page px-4 py-4">
                <p className="font-semibold text-ink-strong">
                  Your response has been submitted.
                </p>
                <p className="mt-2 text-sm text-copy">
                  Status: Job offer {submittedDecision === 'accepted' ? 'accepted' : 'declined'}.
                </p>
              </div>
            )}

            {!loading && applicant && !submittedDecision && (
              <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                <div className="rounded-[1.25rem] border border-line bg-page p-5">
                  <p className="text-sm font-semibold text-ink-strong">{applicant.name}</p>
                  <p className="mt-1 text-sm text-copy">{applicant.email}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-copy">
                    {applicant.role}
                  </p>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-ink-strong">Earliest start date</span>
                  <input
                    type="date"
                    name="earliestStartDate"
                    value={form.earliestStartDate}
                    onChange={handleChange}
                    className="rounded-2xl border border-line bg-page px-4 py-3 text-ink"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-ink-strong">Mobile number / GCash</span>
                  <input
                    name="mobileNumberGcash"
                    value={form.mobileNumberGcash}
                    onChange={handleChange}
                    className="rounded-2xl border border-line bg-page px-4 py-3 text-ink"
                    placeholder="09xxxxxxxxx"
                    inputMode="tel"
                    required
                  />
                </label>

                <fieldset className="grid gap-3">
                  <legend className="text-sm font-semibold text-ink-strong">
                    Do you have a working personal laptop/computer?
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ['yes', 'Yes'],
                      ['no', 'No']
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleComputerChange(value)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          form.hasWorkingComputer === value
                            ? 'border-primary bg-primary text-white shadow-sm'
                            : 'border-line bg-page text-ink hover:border-primary/60'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ['accepted', 'Accept job offer'],
                      ['declined', 'Decline job offer']
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleDecisionChange(value)}
                        className={`rounded-2xl border px-5 py-4 text-sm font-semibold transition ${
                          form.decision === value
                            ? 'border-primary bg-primary text-white shadow-sm'
                            : 'border-line bg-page text-ink hover:border-primary/60'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <button type="submit" className="btn-primary justify-self-start" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit response'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobOfferResponse;
