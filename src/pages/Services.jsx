import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import ServicesList from '../components/ServicesList.jsx';
import GradientSection from '../components/GradientSection.jsx';

const Services = () => {
  return (
    <Layout title="NeoRedLabs – Services" description="Discover our services from AI-driven automation to personalised apps.">
      <GradientSection className="py-20 md:py-24">
        <div className="section-container space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Offerings</p>
              <h2 className="text-3xl md:text-4xl font-bold text-light">What we deliver</h2>
              <p className="mt-2 max-w-2xl text-light/70">
                Four service pillars built to drive growth, efficiency, and stakeholder confidence—delivered with the same clarity and precision you see across this site.
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
