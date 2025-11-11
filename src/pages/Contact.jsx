import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout.jsx';
import ContactForm from '../components/ContactForm';

const Contact = () => (
  <Layout
    title="Contact Us | NeoLabs"
    description="Partner with NeoLabs for enterprise software, AI, and automation initiatives."
  >
    <section className="bg-dark py-24">
      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-12 text-center"
        >
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">NeoLabs Partnerships</p>
            <h1 className="text-4xl font-semibold text-light sm:text-5xl">Contact our Team</h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-light/80">
              Whether you're exploring digital transformation, AI automation, or custom app solutions, our NeoLabs team is ready
              to collaborate. Share your details and our consultants will reach out to discuss how we can empower your business.
            </p>
          </div>

          <ContactForm />

          <div className="space-y-4 text-left text-light/70">
            <h2 className="text-lg font-semibold text-light">Need something else?</h2>
            <p>
              Prefer a direct introduction? Reach us at{' '}
              <a className="text-primary hover:underline" href="mailto:info@neoredlabs.com">
                info@neoredlabs.com
              </a>{' '}
              and a NeoLabs consultant will respond within one business day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Contact;
