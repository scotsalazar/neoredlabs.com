import React from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import ProductHighlights from '../components/ProductHighlights.jsx';
import AIIntegration from '../components/AIIntegration.jsx';
import ClientCarousel from '../components/ClientCarousel.jsx';
import Reviews from '../components/Reviews.jsx';
import { Link } from 'react-router-dom';
import careersImage from '../assets/images/product-erp.png';
import contactImage from '../assets/images/product-chat.png';

/**
 * Home page assembling the primary sections of the site.  The layout
 * component provides common metadata and chrome.  Additional
 * recruitment and contact call‑outs close the page.
 */
const Home = () => (
  <Layout
    title="Neo Labs | Home"
    description="Neo Labs delivers modern AI innovation, SaaS engineering and intelligent products."
  >
    <Hero />
    <ProductHighlights />
    <AIIntegration />
    <ClientCarousel />
    <Reviews />
    {/* Hiring callout */}
    <section className="bg-white py-16">
      <div className="section-container grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
        <div>
          <h2 className="section-title">We're Hiring</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Join our growing team and help shape the next generation of intelligent applications. Explore our open roles and be part of an AI‑first culture.
          </p>
          <Link to="/careers" className="btn-primary mt-8">
            Explore Careers
          </Link>
        </div>
        <img
          src={careersImage}
          alt="Careers illustration"
          className="mx-auto w-full max-w-md rounded-lg shadow-lg"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
    {/* Contact callout */}
    <section className="bg-light py-16">
      <div className="section-container grid gap-10 md:grid-cols-[0.8fr,1.2fr] md:items-center">
        <img
          src={contactImage}
          alt="Contact concept"
          className="mx-auto w-full max-w-md rounded-lg shadow-lg"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Whether you're interested in working with us, partnering on a project, or learning more about our solutions, we'd love to hear from you. Reach out and let's shape the future together.
          </p>
          <Link to="/contact" className="btn-primary mt-8">Contact Us</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;