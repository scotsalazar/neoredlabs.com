import React from 'react';
import Layout from '../components/Layout.jsx';
import ServicesList from '../components/ServicesList.jsx';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <Layout title="NeoRedLabs – Services" description="Discover our services from AI-driven automation to personalised apps.">
      <section className="bg-black text-gray-100">
        <div className="pt-20 pb-28 container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left column */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              <span className="block text-emerald-400">Powerful Services</span>
              <span className="block text-gray-100">for the Modern Business</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              From AI-powered automation to personalised apps — we help companies operate smarter, faster, and more efficiently.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 text-gray-900 font-semibold bg-emerald-400 rounded-md shadow-lg hover:bg-emerald-500 transition-colors"
            >
              Schedule a Demo
            </Link>
          </div>
          {/* Right column: hero image */}
          <div className="w-full md:w-1/2">
            <picture>
              <source srcSet="/assets/services/hero-desktop.webp" media="(min-width: 768px)" />
              <img
                src="/assets/services/hero-mobile.webp"
                alt="NeoRedLabs services hero illustration"
                className="w-full h-auto rounded-xl shadow-lg shadow-emerald-500/10"
              />
            </picture>
          </div>
        </div>
      </section>
      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-12">
            Our Services
          </h2>
          <ServicesList />
        </div>
      </section>
    </Layout>
  );
};

export default Services;
