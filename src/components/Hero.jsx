import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="relative overflow-hidden bg-slate-950 text-white">
    <img
      src="/illustrations/hero-ph-software.svg"
      alt="NeoLabs building modern business software for Philippine companies"
      className="absolute inset-0 h-full w-full object-cover opacity-80"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,16,27,0.88)_0%,rgba(9,16,27,0.72)_42%,rgba(9,16,27,0.32)_100%)]" />

    <div className="section-container relative flex min-h-[calc(100svh-6rem)] items-center py-16 lg:min-h-[760px]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl space-y-7"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
          NeoLabs
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
          Built in the Philippines
        </span>

        <div className="space-y-5">
          <p className="font-display text-6xl font-semibold leading-none tracking-tight text-white sm:text-7xl">
            NeoLabs
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Modern app development for businesses that need better systems, not more friction.
          </h1>
        </div>

        <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          We design and deliver premium business apps, automation, AI-enabled workflows, and operational systems for SMEs, scaling teams, and enterprise environments.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link to="/contact" className="btn-primary">
            Schedule a consultation
          </Link>
          <Link to="/pricing" className="btn-secondary border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            View pricing guide
          </Link>
        </div>

        <div className="grid gap-4 pt-3 text-sm text-slate-300 sm:grid-cols-3">
          <div className="border-l border-white/15 pl-4">
            <p className="text-white">Company-owned delivery</p>
            <p className="mt-1 text-slate-400">Practical systems, executive clarity, accountable execution.</p>
          </div>
          <div className="border-l border-white/15 pl-4">
            <p className="text-white">Fair premium pricing</p>
            <p className="mt-1 text-slate-400">Structured packages with room to scale by complexity.</p>
          </div>
          <div className="border-l border-white/15 pl-4">
            <p className="text-white">Philippine-based partner</p>
            <p className="mt-1 text-slate-400">Built for local operating realities and modern growth.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
