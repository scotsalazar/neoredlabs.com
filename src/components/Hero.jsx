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
  <section className="relative isolate overflow-hidden bg-surface-dark text-light">
    <img
      src="/assets/images/generated/hero-operations-command.png"
      alt=""
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(var(--color-surface-dark)/0.96)_0%,rgb(var(--color-surface-dark)/0.82)_38%,rgb(var(--color-surface-dark)/0.2)_100%)]" aria-hidden />
    <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-surface-dark/80 to-transparent" aria-hidden />

    <div className="section-container min-h-[calc(100svh-5rem)] py-14 lg:flex lg:items-center lg:py-20">
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
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-light sm:text-6xl lg:text-[5.35rem]">
            Modern apps shaped around your operations.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-light/75">
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

        <div className="grid gap-4 border-t border-light/15 pt-6 sm:grid-cols-3">
          {strengths.map((item) => (
            <div key={item.label} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-light">{item.label}</p>
              <p className="text-sm leading-6 text-light/70">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
