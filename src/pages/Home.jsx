import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import AIIntegration from '../components/AIIntegration.jsx';
import ClientCarousel from '../components/ClientCarousel.jsx';
import Reviews from '../components/Reviews.jsx';
import GradientSection from '../components/GradientSection.jsx';
import { Link } from 'react-router-dom';

const initialDemoState = {
  name: '',
  email: '',
  company: '',
  goal: '',
};

const latestUpdates = [
  {
    id: 'update-win-warehouse-network',
    isoDate: '2026-01-12',
    date: 'Jan 12, 2026',
    tag: 'WIN',
    title: 'Successfully launched GPF PO Agent v1.01 and active.',
    detailsLink: '/contact',
  },
  {
    id: 'update-release-approvals',
    isoDate: '2026-01-04',
    date: 'Jan 4, 2026',
    tag: 'RELEASE',
    title: 'Shipped approval routing with SLA alerts and escalation handoffs.',
    detailsLink: '/contact',
  },
  {
    id: 'update-client-finops',
    isoDate: '2025-12-18',
    date: 'Dec 18, 2025',
    tag: 'CLIENT',
    title: 'Onboarded a national distributor to real-time finance and ops reporting.',
    detailsLink: '/contact',
  },
];

const proofTiles = [
  { label: 'Tokens processed', value: '12,480,711+' },
  { label: 'Avg time saved', value: '62%' },
  { label: 'Service Uptime', value: '99.9%' },
];

/**
 * Home page assembling the primary sections of the site.
 *
 * Combines the hero, solution highlights, automation overview,
 * clients and testimonials.  A compact updates module and demo
 * booking modal conclude the page.
 */
const Home = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState(initialDemoState);
  const [demoErrors, setDemoErrors] = useState({});
  const [demoMessage, setDemoMessage] = useState('');
  const [demoSubmitting, setDemoSubmitting] = useState(false);

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

  return (
    <Layout
      title="NeoLabs | Home"
      description="NeoLabs delivers intelligent automation, SaaS engineering and AI‑powered products."
    >
      <Hero />
      <AIIntegration />
      <ClientCarousel />
      <Reviews />
      {/* Latest updates */}
      <GradientSection className="py-20">
        <div className="section-container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
                Latest Updates
              </h2>
              <p className="mt-3 text-sm text-light/70 sm:text-base">Wins, releases, and rollouts.</p>
            </div>
            <Link
              to="/contact"
              className="text-sm font-semibold text-secondary transition hover:text-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              View all
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr,0.7fr] lg:items-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm sm:p-6">
              <ul aria-label="Latest updates feed" className="divide-y divide-white/10">
                {latestUpdates.map((item) => (
                  <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-light/60">
                      <time dateTime={item.isoDate}>{item.date}</time>
                      <span className="rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 font-semibold text-secondary">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-light sm:text-xl">{item.title}</h3>
                    <Link
                      to={item.detailsLink}
                      className="mt-3 inline-flex text-sm font-semibold text-secondary transition hover:text-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                      aria-label={`View details for: ${item.title}`}
                    >
                      Details →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {proofTiles.map((tile) => (
                <article
                  key={tile.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-md"
                  aria-label={`${tile.label}: ${tile.value}`}
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-light/60">{tile.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-light">{tile.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-sm text-light/80">Want to see this live?</p>
            <button
              type="button"
              className="btn-primary px-4 py-2 text-sm"
              onClick={() => setShowDemoModal(true)}
            >
              Book a demo
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
