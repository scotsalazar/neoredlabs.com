import React from 'react';
import Layout from '../components/Layout.jsx';

/**
 * Contact page providing multiple ways to get in touch with the NeoLabs
 * team.  Email addresses use the new domain and clearly label
 * contact types.
 */
const Contact = () => (
  <Layout
    title="Contact Us | NeoLabs"
    description="Reach out to NeoLabs for partnerships, media enquiries or general information."
  >
    <section className="bg-dark py-20">
      <div className="section-container max-w-2xl text-center">
        <h1 className="section-title">Contact Us</h1>
        <p className="mt-6 text-lg leading-relaxed text-light/80">
          We'd love to hear from you.  Whether you're interested in our
          services, have a media enquiry, or would like to partner with us,
          please get in touch using the details below.
        </p>
        <div className="mt-10 space-y-4 text-left">
          <p>
            <span className="font-medium text-light">General:</span>{' '}
            <a href="mailto:info@neolabs.com" className="text-primary hover:underline">
              info@neolabs.com
            </a>
          </p>
          <p>
            <span className="font-medium text-light">Media:</span>{' '}
            <a href="mailto:media@neolabs.com" className="text-primary hover:underline">
              media@neolabs.com
            </a>
          </p>
          <p>
            <span className="font-medium text-light">Partnerships:</span>{' '}
            <a href="mailto:partnerships@neolabs.com" className="text-primary hover:underline">
              partnerships@neolabs.com
            </a>
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;