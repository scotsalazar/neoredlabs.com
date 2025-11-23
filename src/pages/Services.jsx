import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ServicesList from '../components/ServicesList';

const Services = () => (
  <Layout
    title="Powerful Services for the Modern Business"
    description="From AI-powered automation to personalised apps — we help companies operate smarter, faster, and more efficiently."
  >
    <section className="relative bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-600 py-20 px-6 text-center text-white overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Powerful Services for the Modern Business</h1>
        <p className="text-lg mb-8">
          From AI-powered automation to personalised apps — we help companies operate smarter, faster, and more efficiently.
        </p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 rounded-md bg-white text-indigo-700 font-semibold shadow hover:bg-gray-100 transition-colors"
        >
          Schedule a Demo
        </Link>
      </div>
    </section>
    <section className="py-12 px-6">
      <ServicesList />
    </section>
  </Layout>
);

export default Services;
