import React from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import ProductHighlights from '../components/ProductHighlights.jsx';
import AIIntegration from '../components/AIIntegration.jsx';
import ClientCarousel from '../components/ClientCarousel.jsx';
import Reviews from '../components/Reviews.jsx';
import { Link } from 'react-router-dom';
import careersImage from '../assets/images/revenue-dashboard.png';
import contactImage from '../assets/images/monitoring-dashboard.png';

/**
 * Home page assembling the primary sections of the site.
 *
 * Combines the hero, solution highlights, automation overview,
 * clients and testimonials.  Additional call‑outs for hiring and
 * contact opportunities conclude the page.
 */
const Home = () => (
  <Layout
    title="NeoLabs | Home"
    description="NeoLabs delivers intelligent automation, SaaS engineering and AI‑powered products."
  >
    <Hero />
    <ProductHighlights />
    <AIIntegration />
    <ClientCarousel />
    <Reviews />
    {/* Hiring callout */}
    <section className="bg-dark py-20">
      <div className="section-container grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
        <div>
          <h2 className="section-title">We're Hiring</h2>
          <p className="mt-6 text-lg leading-relaxed text-light/80">
            Join our growing team and help shape the next generation of
            intelligent applications.  Explore our open roles and be part
            of an AI‑first culture.
          </p>
          <Link to="/careers" className="btn-primary mt-8">
            Explore Careers
          </Link>
        </div>
        <img
          src={careersImage}
          alt="Careers illustration"
          className="mx-auto w-full max-w-md rounded-xl shadow-xl"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
    {/* Contact callout */}
    <section className="bg-dark py-20">
      <div className="section-container grid gap-10 md:grid-cols-[0.8fr,1.2fr] md:items-center">
        <img
          src={contactImage}
          alt="Contact concept"
          className="mx-auto w-full max-w-md rounded-xl shadow-xl"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h2 className="section-title">Schedule a Demo</h2>
          <p className="mt-6 text-lg leading-relaxed text-light/80">
            Ready to see NeoLabs in action? Reserve time with our team for
            a tailored walkthrough of the platform, align on your goals,
            and co-design the path to launch.
          </p>
          <Link to="/contact#schedule-call" className="btn-primary mt-8">
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;
