import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';
import {
  claimApplicantToken,
  resumeApplicantToken,
  validateApplicantToken
} from '../lib/api/applicantTokens.js';

const jobOpenings = [
  {
    slug: 'prompt-engineer',
    title: 'Prompt Engineer',
    bullets: [
      'Design practical Claude and OpenAI workflows',
      'Test prompts against real business use cases',
      'Connect AI outputs with apps, automations, and teams',
      'Help turn messy operations into clear AI-assisted systems'
    ]
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst',
    bullets: [
      'Map client workflows and bottlenecks',
      'Translate business needs into clear product scope',
      'Support AI solution design with practical research',
      'Opening in a future hiring round'
    ]
  },
  {
    slug: 'operations',
    title: 'Operations',
    bullets: [
      'Keep projects, clients, and internal systems moving',
      'Coordinate delivery details across small fast teams',
      'Improve repeatable processes as the studio grows',
      'Opening in a future hiring round'
    ]
  }
];

const roleCards = [
  {
    title: 'Prompt Engineer',
    status: 'Open now',
    disabled: false,
    summary: 'Shape AI workflows, prompts, and practical automations for real client operations.',
    traits: ['LLM testing', 'API curiosity', 'Product sense']
  },
  {
    title: 'Business Analyst',
    status: 'Coming soon',
    disabled: true,
    summary: 'Translate workflows, requirements, and client context into sharp delivery maps.',
    traits: ['Discovery', 'Process mapping', 'Client logic']
  },
  {
    title: 'Operations',
    status: 'Coming soon',
    disabled: true,
    summary: 'Keep delivery clean, coordinated, and reliable as NeoLabs scales its systems.',
    traits: ['Coordination', 'Quality checks', 'Delivery rhythm']
  }
];

const promptEngineerQuestions = [
  'What experience do you have with Claude, OpenAI, or other AI tools?',
  'In your own words, what is an API?',
  'Have you worked on mobile applications, chatbots, automations, or AI workflows before?'
];

const steps = ['Intro', 'Role', 'Questions', 'Thanks'];
const introVideoSrc = '/assets/videos/career-application-intro.mp4';
const roleSelectionVideoSrc = '/assets/videos/career-application-role-select.mp4';
const questionsVideoSrc = '/assets/videos/career-application-questions.mp4';
const assessmentSessionStorageKey = 'neolabs_career_assessment_session';

const initialFormState = {
  name: '',
  email: '',
  role: '',
  answers: {
    q1: '',
    q2: '',
    q3: ''
  }
};

const stepVariants = {
  enter: { opacity: 0, y: 24, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.99 }
};

