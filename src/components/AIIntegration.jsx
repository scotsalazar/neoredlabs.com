import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import workflowImage from '../assets/images/workflow.png';
import GradientSection from './GradientSection.jsx';

/**
 * Section highlighting NeoLabs' intelligent automation capabilities.
 *
 * Presents a concise overview of how AI agents coordinate complex
 * workflows, alongside an illustrative workflow diagram.  Elements
 * animate into view as the user scrolls.
 */
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
    <div className="section-container relative grid gap-12 md:grid-cols-2 md:items-center">
      <motion.div variants={itemVariants} className="max-w-xl space-y-6">
        <span className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-emerald-200">
          AUTOMATION • INTEGRATION • AI
        </span>
        <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Build systems that run your business — not more headcount.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          We build custom apps, automations, and AI agents that remove repetitive work, connect your tools, and
          give you real-time control.
        </p>
        <ul className="space-y-3 text-sm leading-relaxed text-white/75 sm:text-base">
          {highlights.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 111.414-1.42l2.493 2.494 6.493-6.494a1 1 0 011.415 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <p>
                <span className="font-semibold text-white">{item.label}</span>
                <span> — {item.benefit}</span>
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
      <motion.div variants={itemVariants} className="relative flex justify-center">
        <div
          className="pointer-events-none absolute inset-8 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-400/20 via-emerald-100/5 to-transparent blur-2xl"
          aria-hidden
        />
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl">
          <img
            src={workflowImage}
            alt="Automation workflow diagram"
            className="w-full rounded-2xl"
          />
        </div>
      </motion.div>
    </div>
  </GradientSection>
);

export default AIIntegration;
