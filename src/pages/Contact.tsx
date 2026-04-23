import React from 'react';
import Layout from '../components/Layout.jsx';
import ContactForm from '../components/ContactForm';

const Contact = (): JSX.Element => (
  <Layout
    title="Contact Us | NeoLabs"
    description="Contact NeoLabs to discuss workflow bottlenecks, automation, integrations, and better operational visibility."
  >
    <section className="bg-page">
      <div className="section-container py-20">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="space-y-5">
            <p className="eyebrow">Contact Us</p>
            <h1 className="section-title">Tell us what needs to run better.</h1>
            <p className="lede">
              Share the bottlenecks, tools, or manual steps you want to improve and we will help shape the right next step.
            </p>

            <div className="grid gap-4 pt-2">
              <article className="bg-panel-muted rounded-[1.5rem] border border-line p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Best fit</p>
                <p className="mt-3 text-base leading-7 text-copy">Teams that need less manual work, smoother operations, and a build that fits their current setup.</p>
              </article>
              <article className="bg-panel-muted rounded-[1.5rem] border border-line p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Expected outcomes</p>
                <p className="mt-3 text-base leading-7 text-copy">We usually help clients improve visibility, connect tools, remove repetitive steps, and tighten control.</p>
              </article>
              <article className="bg-panel-muted rounded-[1.5rem] border border-line p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Helpful details</p>
                <p className="mt-3 text-base leading-7 text-copy">Share your workflow complexity, integrations, reporting needs, timeline, and any must-have alerts.</p>
              </article>
              <article className="bg-panel-muted rounded-[1.5rem] border border-line p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Direct contact</p>
                <p className="mt-3 text-base leading-7 text-copy">
                  <a className="font-semibold text-ink-strong hover:text-primary" href="mailto:info@neolabs.com">info@neolabs.com</a>
                  <span className="mx-2 text-line">|</span>
                  <span>+63 906-437-0420</span>
                </p>
              </article>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-panel aspect-[16/10] overflow-hidden">
              <img
                src="/assets/images/generated/contact-discovery-call.png"
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