const Careers = () => {
  const location = useLocation();
  const [showApplicationFlow, setShowApplicationFlow] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [formState, setFormState] = useState(initialFormState);
  const [inviteToken, setInviteToken] = useState('');
  const [resumeToken, setResumeToken] = useState('');
  const [inviteApplicant, setInviteApplicant] = useState(null);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [claimingInvite, setClaimingInvite] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [submissionStage, setSubmissionStage] = useState('');
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [bannerMessage, setBannerMessage] = useState('');
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [videoComplete, setVideoComplete] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [questionsIntroComplete, setQuestionsIntroComplete] = useState(false);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  const selectedRole = useMemo(
    () => roleCards.find((role) => role.title === formState.role),
    [formState.role]
  );
  const showingQuestionsIntro = wizardStep === 2 && !questionsIntroComplete;

  const getInitialInviteFormState = () => ({
    ...initialFormState,
    name: inviteApplicant?.name || '',
    email: inviteApplicant?.email || ''
  });

  const readStoredAssessmentSession = () => {
    if (typeof window === 'undefined') return null;

    try {
      const raw = window.localStorage.getItem(assessmentSessionStorageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  };

  const saveAssessmentSession = (overrides = {}) => {
    if (typeof window === 'undefined') return;

    const session = {
      resumeToken,
      applicant: inviteApplicant,
      formState,
      wizardStep,
      questionsIntroComplete,
      ...overrides
    };

    if (!session.resumeToken || !session.applicant) return;

    window.localStorage.setItem(assessmentSessionStorageKey, JSON.stringify(session));
  };

  const clearAssessmentSession = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(assessmentSessionStorageKey);
    }
  };

  const resetFlow = () => {
    setWizardStep(0);
    setFormState(getInitialInviteFormState());
    setErrors({});
    setFormMessage('');
    setSubmissionStage('');
    setAssessmentResult(null);
    setSubmitting(false);
    setVideoAvailable(true);
    setVideoComplete(false);
    setVideoProgress(0);
    setVideoReady(false);
    setQuestionsIntroComplete(false);
  };

  useEffect(() => {
    if (!showApplicationFlow || wizardStep !== 0) return;

    setVideoAvailable(true);
    setVideoReady(false);
    setVideoProgress(0);
  }, [showApplicationFlow, wizardStep]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token') || '';
    const controller = new AbortController();

    async function validateInvite() {
      if (!token) {
        const storedSession = readStoredAssessmentSession();

        if (storedSession?.resumeToken) {
          setInviteLoading(true);
          setInviteMessage('Resuming your saved assessment...');
          setInviteError('');

          try {
            const payload = await resumeApplicantToken(storedSession.resumeToken, {
              signal: controller.signal
            });

            if (payload?.valid) {
              const nextApplicant = payload.applicant || storedSession.applicant;
              setResumeToken(storedSession.resumeToken);
              setInviteApplicant(nextApplicant);
              setFormState({
                ...initialFormState,
                ...(storedSession.formState || {}),
                name: nextApplicant?.name || '',
                email: nextApplicant?.email || ''
              });
              setWizardStep(Math.min(Math.max(Number(storedSession.wizardStep) || 1, 1), 2));
              setQuestionsIntroComplete(Boolean(storedSession.questionsIntroComplete));
              setShowApplicationFlow(true);
              setInviteMessage(`Assessment resumed for ${nextApplicant?.name || 'this applicant'}.`);
              return;
            }

            clearAssessmentSession();
          } catch (error) {
            if (error.name !== 'AbortError') {
              clearAssessmentSession();
            }
          } finally {
            setInviteLoading(false);
          }
        }

        setInviteToken('');
        setInviteApplicant(null);
        setInviteMessage('');
        setInviteError('Use your secure assessment invite link to access Apply Now.');
        return;
      }

      setInviteLoading(true);
      setInviteError('');
      setInviteMessage('Checking your secure assessment invite...');

      try {
        const payload = await validateApplicantToken(token, { signal: controller.signal });

        if (!payload?.valid) {
          setInviteToken('');
          setInviteApplicant(null);
          setInviteMessage('');
          setInviteError('This assessment invite is invalid, expired, or already used.');
          return;
        }

        setInviteToken(token);
        setResumeToken('');
        setInviteApplicant(payload.applicant);
        setFormState({
          ...initialFormState,
          name: payload.applicant?.name || '',
          email: payload.applicant?.email || ''
        });
        setWizardStep(0);
        setErrors({});
        setFormMessage('');
        setSubmissionStage('');
        setAssessmentResult(null);
        setSubmitting(false);
        setVideoAvailable(true);
        setVideoComplete(false);
        setVideoProgress(0);
        setVideoReady(false);
        setQuestionsIntroComplete(false);
        setShowApplicationFlow(true);
        setInviteMessage(`Assessment opened for ${payload.applicant?.name || 'this applicant'}.`);
        setInviteError('');

        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', '/careers');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setInviteToken('');
          setInviteApplicant(null);
          setInviteMessage('');
          setInviteError(error.message || 'Unable to validate this assessment invite.');
        }
      } finally {
        setInviteLoading(false);
      }
    }

    validateInvite();

    return () => controller.abort();
  }, [location.search]);

  useEffect(() => {
    if (!resumeToken || !inviteApplicant || !showApplicationFlow) return;

    saveAssessmentSession();
  }, [
    resumeToken,
    inviteApplicant,
    showApplicationFlow,
    formState,
    wizardStep,
    questionsIntroComplete
  ]);

  const closeFlow = () => {
    setShowApplicationFlow(false);
    resetFlow();
  };

  const openFlow = () => {
    if (resumeToken && inviteApplicant) {
      const storedSession = readStoredAssessmentSession();

      if (storedSession?.resumeToken === resumeToken) {
        setFormState({
          ...initialFormState,
          ...(storedSession.formState || {}),
          name: inviteApplicant.name || '',
          email: inviteApplicant.email || ''
        });
        setWizardStep(Math.min(Math.max(Number(storedSession.wizardStep) || 1, 1), 2));
        setQuestionsIntroComplete(Boolean(storedSession.questionsIntroComplete));
      }

      setShowApplicationFlow(true);
      return;
    }

    if (!inviteToken || !inviteApplicant) {
      setBannerMessage('Use your secure assessment invite link to access Apply Now.');
      return;
    }

    resetFlow();
    setShowApplicationFlow(true);
  };

  const beginInterview = async () => {
    if (resumeToken) {
      goToStep(1);
      return;
    }

    if (!inviteToken || !inviteApplicant) {
      setFormMessage('This assessment invite is invalid or has expired.');
      return;
    }

    setClaimingInvite(true);
    setFormMessage('');

    try {
      const payload = await claimApplicantToken(inviteToken);
      const nextApplicant = payload.applicant || inviteApplicant;
      const nextFormState = {
        ...formState,
        name: nextApplicant?.name || formState.name,
        email: nextApplicant?.email || formState.email
      };

      setResumeToken(payload.resumeToken);
      setInviteToken('');
      setInviteApplicant(nextApplicant);
      setFormState(nextFormState);
      saveAssessmentSession({
        resumeToken: payload.resumeToken,
        applicant: nextApplicant,
        formState: nextFormState,
        wizardStep: 1,
        questionsIntroComplete: false
      });
      setInviteMessage(`Assessment started for ${nextApplicant?.name || 'this applicant'}.`);

      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/careers');
      }

      goToStep(1);
    } catch (error) {
      setFormMessage(error.message || 'Unable to start this assessment.');
    } finally {
      setClaimingInvite(false);
    }
  };

  const goToStep = (nextStep) => {
    setErrors({});
    setFormMessage('');
    setSubmissionStage('');
    setWizardStep(nextStep);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const replayIntroVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setVideoComplete(false);
    setVideoProgress(0);
    setVideoReady(false);
    video.play().catch(() => {
      setVideoReady(true);
    });
  };

  const updateVideoProgress = (event) => {
    const video = event.currentTarget;
    const duration = video.duration || 0;

    if (!duration) return;

    setVideoProgress(Math.min(100, (video.currentTime / duration) * 100));
  };

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const updateAnswer = (key) => (event) => {
    const value = event.target.value;
    setFormState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [key]: value
      }
    }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const selectRole = (role) => {
    if (role.disabled) return;

    setFormState((prev) => ({ ...prev, role: role.title }));
    setErrors((prev) => ({ ...prev, role: '' }));
  };

  const validateProfileStep = () => {
    const newErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Enter your name to start your profile.';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Enter your email so we can send next steps.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRoleStep = () => {
    const newErrors = {};

    if (!formState.role) {
      newErrors.role = 'Choose the Prompt Engineer role to continue.';
    } else if (formState.role !== 'Prompt Engineer') {
      newErrors.role = 'Prompt Engineer is the role accepting applications right now.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuestionsStep = () => {
    const newErrors = {};

    promptEngineerQuestions.forEach((_, index) => {
      const key = `q${index + 1}`;
      if (!formState.answers[key]?.trim()) {
        newErrors[key] = 'This answer is required.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRoleNext = () => {
    if (validateRoleStep()) {
      setQuestionsIntroComplete(false);
      goToStep(2);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profileIsValid = validateProfileStep();
    const roleIsValid = validateRoleStep();
    const questionsAreValid = validateQuestionsStep();

    if (!profileIsValid || !roleIsValid || !questionsAreValid) return;
    if (!resumeToken) {
      setFormMessage('This assessment session is invalid or has expired.');
      return;
    }

    setSubmitting(true);
    setFormMessage('');
    setSubmissionStage('Scoring your answers...');

    const webhookUrl = 'https://shezzo.app.n8n.cloud/webhook/cv-upload';
    const formData = new FormData();

    const normalizedSubmission = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      role: formState.role,
      resumeToken,
      answers: {
        q1: formState.answers.q1.trim(),
        q2: formState.answers.q2.trim(),
        q3: formState.answers.q3.trim()
      }
    };

    try {
      const assessmentResponse = await fetch('/api/career-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(normalizedSubmission)
      });
      const assessmentData = await assessmentResponse.json().catch(() => ({}));

      if (!assessmentResponse.ok || !assessmentData.assessment) {
        throw new Error(assessmentData.error || 'Unable to score the assessment right now.');
      }

      const assessment = assessmentData.assessment;
      setAssessmentResult(assessment);
      setSubmissionStage('Sending your application...');

      formData.append('flowVersion', 'career-prestep-v1');
      formData.append('name', normalizedSubmission.name);
      formData.append('email', normalizedSubmission.email);
      formData.append('role', normalizedSubmission.role);
      formData.append('answers[q1]', normalizedSubmission.answers.q1);
      formData.append('answers[q2]', normalizedSubmission.answers.q2);
      formData.append('answers[q3]', normalizedSubmission.answers.q3);
      formData.append('assessment[score]', String(assessment.score));
      formData.append('assessment[applicationId]', String(assessment.applicationId || ''));
      formData.append('assessment[passed]', String(assessment.passed));
      formData.append('assessment[passingScore]', String(assessment.passingScore));
      formData.append('assessment[recommendation]', assessment.recommendation);
      formData.append('assessment[aiGeneratedRisk]', assessment.aiGeneratedRisk);
      formData.append('assessment[summary]', assessment.summary);
      formData.append('assessment[categoryScores]', JSON.stringify(assessment.categoryScores));
      formData.append('assessment[strengths]', JSON.stringify(assessment.strengths));
      formData.append('assessment[concerns]', JSON.stringify(assessment.concerns));

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        console.warn('Career webhook submission failed after assessment was saved.');
      }

      setBannerMessage('Application received. We will be in touch soon.');
      clearAssessmentSession();
      setResumeToken('');
      goToStep(3);
    } catch (error) {
      setFormMessage(
        error.message || 'There was a problem sending your application. Please try again in a moment.'
      );
    } finally {
      setSubmitting(false);
      setSubmissionStage('');
    }
  };

  return (
    <Layout
      title="Careers | NeoLabs"
      description="Explore open roles at NeoLabs and join a modern AI startup shaping the next generation of intelligent apps."
    >
      <GradientSection className="py-20">
        <div className="section-container text-center">
          <span className="mb-6 inline-block rounded-full bg-secondary px-5 py-2 text-xs font-medium uppercase tracking-wider text-dark">
            Now Hiring
          </span>
          <h1 className="font-heading text-4xl font-bold text-light md:text-5xl">
            Join a modern AI startup shaping the next generation of intelligent apps.
          </h1>
          <p className="mt-4 text-base text-light/80">
            Secure invite links unlock the Prompt Engineer assessment.
          </p>
          {(inviteMessage || inviteError || inviteLoading) && (
            <div className={`mx-auto mt-6 max-w-xl rounded-xl border px-4 py-3 text-sm font-semibold ${
              inviteError
                ? 'border-secondary/30 bg-secondary/10 text-secondary'
                : 'border-secondary/30 bg-secondary/10 text-light'
            }`}>
              {inviteLoading ? 'Checking secure invite...' : inviteError || inviteMessage}
            </div>
          )}
          {bannerMessage && (
            <div className="mx-auto mt-6 max-w-xl rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm font-semibold text-light">
              {bannerMessage}
            </div>
          )}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {jobOpenings.map((job) => (
              <article
                key={job.title}
                id={job.slug}
                className="flex flex-col rounded-xl bg-white/5 p-8 shadow-lg"
              >
                <h2 className="font-heading text-2xl font-semibold text-light">
                  {job.title}
                </h2>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">
                  Focus
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-left text-base text-light/80">
                  {job.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              type="button"
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              onClick={openFlow}
              disabled={!inviteToken || inviteLoading}
            >
              {inviteToken ? 'Apply Now' : 'Apply Now requires invite'}
            </button>
          </div>
        </div>
      </GradientSection>

      <AnimatePresence>
        {showApplicationFlow && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-[#050b12] text-light"
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-flow-title"
          >
            <div
              className={`relative min-h-screen overflow-hidden ${
                showingQuestionsIntro ? 'px-0 py-0' : 'px-4 py-5 sm:px-6 lg:px-10'
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(60,183,171,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08)_0,transparent_28%,rgba(255,255,255,0.04)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050b12] via-[#050b12]/85 to-transparent" />

              <AnimatePresence>
                {showingQuestionsIntro && (
                  <motion.div
                    key="questions-video-interlude"
                    className="absolute inset-0 z-30 overflow-hidden bg-[#050b12]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <video
                      className="absolute inset-0 h-full w-full scale-[1.65] object-cover"
                      src={questionsVideoSrc}
                      playsInline
                      autoPlay
                      preload="auto"
                      aria-label="Prompt Engineer role preview"
                      onEnded={() => setQuestionsIntroComplete(true)}
                      onError={() => setQuestionsIntroComplete(true)}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0,rgba(5,11,18,0.08)_48%,rgba(5,11,18,0.38)_100%)]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {!showingQuestionsIntro && (
                <>
                  <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary/80">
                        Career Application
                      </p>
                      <p className="mt-1 text-sm text-light/55">
                        Step {wizardStep + 1} of {steps.length}: {steps[wizardStep]}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-light/80 transition hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                      aria-label="Close career application"
                      onClick={closeFlow}
                    >
                      x
                    </button>
                  </header>

                  <div className="relative z-10 mx-auto mt-6 grid max-w-6xl grid-cols-5 gap-2">
                    {steps.map((step, index) => (
                      <div key={step} className="h-1 rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-secondary"
                          initial={false}
                          animate={{ width: index <= wizardStep ? '100%' : '0%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <main
                className={`relative z-10 mx-auto flex items-center ${
                  showingQuestionsIntro
                    ? 'min-h-screen w-full max-w-none p-0'
                    : 'min-h-[calc(100svh-132px)] max-w-6xl py-8'
                }`}
              >
                <AnimatePresence mode="wait">
                  {wizardStep === 0 && (
                    <motion.section
                      key="intro"
                      className="grid w-full items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                    >
                      <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(60,183,171,0.22),rgba(5,11,18,0.12)),radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.18),transparent_22%),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px]" />
                        {videoAvailable && (
                          <video
                            ref={videoRef}
                            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                              videoReady ? 'opacity-100' : 'opacity-0'
                            }`}
                            src={introVideoSrc}
                            muted
                            playsInline
                            autoPlay
                            preload="metadata"
                            onCanPlay={() => setVideoReady(true)}
                            onEnded={() => {
                              setVideoComplete(true);
                              setVideoProgress(100);
                            }}
                            onTimeUpdate={updateVideoProgress}
                            onError={() => {
                              setVideoAvailable(false);
                              setVideoReady(false);
                            }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-[#050b12]/24 to-transparent" />
                        <div className="absolute left-6 right-6 top-6 flex items-center justify-between gap-3">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                            <motion.div
                              className="h-full rounded-full bg-secondary"
                              initial={false}
                              animate={{ width: `${videoProgress}%` }}
                              transition={{ duration: 0.18 }}
                            />
                          </div>
                          <button
                            type="button"
                            className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-semibold text-light/80 backdrop-blur transition hover:border-secondary/50 hover:text-secondary"
                            onClick={videoComplete ? replayIntroVideo : beginInterview}
                            disabled={claimingInvite}
                          >
                            {videoComplete ? 'Replay' : claimingInvite ? 'Starting...' : 'Skip intro'}
                          </button>
                        </div>
                        <motion.div
                          className="absolute bottom-6 left-6 right-6"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.16, duration: 0.42 }}
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                            Neo Redlabs Studio
                          </p>
                          <h2
                            id="career-flow-title"
                            className="mt-3 max-w-xl font-display text-5xl font-semibold leading-none text-light sm:text-6xl"
                          >
                            Welcome to the assessment room
                          </h2>
                        </motion.div>
                      </div>

                      <div className="max-w-xl">
                        <motion.p
                          className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 }}
                        >
                          Application Process
                        </motion.p>
                        <motion.h3
                          className="mt-4 font-heading text-4xl font-bold leading-tight text-light sm:text-5xl"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.16 }}
                        >
                          Review your invite and begin interview.
                        </motion.h3>
                        <motion.p
                          className="mt-5 text-lg leading-8 text-light/70"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.24 }}
                        >
                          Screening process to assess structured thinking and clarity of explanation.
                        </motion.p>
                        <motion.div
                          className="mt-8 flex flex-wrap gap-3"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.32 }}
                        >
                          <button
                            type="button"
                            className="btn-primary bg-secondary text-dark hover:brightness-100"
                            onClick={beginInterview}
                            disabled={claimingInvite}
                          >
                            {claimingInvite ? 'Starting...' : 'Begin Interview'}
                          </button>
                          <button
                            type="button"
                            className="btn-secondary-on-dark rounded-full px-6 py-3 text-sm font-semibold"
                            onClick={closeFlow}
                          >
                            Close
                          </button>
                        </motion.div>
                      </div>
                    </motion.section>
                  )}

                  {wizardStep === 1 && (
                    <motion.section
                      key="role"
                      className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.26)] sm:p-7"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.34, ease: 'easeOut' }}
                    >
                      <video
                        className="absolute inset-0 h-full w-full object-cover opacity-35"
                        src={roleSelectionVideoSrc}
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload="metadata"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050b12_0%,rgba(5,11,18,0.86)_38%,rgba(5,11,18,0.58)_100%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-transparent to-[#050b12]/30" />

                      <div className="relative max-w-3xl">
                        <div className="max-w-3xl">
                          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                            Choose Your Path
                          </p>
                          <h2 className="mt-4 font-heading text-4xl font-bold text-light sm:text-5xl">
                            {formState.name.trim() || 'Candidate'}, select your role.
                          </h2>
                          <p className="mt-4 text-base leading-7 text-light/65">
                            Choose the role that best matches how you want to contribute. More interview paths will open soon.
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-9 grid gap-5 lg:grid-cols-3">
                        {roleCards.map((role, index) => {
                          const isSelected = formState.role === role.title;

                          return (
                            <motion.button
                              key={role.title}
                              type="button"
                              className={`group min-h-[320px] rounded-[1.75rem] border p-6 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                                isSelected
                                  ? 'border-secondary bg-secondary/15 shadow-[0_24px_70px_rgba(60,183,171,0.16)]'
                                  : 'border-white/10 bg-white/[0.06]'
                              } ${role.disabled ? 'cursor-not-allowed opacity-55' : 'hover:border-secondary/60 hover:bg-white/[0.09]'}`}
                              onClick={() => selectRole(role)}
                              whileHover={role.disabled ? undefined : { y: -8, scale: 1.015 }}
                              whileTap={role.disabled ? undefined : { scale: 0.99 }}
                              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                              aria-pressed={isSelected}
                              disabled={role.disabled}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <span className="text-6xl font-black leading-none text-white/10">
                                  0{index + 1}
                                </span>
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                                    role.disabled
                                      ? 'bg-white/10 text-light/55'
                                      : 'bg-secondary text-dark'
                                  }`}
                                >
                                  {role.status}
                                </span>
                              </div>
                              <h3 className="mt-10 font-heading text-3xl font-bold text-light">
                                {role.title}
                              </h3>
                              <p className="mt-4 text-sm leading-6 text-light/65">
                                {role.summary}
                              </p>
                              <div className="mt-8 flex flex-wrap gap-2">
                                {role.traits.map((trait) => (
                                  <span
                                    key={trait}
                                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-light/65"
                                  >
                                    {trait}
                                  </span>
                                ))}
                              </div>
                              {isSelected && (
                                <motion.p
                                  className="mt-8 text-sm font-semibold text-secondary"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  Selected
                                </motion.p>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      {errors.role && <p className="mt-5 text-sm text-secondary">{errors.role}</p>}

                      <div className="relative mt-7 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          className="btn-primary min-w-[190px] bg-secondary text-dark hover:brightness-100"
                          onClick={handleRoleNext}
                        >
                          Continue to questions
                        </button>
                        <button
                          type="button"
                          className="btn-secondary-on-dark rounded-full px-6 py-3 text-sm font-semibold"
                          onClick={() => goToStep(0)}
                        >
                          Back
                        </button>
                      </div>

                    </motion.section>
                  )}

                  {wizardStep === 2 && (
                    <motion.section
                      key="questions"
                      className="mx-auto w-full max-w-5xl"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.34, ease: 'easeOut' }}
                    >
                      <AnimatePresence mode="wait">
                        {!questionsIntroComplete ? (
                          <motion.div
                            key="questions-intro"
                            className="h-screen w-full bg-[#050b12]"
                            initial={{ opacity: 0, scale: 1.015 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.025 }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                          />
                        ) : (
                          <motion.div
                            key="questions-form"
                            className="mx-auto w-full max-w-4xl"
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.34, ease: 'easeOut' }}
                          >
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                              {selectedRole?.title || 'Prompt Engineer'} Checkpoint
                            </p>
                            <h2 className="mt-4 font-heading text-4xl font-bold text-light sm:text-5xl">
                              Three quick questions
                            </h2>
                            <p className="mt-4 text-base leading-7 text-light/65">
                              Keep it concise and human. Show how you think, not just what you know. AI-generated answers may be flagged. AI will score your responses — 70/100 qualifies for the next step.
                            </p>

                            <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
                              {promptEngineerQuestions.map((question, index) => {
                                const key = `q${index + 1}`;

                                return (
                                  <label
                                    key={key}
                                    className="block rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5"
                                  >
                                    <span className="block text-sm font-semibold leading-6 text-light">
                                      {question}
                                    </span>
                                    <textarea
                                      name={key}
                                      value={formState.answers[key]}
                                      onChange={updateAnswer(key)}
                                      rows={4}
                                      className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-[#07111b]/90 px-4 py-3 text-light placeholder:text-light/35 transition focus:border-secondary/70 focus:outline-none focus:ring-4 focus:ring-secondary/10"
                                      placeholder="Type your answer here"
                                    />
                                    {errors[key] && <p className="mt-2 text-sm text-secondary">{errors[key]}</p>}
                                  </label>
                                );
                              })}

                              {formMessage && (
                                <p className="rounded-2xl border border-secondary/25 bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
                                  {formMessage}
                                </p>
                              )}

                              {submissionStage && (
                                <p className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-light/75">
                                  {submissionStage}
                                </p>
                              )}

                              <div className="flex flex-wrap items-center gap-3 pt-2">
                                <button
                                  type="submit"
                                  className="btn-primary bg-secondary text-dark hover:brightness-100 disabled:cursor-wait disabled:opacity-70"
                                  disabled={submitting}
                                >
                                  {submitting ? 'Assessing...' : 'Submit Application'}
                                </button>
                                <button
                                  type="button"
                                  className="btn-secondary-on-dark rounded-full px-6 py-3 text-sm font-semibold"
                                  onClick={() => goToStep(1)}
                                  disabled={submitting}
                                >
                                  Back
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.section>
                  )}

                  {wizardStep === 3 && (
                    <motion.section
                      key="thanks"
                      className="mx-auto w-full max-w-3xl text-center"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.36, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-secondary/35 bg-secondary/15 text-4xl font-bold text-secondary"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      >
                        OK
                      </motion.div>
                      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                        Application Received
                      </p>
                      <h2 className="mt-4 font-heading text-4xl font-bold text-light sm:text-6xl">
                        Thanks, {formState.name.trim() || 'candidate'}.
                      </h2>
                      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-light/70">
                        Your Prompt Engineer profile has been received. It will undergo human review, and we will contact you via email for further details if selected.
                      </p>
                      {assessmentResult && (
                        <div className="mx-auto mt-8 max-w-xl rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 text-left">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                                AI assessment score
                              </p>
                              <p className="mt-2 text-sm text-light/60">
                                Passing score: {assessmentResult.passingScore}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-heading text-5xl font-bold text-light">
                                {assessmentResult.score}
                              </p>
                              <p className={`text-sm font-semibold ${
                                assessmentResult.passed ? 'text-secondary' : 'text-light/60'
                              }`}>
                                {assessmentResult.passed ? 'Passed' : 'Below benchmark'}
                              </p>
                            </div>
                          </div>
                          <p className="mt-4 text-sm leading-6 text-light/70">
                            {assessmentResult.summary}
                          </p>
                        </div>
                      )}
                      <div className="mt-9 flex justify-center">
                        <button
                          type="button"
                          className="btn-primary bg-secondary text-dark hover:brightness-100"
                          onClick={closeFlow}
                        >
                          Return to Careers
                        </button>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Careers;
