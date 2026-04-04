import React from 'react';
import Layout from '../components/Layout.jsx';
import ContactForm from '../components/ContactForm';

const Contact = (): JSX.Element => (
  <Layout
    title="Contact Us | NeoLabs"
    description="Contact NeoLabs to discuss your app development, automation, integration, or enterprise delivery requirements."
  >
    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="space-y-5">
            <p className="eyebrow">Contact Us</p>
            <h1 className="section-title">Tell us what you need to build, improve, or modernize.</h1>
            <p className="lede">
              Whether you already know your package fit or you need help shaping the right rollout, NeoLabs can help map the next step clearly.
            </p>

            <div className="grid gap-4 pt-2">
              <article className="surface-panel p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Best for</p>
                <p className="mt-3 text-base leading-7 text-slate-600">SMEs, scaling businesses, enterprise teams, and government-oriented delivery needs.</p>
              </article>
              <article className="surface-panel p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Useful details to share</p>
                <p className="mt-3 text-base leading-7 text-slate-600">Preferred package, workflow complexity, integrations, timeline, users, and deployment expectations.</p>
              </article>
              <article className="surface-panel p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Direct contact</p>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  <a className="font-semibold text-slate-900 hover:text-primary" href="mailto:info@neolabs.com">info@neolabs.com</a>
                  <span className="mx-2 text-slate-300">•</span>
                  <span>+63 906-437-0420</span>
                </p>
              </article>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-panel overflow-hidden">
              <img
                src="/illustrations/service-support.svg"
                alt="NeoLabs coordinating client delivery and software consultations"
                className="h-full w-full object-cover"
              />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
