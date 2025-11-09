import React from 'react';
import Layout from '../components/Layout.jsx';
import { motion } from 'framer-motion';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapat from '../assets/images/logo-kiapat.png';

/**
 * About page detailing NeoLabs' mission, vision and leadership.
 *
 * Content fades into view using Framer Motion for a subtle and
 * professional feel.  A client showcase at the end links to three
 * highlighted partners.
 */
const mission =
  'To empower businesses through intelligent software and AI‑driven automation, delivering solutions that scale with ambition.';
const vision =
  'To be the leading partner for modern enterprises seeking to innovate, transform and thrive in a data‑driven future.';

const leadership = [
  {
    name: 'Scott Salazar',
    role: 'Founder & CEO',
    bio: 'Software engineer and entrepreneur passionate about AI, product design and business growth.'
  }
];

const About = () => (
  <Layout
    title="About Us | NeoLabs"
    description="Learn about NeoLabs, our mission, vision, leadership and the clients we serve."
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
            NeoLabs is a modern technology company based in the Philippines,
            dedicated to innovation and digital transformation.  We combine
            engineering excellence with business insight to deliver
            intelligent products and meaningful experiences.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-light/80">{mission}</p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Our Vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-light/80">{vision}</p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-light">Leadership</h2>
          <div className="mt-6 space-y-6">
            {leadership.map((leader) => (
              <div key={leader.name}>
                <p className="text-lg font-medium text-light">
                  {leader.name} — {leader.role}
                </p>
                <p className="mt-2 text-light/80">{leader.bio}</p>
              </div>
            ))}
          </div>
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