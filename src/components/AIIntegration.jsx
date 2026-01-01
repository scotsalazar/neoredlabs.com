import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="section-container grid gap-12 md:grid-cols-2 md:items-center">
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="section-title">Launch Your Business to the World with Your First Scalable System.</h2>
        <p className="text-[15.5pt] leading-relaxed text-light/80">
          We build AI-run business systems that eliminate manual operations and human bottlenecks. Stop scaling headcount. Start scaling systems.
        </p>
        <ul className="mt-4 space-y-3 list-inside list-disc text-base text-light/80">
          <li>Autonomous AI agents replacing repetitive and decision-heavy workflows</li>
          <li>Custom-built apps designed to fit your exact business workflows, ensuring alignment with your teams and daily operations</li>
          <li>Real-time monitoring and optimisation to expose inefficiencies instantly</li>
        </ul>
      </motion.div>
      <motion.div variants={itemVariants} className="flex justify-center">
        <img
          src={workflowImage}
          alt="Automation workflow diagram"
          className="w-full max-w-md rounded-xl shadow-xl"
        />
      </motion.div>
    </div>
  </GradientSection>
);

export default AIIntegration;
