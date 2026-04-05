import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const strengths = [
  {
    label: 'Built around your workflow',
    description: 'The system fits your users, approvals, and day-to-day operations.',
  },
  {
    label: 'Connected to your stack',
    description: 'We work with the tools you already use instead of forcing a reset.',
  },
  {
    label: 'Visibility that stays live',
    description: 'Dashboards and alerts keep teams closer to what is happening.',
  }
];

const Hero = () => (
  <section className="bg-hero-surface overflow-hidden">
    <div className="section-container grid gap-12 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="max-w-2xl space-y-8"
      >
        <div className="space-y-5">
          <span className="eyebrow">NeoLabs</span>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">
            Personalized modern apps
          </p>
          <h1 className="text-ink-strong font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.35rem]">
            Modern apps built fast and shaped around your operations.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-copy">
            We help businesses build modern applications, connect existing tools, and apply AI-powered automation for clearer, more efficient operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link to="/contact" className="btn-primary">
            Schedule a consultation
          </Link>
          <Link to="/pricing" className="btn-secondary">
            View pricing
          </Link>
        </div>

        <div className="grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
          {strengths.map((item) => (
            <div key={item.label} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-strong">{item.label}</p>
              <p className="text-sm leading-6 text-copy">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        className="relative"
      >
        <div className="surface-panel overflow-hidden bg-[#e9e1d6]">
          <img
            src="/illustrations/hero-revenue-growth.svg"
            alt="Revenue growth dashboard showing rising revenue, stronger profit margins, and improved efficiency"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bg-ink-float absolute bottom-6 left-6 rounded-[1.5rem] border border-light/10 px-5 py-4 text-light shadow-[0_18px_50px_rgb(var(--color-dark)/0.26)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-light/65">Increase revenue</p>
          <p className="mt-2 text-lg font-semibold">Upgrade your business with modern tech and unlock new growth channels.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
