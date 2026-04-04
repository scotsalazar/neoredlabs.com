import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';

const differentiators = [
  {
    title: 'Personalized modern app delivery',
    description: 'We build around how your team actually works, not around a generic template.',
  },
  {
    title: 'Fast shipping without the chaos',
    description: 'Scope stays clear, communication stays close, and progress keeps moving each week.',
  },
  {
    title: 'Operational fit and 24/7 support',
    description: 'We understand the day-to-day side of the business and stay aligned when the work is live.',
  }
];

const serviceSummary = [
  {
    title: 'Custom apps',
    description: 'Internal systems, admin panels, dashboards, and role-based workflows.',
  },
  {
    title: 'Automation',
    description: 'Approvals, alerts, email flows, AI-assisted steps, and repetitive-task reduction.',
  },
  {
    title: 'Integrations',
    description: 'Connected tools, reporting layers, and operational visibility across the business.',
  }
];

const pricingPreview = [
  { name: 'Starter', price: 'PHP 3,500 - 5,000', fit: 'For SMEs that need a working operational app.' },
  { name: 'Growth', price: 'PHP 6,000 - 12,000', fit: 'For teams adding automation and deeper workflow support.' },
  { name: 'Scale', price: 'PHP 20,000+', fit: 'For enterprise and mission-critical operations.' },
];

const Home = () => (
  <Layout
    title="NeoLabs | Modern App Development Company"
    description="NeoLabs builds personalized modern apps, automation, and integrations for teams that need fast delivery, operational fit, and dependable support."
  >
    <Hero />

    <section className="bg-[#f7f4ee]">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <p className="eyebrow">Why NeoLabs</p>
            <h2 className="section-title">Built for businesses that want the work to feel clear and dependable.</h2>
            <p className="lede">
              Our edge is simple: personalized builds, fast delivery, operational understanding, and support that stays available when your team needs it.
            </p>
          </div>

          <div className="grid gap-4">
            {differentiators.map((item) => (
              <article key={item.title} className="border-b border-slate-200 py-4 last:border-b-0">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.title}</p>
                <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">What we build</p>
            <h2 className="section-title">Apps, automation, and integrations that reduce operational drag.</h2>
          </div>
          <Link to="/services" className="btn-secondary">See services</Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {serviceSummary.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-[#fbfaf7] p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.title}</p>
              <p className="mt-4 text-lg font-semibold tracking-tight text-slate-950">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#f7f4ee]">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Pricing</p>
            <h2 className="section-title">Fair package options with room to scale by complexity.</h2>
            <p className="lede">Start with the right tier, then shape the final scope around workflows, integrations, security, and support needs.</p>
          </div>
          <Link to="/pricing" className="btn-secondary">View full pricing</Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingPreview.map((item) => (
            <article key={item.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.name}</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{item.price}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.fit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-slate-950 text-white">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow border-white/10 bg-white/5 text-slate-200">Start the conversation</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Tell us what the business needs to run better.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              If you already know the scope, we can move fast. If not, we can help shape the right rollout.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link to="/business" className="btn-secondary border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Business updates
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;
