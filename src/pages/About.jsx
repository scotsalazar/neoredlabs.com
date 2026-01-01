import React from 'react';
import Layout from '../components/Layout.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GradientSection from '../components/GradientSection.jsx';

/**
 * About page detailing NeoLabs' story, expertise, and mission.
 *
 * Content fades into view using Framer Motion for a subtle and
 * professional feel. Visitors are invited to connect with the team
 * through a clear call-to-action at the end of the page.
 */
const About = () => (
  <Layout
    title="About NeoLabs | AI, Automation, and API-First Integrations"
    description="NeoLabs helps SMEs and enterprises modernize with custom apps, AI-driven automation, and real-time API-first integrations. Based in the Philippines."
  >
    <GradientSection
      as={motion.section}
      className="py-20"
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
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 md:max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Connect to the team</p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Let's build what's next together</h2>
              <p className="text-base md:text-lg leading-relaxed text-light/80">
                Share your challenges, your roadmap, or the spark of an idea. We'll pair you with strategists and engineers who
                can translate ambition into delivery—whether that's AI automation, product launches, or tightening the systems
                you already rely on.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-primary/90"
            >
              Talk to the team
            </Link>
          </div>
        </div>
      </div>
    </GradientSection>
  </Layout>
);

export default About;
