import React from 'react';
import { motion } from 'framer-motion';

/**
 * Displays NeoLabs solutions as horizontally aligned spotlight cards with
 * neon-accented imagery and animated hover states.
 */
const products = [
  {
    title: 'Intelligent Operations',
    description:
      'Track, monitor, and automate your systems seamlessly—boosting efficiency through real-time visibility and intelligent workflows.',
    image: '/assets/images/solutions/intelligent-operations.png'
  },
  {
    title: 'Insightful Dashboards',
    description:
      'Visualize KPIs, unify business data, and uncover actionable insights with powerful, interactive dashboards.',
    image: '/assets/images/solutions/insightful-dashboards.png'
  },
  {
    title: 'Smart Customer Systems',
    description:
      'Empower your CRM with AI-driven tools to personalize engagement, automate retention, and deepen customer relationships.',
    image: '/assets/images/solutions/smart-customer-systems.png'
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
      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <SolutionCard key={product.title} {...product} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductHighlights;
