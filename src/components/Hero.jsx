import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/hero.png';
import { Link } from 'react-router-dom';

/**
 * Hero section introducing the company.  Uses Framer Motion to
 * animate elements into view as the user scrolls, and overlays
 * headlines atop a subtle technology-themed background.
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

const Hero = () => (
  <motion.section
    className="relative flex h-[70vh] items-center justify-center overflow-hidden"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Background image */}
    <motion.img
      src={heroImage}
      alt="Abstract technology background"
      loading="eager"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      variants={itemVariants}
    />
    {/* Dark overlay to improve contrast */}
    <motion.div
      className="absolute inset-0 bg-black/60"
      aria-hidden="true"
      variants={itemVariants}
    />
    {/* Headline content */}
    <motion.div
      className="relative z-10 section-container text-center text-white"
      variants={itemVariants}
    >
      <motion.h1
        className="text-3xl font-bold leading-tight md:text-5xl"
        variants={itemVariants}
      >
        Neo&nbsp;Labs: Innovate Your Business.
      </motion.h1>
      <motion.p
        className="mx-auto mt-4 max-w-2xl text-base md:text-lg"
        variants={itemVariants}
      >
        Tailor‑fit AI agents for modern workflows.
      </motion.p>
      <motion.div className="mt-8" variants={itemVariants}>
        <Link to="/contact" className="btn-primary" aria-label="Get Started">
          Get Started
        </Link>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default Hero;