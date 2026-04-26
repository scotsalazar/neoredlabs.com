import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import {
  clearAdminSession,
  createJobOfferFollowUp,
  createApplicantToken,
  fetchCareerApplications,
  fetchApplicantTokens
} from '../lib/api/careerAdmin.js';
import { adminTokenStorageKey } from './CareerAdminLogin.jsx';

const statusLabels = {
  sent: 'Sent',
  used: 'Used',
  expired: 'Expired',
  revoked: 'Revoked',
  in_progress: 'In progress',
  created: 'Active',
  none: 'No link'
};

const initialInviteForm = {
  name: '',
  email: ''
};

const answerLabels = {
  aiTools: 'AI tools',
  api: 'API understanding',
  modernWorkflows: 'Modern workflows'
};

const categoryLabels = {
  authenticity: 'Authenticity',
  detail: 'Detail',
  structure: 'Structure',
  processThinking: 'Process',
  modernTechExperience: 'Modern tech'
};

const applicationStatusLabels = {
  assessment_completed: 'Assessment Completed - Admin to review and follow-up on Email',
  follow_up_sent: 'Follow-up sent',
  job_offer_accepted: 'Job Offer accepted',
  job_offer_declined: 'Job Offer declined'
};

const CareerAdmin = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState(initialInviteForm);
  const [adminToken, setAdminToken] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [followUpLink, setFollowUpLink] = useState('');
  const [sendingFollowUp, setSendingFollowUp] = useState(false);

  const selectedApplication = useMemo(
    () => applications.find((application) => application.id === selectedApplicationId) || applications[0] || null,
    [applications, selectedApplicationId]
  );

  const loadDesk = async (token = adminToken) => {
    setLoading(true);
    setError('');

    try {
      const [tokenPayload, applicationPayload] = await Promise.all([
        fetchApplicantTokens(token),
        fetchCareerApplications(token, { passed: undefined })
      ]);
      const nextApplications = applicationPayload?.applications || [];
      setTokens(tokenPayload?.tokens || []);
      setApplications(nextApplications);
      setSelectedApplicationId((currentId) => {
        if (currentId && nextApplications.some((application) => application.id === currentId)) {
          return currentId;
        }
        return nextApplications[0]?.id || null;
      });
    } catch (err) {
      setError(err.message || 'Unable to load admin desk.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(adminTokenStorageKey) : '';
    if (stored) {
      setAdminToken(stored);
      loadDesk(stored);
    } else {
      navigate('/admin/login');
    }
  }, []);

  const handleRefresh = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(adminTokenStorageKey, adminToken);
    }
    await loadDesk(adminToken);
  };

  const handleLogout = async () => {
    await clearAdminSession(adminToken).catch(() => {});
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(adminTokenStorageKey);
    }
    navigate('/admin/login');
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
      if (!payload?.inviteUrl) {
        throw new Error('Assessment invite API returned no secure link. Please refresh and try again.');
      }
      setGeneratedLink(payload.inviteUrl || '');
      setMessage('Assessment invite link created. Send this link manually to the applicant.');
      setForm(initialInviteForm);
      await loadDesk(adminToken);
    } catch (err) {
      setError(err.message || 'Unable to create assessment invite link.');
    } finally {
      setCreating(false);
    }
  };

  const handleFollowUpSent = async () => {
    if (!selectedApplication) return;

    setSendingFollowUp(true);
    setError('');
    setMessage('');
    setFollowUpLink('');

    try {
      const payload = await createJobOfferFollowUp(selectedApplication.id, adminToken);
      if (!payload?.offerUrl) {
        throw new Error('Follow-up API returned no secured response link. Please refresh and try again.');
      }
      setFollowUpLink(payload.offerUrl || '');
      setMessage('Follow-up marked sent. Copy the secured job offer response link into your email.');
      await loadDesk(adminToken);
    } catch (err) {
      setError(err.message || 'Unable to create follow-up link.');
    } finally {
      setSendingFollowUp(false);
    }
  };

  return (
    <Layout
      title="Career Admin | NeoLabs"
      description="Internal career assessment invite management for NeoLabs."
    >
      <section className="bg-page-muted">
        <div className="section-container py-16">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Internal admin</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink-strong">
                Admin desk
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-copy">
                Generate assessment invites, review applicants, and inspect scores, answers, and status details.
              </p>
            </div>
            <button type="button" onClick={handleLogout} className="btn-secondary self-start sm:self-auto">
              Logout
            </button>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="surface-panel p-8">
              <div>
                <p className="eyebrow">Invite tool</p>
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
                <button type="button" onClick={handleRefresh} className="btn-secondary">
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
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <p className="text-sm text-copy">{token.email}</p>
                          {token.applicationPassed && (
                            <span className="rounded-full bg-secondary/15 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                              Passed
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-copy">
                          {token.status === 'created' ? 'Open - Candidate to take Exam' : statusLabels[token.status] || token.status} / expires {new Date(token.expiresAt).toLocaleDateString()}
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

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
            <div className="surface-panel p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Applicants</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-strong">
                    Assessment submissions
                  </h2>
                </div>
                {loading && <p className="text-sm text-copy">Loading...</p>}
              </div>

              <div className="mt-6 space-y-3">
                {!loading && applications.map((application) => (
                  <button
                    key={application.id}
                    type="button"
                    onClick={() => setSelectedApplicationId(application.id)}
                    className={`w-full rounded-[1.25rem] border p-4 text-left transition ${
                      selectedApplication?.id === application.id
                        ? 'border-primary bg-primary/5'
                        : 'border-line bg-page hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-ink-strong">{application.name}</h3>
                        <p className="mt-1 text-sm text-copy">{application.email}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        application.passed ? 'bg-secondary/15 text-primary' : 'bg-line text-copy'
                      }`}>
                        {application.passed ? 'Passed' : 'Review'}
                      </span>
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-copy">
                      Score {application.score}/{application.passingScore} / {application.role}
                    </p>
                    <p className="mt-2 text-xs font-medium text-copy">
                      {applicationStatusLabels[application.applicationStatus] || application.applicationStatus}
                    </p>
                  </button>
                ))}

                {!loading && applications.length === 0 && (
                  <p className="text-sm text-copy">No applicant submissions found.</p>
                )}
              </div>
            </div>

            <div className="surface-panel p-8">
              {selectedApplication ? (
                <div>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="eyebrow">Applicant detail</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong">
                        {selectedApplication.name}
                      </h2>
                      <p className="mt-2 text-sm text-copy">{selectedApplication.email}</p>
                      <p className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {applicationStatusLabels[selectedApplication.applicationStatus] || selectedApplication.applicationStatus}
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-line bg-page px-5 py-4 text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copy">
                        Score
                      </p>
                      <p className="mt-1 text-4xl font-bold text-ink-strong">
                        {selectedApplication.score}
                      </p>
                      <p className={`text-sm font-semibold ${
                        selectedApplication.passed ? 'text-primary' : 'text-copy'
                      }`}>
                        {selectedApplication.passed ? 'Passed' : 'Below benchmark'}
                      </p>
                    </div>
                  </div>

                  {selectedApplication.passed && !selectedApplication.jobOfferDecision && (
                    <div className="mt-6 rounded-[1.25rem] border border-line bg-page p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-ink-strong">Email follow-up</p>
                          <p className="mt-2 text-sm leading-6 text-copy">
                            Send your email manually with the job offer attached, then include the secured response link generated here.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn-primary self-start"
                          onClick={handleFollowUpSent}
                          disabled={sendingFollowUp}
                        >
                          {sendingFollowUp ? 'Creating...' : 'Follow-up sent'}
                        </button>
                      </div>

                      {followUpLink && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                            Secured job offer response link
                          </p>
                          <input
                            className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink"
                            value={followUpLink}
                            readOnly
                            onFocus={(event) => event.target.select()}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.25rem] border border-line bg-page p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                        Recommendation
                      </p>
                      <p className="mt-2 font-semibold text-ink-strong">{selectedApplication.recommendation}</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-line bg-page p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                        AI risk
                      </p>
                      <p className="mt-2 font-semibold text-ink-strong">{selectedApplication.aiGeneratedRisk}</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-line bg-page p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                        Submitted
                      </p>
                      <p className="mt-2 font-semibold text-ink-strong">
                        {new Date(selectedApplication.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {selectedApplication.jobOfferDecision && (
                    <div className="mt-6 rounded-[1.25rem] border border-line bg-page p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                        Job offer response
                      </p>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <p className="text-sm text-copy">
                          Decision: <span className="font-semibold text-ink-strong">{selectedApplication.jobOfferDecision}</span>
                        </p>
                        <p className="text-sm text-copy">
                          Earliest start: <span className="font-semibold text-ink-strong">
                            {selectedApplication.earliestStartDate ? new Date(selectedApplication.earliestStartDate).toLocaleDateString() : 'Not provided'}
                          </span>
                        </p>
                        <p className="text-sm text-copy">
                          Mobile / GCash: <span className="font-semibold text-ink-strong">{selectedApplication.mobileNumber}</span>
                        </p>
                        <p className="text-sm text-copy">
                          Working computer: <span className="font-semibold text-ink-strong">
                            {selectedApplication.hasWorkingComputer === true
                              ? 'Yes'
                              : selectedApplication.hasWorkingComputer === false
                                ? 'No'
                                : 'Not provided'}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 rounded-[1.25rem] border border-line bg-page p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                      Summary
                    </p>
                    <p className="mt-3 text-sm leading-7 text-copy">{selectedApplication.summary}</p>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-line bg-page p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                        Score breakdown
                      </p>
                      <div className="mt-4 space-y-3">
                        {Object.entries(selectedApplication.categoryScores || {}).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between gap-4">
                            <span className="text-sm text-copy">{categoryLabels[key] || key}</span>
                            <span className="font-semibold text-ink-strong">{value}/20</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-line bg-page p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                        Review notes
                      </p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-ink-strong">Strengths</p>
                          <ul className="mt-2 space-y-1 text-sm leading-6 text-copy">
                            {(selectedApplication.strengths || []).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink-strong">Concerns</p>
                          <ul className="mt-2 space-y-1 text-sm leading-6 text-copy">
                            {(selectedApplication.concerns || []).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {Object.entries(selectedApplication.answers || {}).map(([key, value]) => (
                      <div key={key} className="rounded-[1.25rem] border border-line bg-page p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copy">
                          {answerLabels[key] || key}
                        </p>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-copy">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-copy">Select an applicant to view their assessment details.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerAdmin;
