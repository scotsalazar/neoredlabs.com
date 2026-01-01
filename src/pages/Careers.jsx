import React, { useMemo, useRef, useState } from 'react';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';

/**
 * Simplified careers page that focuses on the most important
 * responsibilities for each role.  It introduces the company
 * succinctly, uses a badge style header to signal that hiring is
 * active and offers clear calls‑to‑action for applicants.
 */
const jobOpenings = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    bullets: [
      'Build and scale modern applications',
      'Utilise critical thinking and problem‑solving skills',
      'Deploy features fast with end‑to‑end ownership',
      'Bonus: Familiarity with LLMs & AI model training'
    ]
  },
  {
    slug: 'marketing-specialist',
    title: 'Marketing Specialist',
    bullets: [
      'Develop modern, data‑driven marketing campaigns',
      'Collaborate with sales team for strategy alignment',
      'Build the company’s digital presence and brand',
      'Explore and co-develop AI-powered marketing tools to enhance campaign efficiency and engagement'
    ]
  },
  {
    slug: 'sales-executive',
    title: 'Sales Executive',
    bullets: [
      'Handle leads and close deals effectively',
      'Manage and grow client relationships',
      'Commission‑based rewards for successful contracts',
      'Identify and pursue sales opportunities for software applications and AI-driven products'
    ]
  }
];

const roleQuestions = {
  'Software Engineer': [
    'Describe the most complex feature or system you built recently. What modern tools, frameworks, and architectures did you use, and why did you choose them over alternatives?',
    'Walk me through a time you were stuck on a technical issue for hours or days. How did you break down the problem, and what exact steps did you take to solve it?',
    'Share a project where you had to take full ownership from start to finish. What obstacles did you face, and how did you push through them?',
    'Explain how you design a system or feature to make it scalable, maintainable, and easy for other developers to work on.'
  ],
  'Sales Executive': [
    'Describe the most complex sales cycle you managed end-to-end. How did you tailor your approach for each stakeholder, and what tools supported your process?',
    'Share an example of turning a skeptical prospect into a champion. What objections did you hear, and how did you address them?',
    'Explain how you build and maintain a healthy pipeline. What metrics do you track weekly, and how do you prioritize deals?',
    'Tell us about collaborating with marketing or product to win a deal. What did you learn, and how did you apply it to future opportunities?'
  ],
  'Marketing Specialist': [
    'Describe a multi-channel campaign you led. How did you pick the channels, and how did you adapt messaging for each audience?',
    'Walk us through your audience research process. What data sources do you rely on, and how do you translate findings into campaign decisions?',
    'Share an example of how you improved conversion or engagement mid-campaign. What experiments did you run and what did you learn?',
    'How do you report performance to stakeholders? Which metrics matter most to you and why?'
  ]
};

const philippinesLocations = [
  'Manila',
  'Quezon City',
  'Makati',
  'Pasig',
  'Pasay',
  'Taguig',
  'Mandaluyong',
  'Marikina',
  'San Juan',
  'Caloocan',
  'Malabon',
  'Navotas',
  'Valenzuela',
  'Parañaque',
  'Las Piñas',
  'Muntinlupa',
  'Antipolo',
  'Angeles City',
  'San Fernando',
  'San Jose del Monte',
  'Malolos',
  'Meycauayan',
  'Baguio',
  'Santa Rosa',
  'Calamba',
  'Biñan',
  'Cabuyao',
  'San Pedro',
  'Batangas City',
  'Lipa',
  'Lucena',
  'Tagaytay',
  'Legazpi',
  'Naga',
  'Sorsogon City',
  'Olongapo',
  'Tarlac City',
  'Cabanatuan',
  'Dagupan',
  'Laoag',
  'Urdaneta',
  'Cebu City',
  'Iloilo City',
  'Bacolod',
  'Cagayan de Oro',
  'Davao City',
  'General Santos',
  'Zamboanga City'
];

