import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import {
  downloadJobOfferContract,
  submitJobOfferResponse,
  validateJobOfferToken
} from '../lib/api/jobOfferTokens.js';

const initialForm = {
  earliestStartDate: '',
  mobileNumberGcash: '',
  hasWorkingComputer: '',
  contractAgreementAccepted: false,
  decision: 'accepted'
};

const fieldBase =
  'w-full rounded-2xl border bg-page px-4 py-3.5 text-[15px] text-ink outline-none transition duration-200 placeholder:text-copy/60 focus:-translate-y-0.5 focus:border-primary focus:bg-panel focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60';

const fieldLabel =
  'text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-copy';

const fieldHelp = 'mt-2 text-xs leading-5';

const primaryButtonStyle = {
  backgroundColor: 'rgb(var(--button-primary-bg))',
  color: 'rgb(var(--button-primary-fg))'
};

const validateOfferForm = (form, decision = 'accepted') => {
  const errors = {};
  const digitsOnly = form.mobileNumberGcash.replace(/\D/g, '');

  if (!form.earliestStartDate) {
    errors.earliestStartDate = 'Select your earliest available start date.';
  }

  if (!form.mobileNumberGcash.trim()) {
    errors.mobileNumberGcash = 'Enter your mobile number / GCash.';
  } else if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    errors.mobileNumberGcash = 'Use a valid PH mobile or GCash number, e.g. 09171234567.';
  }

  if (!form.hasWorkingComputer) {
    errors.hasWorkingComputer = 'Choose Yes or No.';
  }

  if (decision === 'accepted' && !form.contractAgreementAccepted) {
    errors.contractAgreementAccepted = 'Confirm that you have read the contract agreement.';
  }

  return errors;
};

