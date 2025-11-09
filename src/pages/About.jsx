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
              <strong className="text-light">Proven Leadership:</strong> With over <strong>30 years</strong> of success in
              business development and operations, we guide organizations in building intelligent, scalable systems
              powered by AI and innovation.
            </li>
            <li>
              <strong className="text-light">Expert Engineering:</strong> Our team of seasoned engineers—adept in the latest
              AI models, automation frameworks, and modern technologies—delivers end-to-end digital solutions that drive
              efficiency, precision, and sustainable growth.
            </li>
            <li>
              <strong className="text-light">Strategic Consultation:</strong> Our consultation-driven approach ensures every
              solution is built around your business DNA. We work closely with you to design personalized, AI-enabled
              systems that streamline operations, connect data, and future-proof your growth.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-light/80">
            Empowering Filipino entrepreneurs and SMEs to evolve into future-ready businesses through personalized apps,
            AI automation, and expert consultation—bridging the gap between traditional operations and intelligent,
            data-driven growth.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-light/80">
            To shape a new generation of Filipino businesses that compete globally through digital empowerment, AI
            integration, and continuous innovation.
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
