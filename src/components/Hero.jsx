import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const strengths = [
  {
    label: 'Personalized builds',
    description: 'Modern apps shaped around your users, approvals, and workflow.',
  },
  {
    label: 'Fast shipping',
    description: 'Clear scope, quick iteration, and steady delivery from the start.',
  },
  {
    label: '24/7 support',
    description: 'Responsive alignment when the work is live and operations keep moving.',
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
            We build modern internal apps, automation, and integrations for teams that need faster delivery, clearer scope, and support that stays close to the work.
          </p>
          <p className="text-sm leading-7 text-copy">
            Based in Metro Manila, working with teams that need a practical partner and a modern product standard.
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
        <div className="surface-panel bg-ink-surface overflow-hidden">
          <img
            src="/illustrations/hero-ph-software.svg"
            alt="NeoLabs planning and shipping modern operational software"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bg-ink-float absolute bottom-6 left-6 rounded-[1.5rem] border border-light/10 px-5 py-4 text-light shadow-[0_18px_50px_rgb(var(--color-dark)/0.26)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-light/65">How we work</p>
          <p className="mt-2 text-lg font-semibold">Clear scope. Fast build. Close support.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