const JobOfferResponse = () => {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [applicant, setApplicant] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedDecision, setSubmittedDecision] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDecision, setPendingDecision] = useState('');
  const [contractUrl, setContractUrl] = useState('');
  const [contractLoading, setContractLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawToken = params.get('token') || '';
    const controller = new AbortController();
    let objectUrl = '';

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

        if (payload.applicant?.contractAgreement) {
          setContractLoading(true);
          const contractBlob = await downloadJobOfferContract(rawToken, { signal: controller.signal });
          objectUrl = URL.createObjectURL(contractBlob);
          setContractUrl(objectUrl);
          setContractLoading(false);
        }

        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', '/offer-response');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to validate this job offer link.');
        }
        setContractLoading(false);
      } finally {
        setLoading(false);
      }
    }

    validate();
    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [location.search]);

  const validation = useMemo(() => validateOfferForm(form, pendingDecision || form.decision), [form, pendingDecision]);

  const isFieldValid = (field) => touched[field] && !validation[field] && Boolean(form[field]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (event) => {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));
  };

  const handleComputerChange = (hasWorkingComputer) => {
    setForm((prev) => ({ ...prev, hasWorkingComputer }));
    setTouched((prev) => ({ ...prev, hasWorkingComputer: true }));
  };

  const handleContractAgreementChange = (event) => {
    setForm((prev) => ({ ...prev, contractAgreementAccepted: event.target.checked }));
    setTouched((prev) => ({ ...prev, contractAgreementAccepted: true }));
  };

  const openConfirmation = (decision) => {
    setError('');
    const nextValidation = validateOfferForm(form, decision);

    setTouched({
      earliestStartDate: true,
      mobileNumberGcash: true,
      hasWorkingComputer: true,
      contractAgreementAccepted: decision === 'accepted'
    });

    if (Object.keys(nextValidation).length > 0) {
      setError('Please complete the highlighted fields before submitting.');
      return;
    }

    setPendingDecision(decision);
    setForm((prev) => ({ ...prev, decision }));
    setShowConfirm(true);
  };

  const submitConfirmed = async () => {
    setSubmitting(true);
    setError('');

    try {
      const payload = await submitJobOfferResponse({
        token,
        earliestStartDate: form.earliestStartDate,
        mobileNumberGcash: form.mobileNumberGcash,
        hasWorkingComputer: form.hasWorkingComputer === 'yes',
        contractAgreementAccepted: form.contractAgreementAccepted,
        decision: pendingDecision || form.decision
      });
      setSubmittedDecision(payload.decision);
      setToken('');
      setShowConfirm(false);
      setPendingDecision('');
    } catch (err) {
      setError(err.message || 'Unable to submit your response.');
      setShowConfirm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const closeConfirmation = () => {
    setPendingDecision('');
    setShowConfirm(false);
  };

  const inputStateClass = (field) => {
    if (touched[field] && validation[field]) return 'border-red-500/70 focus:border-red-500 focus:ring-red-500/10';
    if (isFieldValid(field)) return 'border-primary/70';
    return 'border-line';
  };

  return (
    <Layout
      title="Job Offer Response | NeoLabs"
      description="Secure job offer response form for NeoLabs applicants."
    >
      <section className="min-h-[calc(100vh-7rem)] bg-page-muted text-ink">
        <div className="section-container py-6 sm:py-10">
          <motion.div
            className="surface-panel mx-auto max-w-5xl overflow-hidden rounded-[1.75rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="border-b border-line bg-panel-muted px-5 py-4 sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
                    Secure Response
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-copy">
                    Private one-time link. The token is removed from the address bar after verification.
                  </p>
                </div>
                <div className="min-w-[12rem] rounded-2xl border border-line bg-panel px-4 py-3">
                  <div className="flex items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-copy">
                    <span>Step 2 of 3</span>
                    <span>Offer</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                    <span className="block h-full w-2/3 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-line p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Job offer
                </p>
                <h1 className="mt-4 max-w-sm text-4xl font-semibold leading-[1.04] tracking-tight text-ink-strong sm:text-[3.25rem]">
                  Accept or decline job offer
                </h1>
                <p className="mt-4 max-w-sm text-base leading-7 text-copy">
                  Confirm your decision and contact details so our team can prepare the next step.
                </p>

                {applicant && (
                  <div className="mt-7 rounded-2xl border border-line bg-panel-muted p-5">
                    <p className="text-sm font-semibold text-ink-strong">{applicant.name}</p>
                    <p className="mt-1 break-words text-sm text-copy">{applicant.email}</p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-copy">
                      {applicant.role}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-8">
                {loading && <p className="text-sm text-copy">Checking your secure link...</p>}

                {!loading && error && (
                  <p className="mb-5 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                {!loading && submittedDecision && (
                  <motion.div
                    className="rounded-3xl border border-primary/20 bg-primary/10 p-6"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <p className="text-2xl font-semibold text-ink-strong">
                      Your response has been submitted.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-copy">
                      Status: Job offer {submittedDecision === 'accepted' ? 'accepted' : 'declined'}.
                    </p>
                    {submittedDecision === 'accepted' && (
                      <p className="mt-2 text-sm leading-6 text-copy">
                        Our team will reach out via email for the next steps. Please wait for further updates.
                      </p>
                    )}
                  </motion.div>
                )}

                {!loading && applicant && !submittedDecision && (
                  <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
                    <section className="rounded-3xl border border-line bg-panel-muted p-5">
                      <div>
                        <p className="text-sm font-semibold text-ink-strong">Contract agreement</p>
                        <p className="mt-1 text-xs leading-5 text-copy">
                          Review the contract agreement before accepting this offer.
                        </p>
                      </div>

                      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-panel">
                        {contractLoading && (
                          <p className="px-4 py-5 text-sm text-copy">Loading contract agreement...</p>
                        )}
                        {!contractLoading && contractUrl && (
                          <iframe
                            title="Contract agreement PDF"
                            src={contractUrl}
                            className="h-[28rem] w-full bg-white"
                          />
                        )}
                        {!contractLoading && !contractUrl && (
                          <p className="px-4 py-5 text-sm text-copy">
                            Contract agreement PDF is unavailable. Contact the administrator before accepting.
                          </p>
                        )}
                      </div>

                      {contractUrl && (
                        <a
                          href={contractUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          Open contract PDF in a new tab
                        </a>
                      )}

                      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-panel px-4 py-3 text-sm font-semibold text-ink">
                        <input
                          type="checkbox"
                          checked={form.contractAgreementAccepted}
                          onChange={handleContractAgreementChange}
                          className="mt-1 h-4 w-4 accent-primary"
                        />
                        <span>I have read and understood the contract agreement.</span>
                      </label>
                      {validation.contractAgreementAccepted && touched.contractAgreementAccepted && (
                        <p className="mt-2 text-xs text-red-600">{validation.contractAgreementAccepted}</p>
                      )}
                    </section>

                    <section className="rounded-3xl border border-line bg-panel-muted p-5">
                      <div>
                        <p className="text-sm font-semibold text-ink-strong">Availability</p>
                        <p className="mt-1 text-xs leading-5 text-copy">Tell us when you can realistically begin.</p>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="earliestStartDate" className={fieldLabel}>
                          Earliest start date
                        </label>
                        <input
                          id="earliestStartDate"
                          type="date"
                          name="earliestStartDate"
                          value={form.earliestStartDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`mt-2 ${fieldBase} ${inputStateClass('earliestStartDate')}`}
                          required
                        />
                        {validation.earliestStartDate && touched.earliestStartDate && (
                          <p className={`${fieldHelp} text-red-600`}>
                            {validation.earliestStartDate}
                          </p>
                        )}
                      </div>
                    </section>

                    <section className="rounded-3xl border border-line bg-panel-muted p-5">
                      <div>
                        <p className="text-sm font-semibold text-ink-strong">Contact and setup</p>
                        <p className="mt-1 text-xs leading-5 text-copy">Use the same number for mobile and GCash.</p>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="mobileNumberGcash" className={fieldLabel}>
                          Mobile number / GCash
                        </label>
                        <input
                          id="mobileNumberGcash"
                          name="mobileNumberGcash"
                          value={form.mobileNumberGcash}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`mt-2 ${fieldBase} ${inputStateClass('mobileNumberGcash')}`}
                          placeholder="09xxxxxxxxx"
                          inputMode="tel"
                          required
                        />
                        {(validation.mobileNumberGcash && touched.mobileNumberGcash) || isFieldValid('mobileNumberGcash') ? (
                          <p className={`${fieldHelp} ${validation.mobileNumberGcash && touched.mobileNumberGcash ? 'text-red-600' : 'text-primary'}`}>
                            {validation.mobileNumberGcash && touched.mobileNumberGcash
                              ? validation.mobileNumberGcash
                              : 'Number format looks good.'}
                          </p>
                        ) : null}
                      </div>

                      <fieldset className="mt-5 grid gap-3">
                        <legend className="text-sm font-semibold text-ink-strong">
                          Do you have a working personal laptop/computer?
                        </legend>
                        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-12">
                          {[
                            ['yes', 'Yes'],
                            ['no', 'No']
                          ].map(([value, label]) => (
                            <label
                              key={value}
                              className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink transition hover:text-ink-strong"
                            >
                              <input
                                type="radio"
                                name="hasWorkingComputer"
                                value={value}
                                checked={form.hasWorkingComputer === value}
                                onChange={() => handleComputerChange(value)}
                                className="h-4 w-4 accent-primary"
                              />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>
                        {validation.hasWorkingComputer && touched.hasWorkingComputer && (
                          <p className="text-xs text-red-600">{validation.hasWorkingComputer}</p>
                        )}
                      </fieldset>
                    </section>

                    <section className="rounded-3xl border border-line bg-panel-muted p-5">
                      <div>
                        <p className="text-sm font-semibold text-ink-strong">Offer decision</p>
                        <p className="mt-1 text-xs leading-5 text-copy">Choose one action below. We will ask you to confirm before sending it.</p>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openConfirmation('accepted')}
                          className="rounded-2xl border border-primary/30 px-5 py-4 text-sm font-bold shadow-[0_18px_36px_rgb(var(--color-primary)/0.2)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
                          style={primaryButtonStyle}
                          disabled={submitting}
                        >
                          Accept Job Offer
                        </motion.button>
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openConfirmation('declined')}
                          className="rounded-2xl border border-line bg-panel px-5 py-4 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-page active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={submitting}
                        >
                          Decline
                        </motion.button>
                      </div>
                    </section>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showConfirm && (
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/70 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="job-offer-confirm-title"
                className="w-full max-w-sm rounded-[1.25rem] border border-line bg-panel p-5 text-ink shadow-[0_24px_90px_rgb(var(--color-dark)/0.24)]"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  pendingDecision === 'declined'
                    ? 'bg-red-500/10 text-red-600'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {pendingDecision === 'declined' ? '!' : 'OK'}
                </div>
                <p id="job-offer-confirm-title" className="text-lg font-semibold text-ink-strong">
                  {pendingDecision === 'declined' ? 'Decline this job offer?' : 'Accept this job offer?'}
                </p>
                <p className="mt-3 text-sm leading-6 text-copy">
                  This secure link can only be used once. Confirm before sending your decision to NeoLabs.
                  {pendingDecision === 'accepted' ? ' Your confirmation includes the contract agreement acknowledgement.' : ''}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="rounded-full border border-line bg-panel px-4 py-3 text-sm font-semibold text-ink transition hover:bg-page-muted disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={closeConfirmation}
                    disabled={submitting}
                  >
                    Go back
                  </button>
                  <button
                    type="button"
                    className={`rounded-full px-4 py-3 text-sm font-bold shadow-[0_14px_32px_rgb(var(--color-dark)/0.12)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 ${
                      pendingDecision === 'declined'
                        ? 'bg-red-600 text-white'
                        : ''
                    }`}
                    style={pendingDecision === 'declined' ? undefined : primaryButtonStyle}
                    onClick={submitConfirmed}
                    disabled={submitting}
                  >
                    {submitting
                      ? 'Sending...'
                      : pendingDecision === 'declined'
                        ? 'Confirm decline'
                        : 'Confirm accept'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
};

export default JobOfferResponse;
