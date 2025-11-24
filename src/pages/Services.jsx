import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import ServicesList from '../components/ServicesList.jsx';
import GradientSection from '../components/GradientSection.jsx';

const Services = () => {
  return (
    <Layout title="NeoRedLabs – Services" description="Discover our services from AI-driven automation to personalised apps.">
      <GradientSection>
        <div className="section-container relative flex flex-col-reverse gap-12 pb-20 pt-28 md:flex-row md:items-center">
          {/* Left column */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
              Services
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Aligned delivery across strategy, design, and engineering.
            </h1>
            <p className="text-lg text-light/70 leading-relaxed">
              From AI-powered automation to personalised apps, every engagement mirrors the cinematic, high-contrast experience of our brand. We pair elegant visuals with resilient architecture, so your teams gain products that look and feel cohesive from onboarding to daily operations.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-light/80">
              <span className="rounded-full bg-primary/15 px-4 py-2 text-primary">AI Agents & Automation</span>
              <span className="rounded-full bg-secondary/15 px-4 py-2 text-secondary">Integrations</span>
              <span className="rounded-full bg-white/5 px-4 py-2 text-light">Product Delivery</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="btn-primary"
              >
                Schedule a Demo
              </Link>
              <span className="text-sm text-light/60">Fast responses, collaborative roadmaps.</span>
            </div>
          </div>
          {/* Right column: hero visuals */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" aria-hidden />
            <div className="absolute -bottom-10 -right-6 h-48 w-48 rounded-full bg-secondary/25 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-6 shadow-2xl">
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-light/70">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Delivery in motion
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Live</span>
              </div>
              <div className="mt-6 grid gap-4 rounded-2xl bg-gradient-to-r from-white/5 via-white/0 to-white/5 p-6 shadow-inner">
                <p className="text-xl font-semibold text-light">A cohesive service experience</p>
                <p className="text-sm text-light/70 leading-relaxed">
                  Interfaces, automations, and data flows are designed with the same structure and spacing that you see across this site—reducing change management while elevating confidence in every release.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-light/70">
                    <p className="text-base font-semibold text-light">Experience-first</p>
                    Dark UI foundations, tight typography, and clear affordances for every workflow.
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-light/70">
                    <p className="text-base font-semibold text-light">Reliable delivery</p>
                    Build-measure-learn loops with transparent metrics and progress snapshots.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GradientSection>
      <GradientSection className="py-20">
        <div className="section-container space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Offerings</p>
              <h2 className="text-3xl md:text-4xl font-bold text-light">What we deliver</h2>
              <p className="mt-2 max-w-2xl text-light/70">
                Every card below maps to the same design principles you will see in production—elevated contrast, focused content, and intuitive hierarchy.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-light transition hover:border-primary/60 hover:text-primary"
            >
              Talk to our team
              <span aria-hidden>→</span>
            </Link>
          </div>
          <ServicesList />
        </div>
      </GradientSection>
    </Layout>
  );
};

export default Services;
