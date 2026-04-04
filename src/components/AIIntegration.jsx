import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GradientSection from './GradientSection.jsx';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: 'easeOut' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const highlights = [
  {
    label: 'Custom workflows',
    benefit: 'built around how your team actually works'
  },
  {
    label: 'Automations + AI',
    benefit: 'reduce manual work and errors'
  },
  {
    label: 'Integrations',
    benefit: 'Gmail, Sheets, Shopify, Slack, CRM, accounting'
  },
  {
    label: 'Dashboards + alerts',
    benefit: 'spot issues before they become fires'
  }
];

const deliveryNotes = [
  {
    title: 'Scope',
    detail: 'Workflows mapped to your actual tools, approvals, and operating rhythm.'
  },
  {
    title: 'Visibility',
    detail: 'Dashboards and alerts that surface issues before they become expensive.'
  },
  {
    title: 'Cadence',
    detail: 'Clear scope, weekly progress, and measurable wins from launch onward.'
  }
];

const AIIntegration = () => (
  <GradientSection
    as={motion.section}
    className="py-20"
    id="automation"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div
      className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/55 via-black/25 to-transparent md:w-2/3"
      aria-hidden
    />

    <div className="section-container relative">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
        <motion.div variants={itemVariants} className="max-w-2xl space-y-6">
          <span className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-emerald-200">
            AUTOMATION • INTEGRATION • AI
          </span>

          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build systems that run your business, not more headcount.
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            We build custom apps, automations, and AI agents that remove repetitive work, connect your tools, and
            give you real-time control.
          </p>

          <ul className="grid gap-3 text-sm leading-relaxed text-white/75 sm:grid-cols-2 sm:text-base">
            {highlights.map((item) => (
              <li key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 111.414-1.42l2.493 2.494 6.493-6.494a1 1 0 011.415 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="mt-3">
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="block pt-1">{item.benefit}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary" aria-label="Book a call with NeoLabs">
                Book a call
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition hover:border-emerald-300/50 hover:bg-emerald-400/10"
                aria-label="See NeoLabs services"
              >
                See services
              </Link>
            </div>
            <p className="mt-3 text-sm text-white/55">Clear scope • Weekly progress</p>
          </div>
        </motion.div>

        <motion.aside
          variants={itemVariants}
          className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200/80">Delivery model</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Operational systems built around your team.</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {deliveryNotes.map((note) => (
              <article key={note.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-white/60">{note.title}</p>
                <p className="mt-2 text-lg font-semibold text-white">{note.detail}</p>
              </article>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  </GradientSection>
);

export default AIIntegration;
