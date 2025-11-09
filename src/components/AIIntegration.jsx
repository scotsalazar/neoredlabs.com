import React from 'react';
import { motion } from 'framer-motion';
import workflowImage from '../assets/images/workflow.png';

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

const AIIntegration = () => (
  <motion.section
    className="bg-dark py-20"
    id="automation"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="section-container grid gap-12 md:grid-cols-2 md:items-center">
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="section-title">Intelligent Automation</h2>
        <p className="text-lg leading-relaxed text-light/80">
          We integrate large language models, automation agents and predictive
          analytics into bespoke applications.  Accelerate workflows, gain
          insights and deliver smarter experiences through our AI‑first
          approach.
        </p>
        <ul className="mt-4 space-y-3 text-base text-light/80 list-disc list-inside">
          <li>Agent orchestration for complex multi‑step tasks</li>
          <li>Low‑code workflow builder for rapid iteration</li>
          <li>Real‑time monitoring and optimisation</li>
        </ul>
      </motion.div>
      <motion.div variants={itemVariants} className="flex justify-center">
        <img
          src={workflowImage}
          alt="Automation workflow diagram"
          className="max-w-md w-full rounded-xl shadow-xl"
        />
      </motion.div>
    </div>
  </motion.section>
);

export default AIIntegration;