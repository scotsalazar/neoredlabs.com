import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/new-hero-banner.webp';

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
    className="relative flex min-h-[72vh] items-center justify-center overflow-hidden"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.img
      src={heroImage}
      alt="NeoLabs platform overview"
      width={1536}
      height={1024}
      fetchpriority="high"
      loading="eager"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      variants={itemVariants}
    />

    <motion.div
      className="absolute inset-0 bg-black/70"
      aria-hidden="true"
      variants={itemVariants}
    />

    <motion.div className="relative z-10 section-container text-center" variants={itemVariants}>
      <motion.h1
        className="text-4xl font-heading font-bold text-light md:text-6xl"
        variants={itemVariants}
      >
        Power your Business with Modern and Agentic Solutions
      </motion.h1>

      <motion.p
        className="mx-auto mt-4 max-w-2xl text-base text-light/80 md:text-lg"
        variants={itemVariants}
      >
        Accelerate growth with tailored AI agents, automation, and modern solutions built for today&apos;s businesses.
      </motion.p>

      <motion.div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" variants={itemVariants}>
        <Link to="/contact#schedule-call" className="btn-primary" aria-label="Schedule a Call">
          Schedule a Call
        </Link>
        <Link to="/business" className="btn-primary bg-secondary text-dark" aria-label="Latest Updates">
          Latest Updates
        </Link>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default Hero;
