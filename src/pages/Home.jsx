import React, { useMemo, useState } from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import ProductHighlights from '../components/ProductHighlights.jsx';
import AIIntegration from '../components/AIIntegration.jsx';
import WhyChooseNeoLabs from '../components/WhyChooseNeoLabs.jsx';
import ClientCarousel from '../components/ClientCarousel.jsx';
import Reviews from '../components/Reviews.jsx';
import GradientSection from '../components/GradientSection.jsx';
import { Link } from 'react-router-dom';
import careersImage from '../assets/images/revenue-dashboard-new.png';
import contactImage from '../assets/images/monitoring-dashboard.png';
import useJobOpenings from '../hooks/useJobOpenings.js';

const initialDemoState = {
  name: '',
  email: '',
  company: '',
  goal: '',
};

/**
 * Home page assembling the primary sections of the site.
 *
 * Combines the hero, solution highlights, automation overview,
 * clients and testimonials.  Additional call‑outs for hiring and
 * contact opportunities conclude the page.
 */
const Home = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState(initialDemoState);
  const [demoErrors, setDemoErrors] = useState({});
  const [demoMessage, setDemoMessage] = useState('');
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const { jobs, loading, error } = useJobOpenings();

  const handleDemoChange = (field) => (event) => {
    setDemoForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validateDemo = () => {
    const newErrors = {};
    if (!demoForm.name.trim()) newErrors.name = 'Name is required.';
    if (!demoForm.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demoForm.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!demoForm.company.trim()) newErrors.company = 'Company is required.';
    if (!demoForm.goal.trim()) newErrors.goal = 'Share a brief goal for the demo.';
    setDemoErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDemoSubmit = async (event) => {
    event.preventDefault();
    setDemoMessage('');
    if (!validateDemo()) return;

    setDemoSubmitting(true);

    try {
      const response = await fetch('https://shezzo.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: demoForm.name,
          email: demoForm.email,
          company: demoForm.company,
          goal: demoForm.goal,
          source: 'homepage-demo',
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook responded with an error');
      }

      setDemoMessage('Thanks! We will contact you shortly to schedule your walkthrough.');
      setDemoForm(initialDemoState);
    } catch (error) {
      console.error('Demo request failed:', error);
      setDemoMessage('We could not send your request right now. Please try again in a moment.');
    } finally {
      setDemoSubmitting(false);
    }
  };

  const closeDemoModal = () => {
    setShowDemoModal(false);
    setDemoErrors({});
    setDemoMessage('');
  };

  const jobLinks = useMemo(
    () =>
      jobs.map((job) => ({
        id: job.id,
        title: job.title,
        applyUrl: job.applyUrl || `/careers#${job.id}`,
        meta: job.team && job.location ? `${job.team} · ${job.location}` : job.team || job.location,
      })),
    [jobs],
  );

  return (
    <Layout
      title="NeoLabs | Home"
      description="NeoLabs delivers intelligent automation, SaaS engineering and AI‑powered products."
    >
      <Hero />
      <ProductHighlights />
      <AIIntegration />
      <WhyChooseNeoLabs />
      <ClientCarousel />
      <Reviews />
      {/* Hiring callout */}
      <GradientSection className="py-20">
        <div className="section-container grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
          <div>
            <h2 className="section-title">We're Hiring</h2>
            <p className="mt-6 text-lg leading-relaxed text-light/80">
              Join our growing team and help shape the next generation of
              intelligent applications.  Explore our open roles and be part
              of an AI‑first culture.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {jobLinks.map((job) => (
                <Link
                  key={job.id}
                  to={job.applyUrl}
                  className="flex items-center gap-2 rounded-full border border-secondary/40 bg-white/5 px-4 py-2 text-sm font-semibold text-light transition hover:border-secondary hover:bg-secondary/10"
                >
                  <span>{job.title}</span>
                  {job.meta && <span className="text-xs font-normal text-light/70">{job.meta}</span>}
                </Link>
              ))}
              {loading && (
                <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-light/60">
                  Loading openings…
                </span>
              )}
              {error && (
                <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                  {error}
                </span>
              )}
            </div>
            <Link to="/careers" className="btn-primary mt-8">
              Explore Careers
            </Link>
          </div>
          <div>
            <img
              src={careersImage}
              alt="Careers illustration"
              className="mx-auto w-full max-w-md rounded-xl shadow-xl"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-3 text-sm text-light/60">Work with modern tools, guided by agent-assisted workflows.</p>
          </div>
        </div>
      </GradientSection>
      {/* Contact callout */}
      <GradientSection className="py-20">
        <div className="section-container grid gap-10 md:grid-cols-[0.8fr,1.2fr] md:items-center">
          <div>
            <img
              src={contactImage}
              alt="Illustrative map graphic"
              className="mx-auto w-full max-w-md rounded-xl shadow-xl"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-3 text-sm text-light/60">
              Book a demo anywhere in the Philippines—available through video conference or Zoom.
            </p>
          </div>
          <div>
            <h2 className="section-title">Schedule a Demo</h2>
            <p className="mt-6 text-lg leading-relaxed text-light/80">
              Ready to see NeoLabs in action? Reserve time with our team for a tailored walkthrough of the platform,
              align on your goals, and co-design the path to launch.
            </p>
            <button type="button" className="btn-primary mt-8" onClick={() => setShowDemoModal(true)}>
              Schedule a Demo
            </button>
          </div>
        </div>
      </GradientSection>

      {showDemoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Schedule a demo form"
        >
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-dark p-8 shadow-2xl">
            <button
              type="button"
              className="absolute right-4 top-4 text-2xl font-bold text-light/60 hover:text-light"
              onClick={closeDemoModal}
              aria-label="Close demo form"
            >
              ×
            </button>
            <h3 className="text-2xl font-heading font-semibold text-light">Share a few details</h3>
            <p className="mt-2 text-sm text-light/70">
              We’ll align your goals with the right specialist and send a confirmation email with scheduling options.
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleDemoSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-light">
                  Name
                  <input
                    type="text"
                    value={demoForm.name}
                    onChange={handleDemoChange('name')}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-base text-light focus:border-secondary focus:outline-none"
                    required
                  />
                  {demoErrors.name && <span className="text-xs font-medium text-red-300">{demoErrors.name}</span>}
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-light">
                  Email
                  <input
                    type="email"
                    value={demoForm.email}
                    onChange={handleDemoChange('email')}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-base text-light focus:border-secondary focus:outline-none"
                    required
                  />
                  {demoErrors.email && <span className="text-xs font-medium text-red-300">{demoErrors.email}</span>}
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-semibold text-light">
                Company
                <input
                  type="text"
                  value={demoForm.company}
                  onChange={handleDemoChange('company')}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-base text-light focus:border-secondary focus:outline-none"
                  required
                />
                {demoErrors.company && <span className="text-xs font-medium text-red-300">{demoErrors.company}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-light">
                Goal for this demo
                <textarea
                  rows="4"
                  value={demoForm.goal}
                  onChange={handleDemoChange('goal')}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-base text-light focus:border-secondary focus:outline-none"
                  placeholder="What do you want to learn or evaluate?"
                  required
                />
                {demoErrors.goal && <span className="text-xs font-medium text-red-300">{demoErrors.goal}</span>}
              </label>
              {demoMessage && (
                <div className="rounded-lg border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm font-semibold text-light">
                  {demoMessage}
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeDemoModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={demoSubmitting}>
                  {demoSubmitting ? 'Submitting…' : 'Submit demo request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
