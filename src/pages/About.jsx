import React from 'react';
import Layout from '../components/Layout.jsx';
import { motion } from 'framer-motion';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapat from '../assets/images/logo-kiapat.png';

/**
 * About page detailing NeoLabs' story, expertise and client partners.
 *
 * Content fades into view using Framer Motion for a subtle and
 * professional feel. A client showcase at the end links to three
 * highlighted partners.
 */
const About = () => (
  <Layout
    title="About NeoLabs | AI, Automation, and API-First Integrations"
    description="NeoLabs helps SMEs and enterprises modernize with custom apps, AI-driven automation, and real-time API-first integrations. Based in the Philippines."
  >
    <motion.section
      className="bg-dark py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-container space-y-16">
        <div>
          <h1 className="section-title">Who We Are</h1>
          <p className="mt-6 text-lg leading-relaxed text-light/80">
            NeoLabs is a technology company based in the Philippines that fuses
            engineering excellence with business insight. We build intelligent,
            automated software that accelerates growth and digital transformation.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Expertise</h2>
          <ul className="mt-6 space-y-4 text-lg leading-relaxed text-light/80">
            <li>
              <strong className="text-light">Seasoned Leadership:</strong> Partners with <strong>30+ years</strong> in
              successful business building and operations. We guide organizations toward AI-powered, scalable systems.
            </li>
            <li>
              <strong className="text-light">Elite Engineering Team:</strong> <strong>20+ years</strong> combined experience
              delivering end-to-end solutions. We design and deploy <strong>custom apps and digital ecosystems</strong> that
              improve speed, accuracy, and outcomes.
            </li>
            <li>
              <strong className="text-light">Gateway to the Future:</strong> From SMEs to enterprises, we help you adopt AI,
              automation, and data-driven workflows to future-proof your operations.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-light/80">
            Empower Filipino entrepreneurs and growing SMEs with <strong>personalized apps</strong> and <strong>AI-driven
            automation</strong>—moving from manual, paper-based work to agile, data-first operations.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-light/80">
            Be the <strong>most trusted technology partner</strong> for modern businesses seeking to innovate, transform,
            and lead in a digital-first world.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">API-First Integration</h2>
          <p className="mt-4 text-lg leading-relaxed text-light/80">
            We build your <strong>own API base</strong> that connects your systems in <strong>real time</strong>—enabling secure,
            efficient integrations, event-driven automations, and seamless data flow across ERP, e-commerce, finance,
            logistics, and analytics.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Clients</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-12">
            <a href="#" className="block h-20">
              <img
                src={logo1pls}
                alt="1PLS Logistics Solutions logo"
                className="h-full w-auto object-contain filter grayscale opacity-60 transition hover:grayscale-0 hover:opacity-100"
              />
            </a>
            <a href="#" className="block h-20">
              <img
                src={logoGPFresh}
                alt="GPFresh Inc. logo"
                className="h-full w-auto object-contain filter grayscale opacity-60 transition hover:grayscale-0 hover:opacity-100"
              />
            </a>
            <a href="#" className="block h-20">
              <img
                src={logoKiapat}
                alt="Kiapat App logo"
                className="h-full w-auto object-contain filter grayscale opacity-60 transition hover:grayscale-0 hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  </Layout>
);

export default About;
