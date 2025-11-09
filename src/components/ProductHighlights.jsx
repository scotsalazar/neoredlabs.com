import React from 'react';
import { motion } from 'framer-motion';
import perfImage from '../assets/images/revenue-dashboard.png';
import monitorImage from '../assets/images/monitoring-dashboard.png';
import workflowImage from '../assets/images/workflow.png';
import integrationImage from '../assets/images/integration.png';

/**
 * Displays NeoLabs solutions as vertically stacked spotlight cards with
 * neon-accented imagery and animated hover states.
 */
const products = [
  {
    title: 'Performance Dashboard',
    description:
      'Visualise key metrics and revenue streams with interactive dashboards.',
    image: perfImage
  },
  {
    title: 'Monitoring & Tracking',
    description:
      'Track systems and operations in real time with intuitive monitoring.',
    image: monitorImage
  },
  {
    title: 'Automation Workflow',
    description:
      'Streamline your processes with powerful automation workflows.',
    image: workflowImage
  },
  {
    title: 'API-First Integration',
    description:
      'We build your own API base that connects your systems in real time—enabling secure, efficient integrations, event-driven automations, and seamless data flow across ERP, e-commerce, finance, logistics, and analytics.',
    image: integrationImage
  }
];

const SolutionCard = ({ title, description, image }) => (
  <motion.article
    className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#05090f] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-emerald-400/60"
    whileHover={{ y: -6, boxShadow: '0 22px 45px rgba(0, 230, 147, 0.18)' }}
    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
  >
    <div className="relative mb-6 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-emerald-500/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-emerald-500/15 via-transparent to-transparent p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 mix-blend-screen" aria-hidden="true" />
        <img
          src={image}
          alt={title}
          className="relative z-10 mx-auto h-40 w-full max-w-[260px] object-contain"
        />
      </div>
    </div>
    <div className="text-center text-light">
      <h3 className="font-heading text-2xl font-semibold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-4 text-base text-white/70">
        {description}
      </p>
    </div>
  </motion.article>
);

const ProductHighlights = () => (
  <section className="bg-dark py-20" id="solutions">
    <div className="section-container">
      <h2 className="section-title text-center">Our Solutions</h2>
      <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-10">
        {products.map((product) => (
          <SolutionCard key={product.title} {...product} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductHighlights;