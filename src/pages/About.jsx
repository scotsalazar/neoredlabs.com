import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const commitments = [
  'Professional delivery built around the reality of operations, not just the appearance of innovation.',
  'Premium execution standards with fair package framing so scope and value are easier to understand.',
  'A Philippine-based team that understands local business context while building for modern software expectations.',
];

const About = () => (
  <Layout
    title="About NeoLabs | Philippines-Based App Development Company"
    description="Learn about NeoLabs, a Philippines-based app development company delivering premium business apps, automation, integrations, and operational systems."
  >
    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">About NeoLabs</p>
            <h1 className="section-title">A Philippine software company focused on practical modern systems.</h1>
            <p className="lede">
              NeoLabs exists to help businesses move from fragmented manual work into clearer, more modern app-driven operations. We build software that feels commercial, usable, and operationally grounded.
            </p>
          </div>

          <div className="surface-panel overflow-hidden">
            <img
              src="/illustrations/service-support.svg"
              alt="NeoLabs collaborating with clients on business systems and software delivery"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-slate-100">
      <div className="section-container py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <p className="eyebrow">Who we serve</p>
            <h2 className="section-title">Built for SMEs, scaling companies, and high-stakes business environments.</h2>
            <p className="lede">
              Our work spans custom internal apps, automation, workflow approvals, integrations, reporting, and operational tooling for teams that need more than a generic off-the-shelf solution.
            </p>
          </div>

          <div className="grid gap-5">
            {commitments.map((item) => (
              <article key={item} className="surface-panel p-7">
                <p className="text-base leading-7 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <article className="surface-panel p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Mission</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Help Philippine businesses modernize with better apps, clearer workflows, and systems that support real growth.
            </p>
          </article>
          <article className="surface-panel p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Approach</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Translate operations into software deliberately, with structured scope, disciplined execution, and clear communication.
            </p>
          </article>
          <article className="surface-panel p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Positioning</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Professional, premium, and fair. We are not positioned as the cheapest option, but as the right long-term systems partner.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section className="bg-slate-950 text-white">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow border-white/10 bg-white/5 text-slate-200">Work with NeoLabs</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              If the systems matter, the delivery partner should too.
            </h2>
          </div>
          <Link to="/contact" className="btn-primary">
            Talk to the team
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
