import React from 'react';
import Layout from '../components/Layout.jsx';

/**
 * Terms of Service outlining acceptable use and service expectations.
 */
const TermsOfService = () => (
  <Layout title="Terms of Service | NeoLabs" description="Understand the terms that govern your use of NeoLabs products and services.">
    <section className="bg-dark py-20">
      <div className="section-container space-y-10">
        <div className="text-center">
          <h1 className="section-title">Terms of Service</h1>
          <p className="mt-4 text-lg text-light/80">
            By engaging with NeoLabs, you agree to the following terms designed to keep our collaboration transparent and productive.
          </p>
        </div>
        <div className="space-y-6 rounded-2xl bg-white/5 p-8 text-left text-light/80 shadow-lg">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-light">Use of our services</h2>
            <p>
              Our solutions are provided for lawful business purposes. You agree not to misuse or reverse engineer our products or intellectual property.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-light">Project commitments</h2>
            <p>
              We will communicate project scopes, timelines, and deliverables clearly. You agree to provide timely feedback and necessary access to complete engagements.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-light">Liability</h2>
            <p>
              NeoLabs is committed to high-quality work. To the extent permitted by law, our liability is limited to the fees paid for the services in question.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default TermsOfService;