const Careers = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    location: '',
    age: '',
    gender: '',
    role: '',
    answers: {
      q1: '',
      q2: '',
      q3: '',
      q4: ''
    },
    cvFile: null
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');
  const overlayRef = useRef(null);

  const currentQuestions = useMemo(() => {
    if (!formState.role) return [];
    return roleQuestions[formState.role] ?? [];
  }, [formState.role]);

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      location: '',
      age: '',
      gender: '',
      role: '',
      answers: { q1: '', q2: '', q3: '', q4: '' },
      cvFile: null
    });
    setErrors({});
    setFormMessage('');
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;

    if (field === 'role') {
      setFormState((prev) => ({
        ...prev,
        role: value,
        answers: { q1: '', q2: '', q3: '', q4: '' }
      }));
      overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (field === 'age') {
      const numericValue = value.replace(/\D/g, '').slice(0, 2);
      setFormState((prev) => ({ ...prev, age: numericValue }));
      return;
    }

    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (key) => (event) => {
    const value = event.target.value;
    setFormState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [key]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formState.name.trim()) newErrors.name = 'Full name is required.';
    if (!formState.email.trim()) newErrors.email = 'Email is required.';
    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formState.location.trim()) {
      newErrors.location = 'Location is required.';
    } else if (
      !philippinesLocations.some(
        (item) => item.toLowerCase() === formState.location.trim().toLowerCase()
      )
    ) {
      newErrors.location = 'Please pick a location from the list.';
    }

    const ageValue = formState.age.trim();
    if (!ageValue) {
      newErrors.age = 'Age is required.';
    } else if (!/^\d{1,2}$/.test(ageValue)) {
      newErrors.age = 'Age must be one or two digits.';
    } else if (parseInt(ageValue, 10) === 0) {
      newErrors.age = 'Age must be greater than zero.';
    }

    if (!formState.gender.trim()) newErrors.gender = 'Gender selection is required.';

    if (!formState.role) newErrors.role = 'Select a role to continue.';

    currentQuestions.forEach((_, index) => {
      const key = `q${index + 1}`;
      if (!formState.answers[key]?.trim()) {
        newErrors[key] = 'This question is required.';
      }
    });

    if (!formState.cvFile) newErrors.cvFile = 'Please upload your CV.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setFormMessage('');

    const webhookUrl = 'https://shezzo.app.n8n.cloud/webhook/cv-upload';
    const formData = new FormData();

    formData.append('name', formState.name.trim());
    formData.append('email', formState.email.trim());
    formData.append('location', formState.location.trim());
    formData.append('age', formState.age.trim());
    formData.append('gender', formState.gender.trim());
    formData.append('role', formState.role);
    formData.append('answers[q1]', formState.answers.q1);
    formData.append('answers[q2]', formState.answers.q2);
    formData.append('answers[q3]', formState.answers.q3);
    formData.append('answers[q4]', formState.answers.q4);

    if (formState.cvFile) {
      formData.append('cv', formState.cvFile);
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Unable to submit right now.');
      }

      setBannerMessage('Application sent successfully! We will be in touch soon.');
      setShowApplicationForm(false);
      resetForm();
    } catch (error) {
      setFormMessage(
        'There was a problem sending your application. Please try again or use the Contact page.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      title="Careers | NeoLabs"
      description="Explore open roles at NeoLabs and join a modern AI startup shaping the next generation of intelligent apps."
    >
      <GradientSection className="py-20">
        <div className="section-container text-center">
          <span className="mb-6 inline-block rounded-full bg-secondary px-5 py-2 text-xs font-medium text-dark uppercase tracking-wider">
            Now Hiring
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-light">
            Join a modern AI startup shaping the next generation of intelligent apps.
          </h1>
          <p className="mt-4 text-base text-light/80">
            Share a few details to begin a short, AI-powered conversation tailored to your role.
          </p>
          {bannerMessage && (
            <div className="mt-6 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm font-semibold text-light">
              {bannerMessage}
            </div>
          )}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {jobOpenings.map((job) => (
              <article
                key={job.title}
                id={job.slug || job.title.toLowerCase().replace(/\s+/g, '-')}
                className="flex flex-col rounded-xl bg-white/5 p-8 shadow-lg"
              >
                <h2 className="text-2xl font-heading font-semibold text-light">
                  {job.title}
                </h2>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">
                  Key Responsibilities
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-left text-base text-light/80">
                  {job.bullets.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </GradientSection>

      {showApplicationForm && (
        <div
          className="fixed inset-0 z-50 flex min-h-screen items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur"
          ref={overlayRef}
        >
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-dark/95 shadow-2xl">
            <form
              className="flex flex-col gap-6 p-8 text-left"
              onSubmit={handleSubmit}
              role="dialog"
              aria-modal="true"
            >
              <header className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary">Career Application pre-step</p>
                  <h2 className="text-2xl font-heading font-semibold text-light">Tell us about you</h2>
                  <p className="text-sm text-light/70">
                    Your responses will help us assess your fit and ensure we connect you with the best role for your experience.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-white/5 p-2 text-light/80 transition hover:bg-white/10 hover:text-secondary"
                  aria-label="Close application form"
                  onClick={() => {
                    setShowApplicationForm(false);
                    resetForm();
                  }}
                >
                  ✕
                </button>
              </header>

              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-light/80">
                    <span className="block font-semibold text-light">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange('name')}
                      placeholder="Alex Johnson"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light placeholder:text-light/40 focus:border-secondary focus:outline-none"
                    />
                    {errors.name && <p className="text-xs text-secondary">{errors.name}</p>}
                  </label>
                  <label className="space-y-2 text-sm text-light/80">
                    <span className="block font-semibold text-light">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange('email')}
                      placeholder="alex@company.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light placeholder:text-light/40 focus:border-secondary focus:outline-none"
                    />
                    {errors.email && <p className="text-xs text-secondary">{errors.email}</p>}
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-light/80">
                    <span className="block font-semibold text-light">Location</span>
                    <input
                      type="text"
                      name="location"
                      value={formState.location}
                      onChange={handleInputChange('location')}
                      list="philippines-locations"
                      placeholder="Start typing a city..."
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light placeholder:text-light/40 focus:border-secondary focus:outline-none"
                    />
                    <datalist id="philippines-locations">
                      {philippinesLocations.map((location) => (
                        <option key={location} value={location} />
                      ))}
                    </datalist>
                    <span className="block text-xs text-light/60">Autocomplete supports cities across the Philippines.</span>
                    {errors.location && <p className="text-xs text-secondary">{errors.location}</p>}
                  </label>

                  <label className="space-y-2 text-sm text-light/80">
                    <span className="block font-semibold text-light">Age</span>
                    <input
                      type="text"
                      name="age"
                      value={formState.age}
                      onChange={handleInputChange('age')}
                      inputMode="numeric"
                      pattern="\d{1,2}"
                      maxLength={2}
                      placeholder="e.g., 24"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light placeholder:text-light/40 focus:border-secondary focus:outline-none"
                    />
                    <span className="block text-xs text-light/60">Numbers only, up to two digits.</span>
                    {errors.age && <p className="text-xs text-secondary">{errors.age}</p>}
                  </label>
                </div>

                <label className="space-y-2 text-sm text-light/80">
                  <span className="block font-semibold text-light">Gender</span>
                  <select
                    name="gender"
                    value={formState.gender}
                    onChange={handleInputChange('gender')}
                    className="w-full rounded-lg border border-white/10 bg-dark/80 px-4 py-3 text-light focus:border-secondary focus:outline-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" disabled hidden>
                      Select gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="text-xs text-secondary">{errors.gender}</p>}
                </label>

                <label className="space-y-2 text-sm text-light/80">
                  <span className="block font-semibold text-light">Role</span>
                  <select
                    name="role"
                    value={formState.role}
                    onChange={handleInputChange('role')}
                    className="w-full rounded-lg border border-white/10 bg-dark/80 px-4 py-3 text-light focus:border-secondary focus:outline-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" disabled hidden>
                      Select a role
                    </option>
                    <option>Software Engineer</option>
                    <option>Sales Executive</option>
                    <option>Marketing Specialist</option>
                  </select>
                  {errors.role && <p className="text-xs text-secondary">{errors.role}</p>}
                </label>

                {currentQuestions.length > 0 && (
                  <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Role-based questions</h3>
                    {currentQuestions.map((question, index) => {
                      const key = `q${index + 1}`;
                      return (
                        <label key={key} className="space-y-2 text-sm text-light/80">
                          <span className="block font-semibold text-light">{question}</span>
                          <textarea
                            name={key}
                            value={formState.answers[key]}
                            onChange={handleAnswerChange(key)}
                            rows={3}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light placeholder:text-light/40 focus:border-secondary focus:outline-none"
                            placeholder="Your answer"
                          />
                          {errors[key] && <p className="text-xs text-secondary">{errors[key]}</p>}
                        </label>
                      );
                    })}
                  </div>
                )}

                <label className="space-y-2 text-sm text-light/80">
                  <span className="block font-semibold text-light">Upload CV</span>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      setFormState((prev) => ({ ...prev, cvFile: file ?? null }));
                    }}
                    className="w-full cursor-pointer rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-3 text-light file:mr-4 file:rounded file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-semibold file:text-dark hover:border-secondary"
                  />
                  <span className="block text-xs text-light/60">PDF or Word documents are welcome.</span>
                  {errors.cvFile && <p className="text-xs text-secondary">{errors.cvFile}</p>}
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="btn-primary" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send application'}
                  </button>
                  <button
                    type="button"
                    className="btn-primary bg-white/10 text-light hover:bg-white/20"
                    onClick={() => {
                      setShowApplicationForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <span className="text-xs text-light/60">We will connect this flow to the AI backend soon.</span>
                {formMessage && (
                  <p className="text-sm font-semibold text-primary">{formMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Careers;