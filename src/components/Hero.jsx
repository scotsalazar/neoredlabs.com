import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/hero.png';

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      ease: 'easeOut'
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
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
    {/* Background image with eager loading for above-the-fold content */}
    <motion.img
      src={heroImage}
      alt="Abstract technology background"
      loading="eager"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      variants={itemVariants}
    />
    <motion.div
      className="absolute inset-0 bg-black/60"
      aria-hidden="true"
      variants={itemVariants}
    />
    <motion.div
      className="relative z-10 section-container text-center text-white"
      variants={itemVariants}
    >
      <motion.h1
        className="text-3xl font-bold leading-tight md:text-5xl"
        variants={itemVariants}
      >
        NEO&nbsp;Redlabs: Innovating the Future
      </motion.h1>
      <motion.p
        className="mx-auto mt-4 max-w-2xl text-base md:text-lg"
        variants={itemVariants}
      >
        Crafting cutting-edge technologies and digital solutions for a changing world.
      </motion.p>
      <motion.a
        href="/careers"
        className="btn-primary mt-8"
        aria-label="Join Our Team"
        variants={itemVariants}
      >
        Join Our Team
      </motion.a>
    </motion.div>
  </motion.section>
);

export default Hero;
