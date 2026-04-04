import React from 'react';
import Layout from '../components/Layout.jsx';
import ContactForm from '../components/ContactForm';

const Contact = (): JSX.Element => (
  <Layout
    title="Contact Us | NeoLabs"
    description="Contact NeoLabs to discuss modern app development, automation, integrations, and operational software needs."
  >
    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="space-y-5">
            <p className="eyebrow">Contact Us</p>
            <h1 className="section-title">Tell us what needs to run better.</h1>
            <p className="lede">
              Share the workflow, system, or operational problem you want to improve and we will help shape the right next step.
            </p>

            <div className="grid gap-4 pt-2">
              <article className="rounded-[1.5rem] border border-slate-200 bg-[#fbfaf7] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Best fit</p>
                <p className="mt-3 text-base leading-7 text-slate-600">Teams that need personalized systems, fast delivery, and close operational support.</p>
              </article>
              <article className="rounded-[1.5rem] border border-slate-200 bg-[#fbfaf7] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Helpful details</p>
                <p className="mt-3 text-base leading-7 text-slate-600">Share your package fit, workflow complexity, integrations, timeline, and support needs.</p>
              </article>
              <article className="rounded-[1.5rem] border border-slate-200 bg-[#fbfaf7] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Direct contact</p>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  <a className="font-semibold text-slate-900 hover:text-primary" href="mailto:info@neolabs.com">info@neolabs.com</a>
                  <span className="mx-2 text-slate-300">|</span>
                  <span>+63 906-437-0420</span>
                </p>
              </article>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-panel overflow-hidden">
              <img
                src="/illustrations/service-support.svg"
                alt="NeoLabs coordinating client delivery and consultations"
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
