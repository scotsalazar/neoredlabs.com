import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/dashboard-beautiful.png';
import { Link } from 'react-router-dom';

/**
 * Hero section introducing the NeoLabs platform.
 *
 * Utilises Framer Motion to gently fade the background illustration and
 * headline into view.  A dark overlay sits atop the background to
 * improve contrast.  The headline emphasises the company mission and
 * calls the user to action.
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
    className="relative flex h-[80vh] items-center justify-center overflow-hidden"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Background illustration */}
    <motion.img
      src={heroImage}
      alt="App dashboard preview"
      loading="eager"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      variants={itemVariants}
    />
    {/* Dark overlay to improve contrast */}
    <motion.div
      className="absolute inset-0 bg-black/70"
      aria-hidden="true"
      variants={itemVariants}
    />
    {/* Headline and call to action */}
    <motion.div
      className="relative z-10 section-container text-center"
      variants={itemVariants}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-heading font-bold text-light"
        variants={itemVariants}
      >
        Powering Your Business with Intelligent Automation
      </motion.h1>
      <motion.p
        className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-light/80"
        variants={itemVariants}
      >
        Automate, optimise and scale with AI‑driven SaaS solutions designed
        for modern enterprises.
      </motion.p>
      <motion.div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" variants={itemVariants}>
        <Link to="/contact" className="btn-primary" aria-label="Get Started">
          Get Started
        </Link>
        <Link to="/about" className="btn-primary bg-secondary text-dark" aria-label="Learn More">
          Learn More
        </Link>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default Hero;