import React from 'react';
import Layout from '../components/Layout.jsx';

/**
 * Simple privacy policy outlining data practices for NeoLabs.
 */
const PrivacyPolicy = () => (
  <Layout title="Privacy Policy | NeoLabs" description="Learn how NeoLabs handles your personal data and respects your privacy.">
    <section className="bg-dark py-20">
      <div className="section-container space-y-10">
        <div className="text-center">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="mt-4 text-lg text-light/80">
            We only collect the information required to respond to your enquiries, provide support, and improve our services.
            We never sell your data or share it with third parties without your consent.
          </p>
        </div>
        <div className="space-y-6 rounded-2xl bg-white/5 p-8 text-left text-light/80 shadow-lg">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-light">Information we collect</h2>
            <p>
              When you contact us, we may store your name, email address, phone number, company, and the details of your request. This helps us tailor our response and maintain a record of our collaboration.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-light">How we use your information</h2>
            <p>
              We use your details to communicate with you, provide proposals or support, and share updates you have opted into. Access to this information is limited to NeoLabs team members who need it for their work.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-light">Your choices</h2>
            <p>
              You can request that we update or delete your information at any time by emailing <a className="text-primary hover:text-primary/80" href="mailto:info@neolabs.com">info@neolabs.com</a>. We will honor your request unless we are legally required to retain certain records.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default PrivacyPolicy;
