import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';

const results = [
  {
    title: 'Less manual work',
    description: 'Automation removes repetitive interventions so teams can spend more time on focused, higher-value work.',
  },
  {
    title: 'Connected existing tools',
    description: 'We fit into your current setup and make the apps you already use work together more smoothly.',
  },
  {
    title: '24/7 operational visibility',
    description: 'Dashboards and alerts help owners and teams see issues earlier and respond with more control.',
  },
  {
    title: 'Cleaner digital workflows',
    description: 'Digital approvals, records, and reporting reduce paper-heavy processes and keep work easier to track.',
  }
];

const serviceSummary = [
  {
    title: 'Custom apps',
    description: 'Built around actual workflows so your team can work faster without adjusting to generic software.',
  },
  {
    title: 'Automation',
    description: 'Removes repetitive work, missed handoffs, and manual follow-up across daily operations.',
  },
  {
    title: 'Integrations',
    description: 'Your business already has the tools. We connect them, automate the manual parts, and turn them into a smoother operation.',
  }
];

const pricingPreview = [
  { name: 'Starter', price: 'PHP 3,500 - 5,000', fit: 'For SMEs that need a working operational app.' },
  { name: 'Growth', price: 'PHP 6,000 - 12,000', fit: 'For teams connecting tools, automating steps, and improving visibility.' },
  { name: 'Scale', price: 'PHP 20,000+', fit: 'For enterprise and mission-critical operations.' },
];

const Home = () => (
  <Layout
    title="NeoLabs | Modern App Development Company"
    description="NeoLabs helps businesses reduce manual work, connect existing tools, and gain clearer operational visibility with personalized modern apps."
  >
    <Hero />

    <section className="bg-page-muted">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Results</p>
            <h2 className="section-title">Turn manual operations into connected, automated systems built for real business growth.</h2>
            <p className="lede">The work should remove friction, connect what already exists, and make the business easier to monitor every day.</p>
          </div>
          <Link to="/contact" className="btn-secondary">Discuss your workflow</Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {results.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-line bg-panel p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.title}</p>
              <p className="mt-4 text-base leading-7 text-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-page">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">What we build</p>
            <h2 className="section-title">Apps, automation, and integrations that reduce operational drag.</h2>
            <p className="lede">Each offer focuses on one outcome: better workflows, less manual effort, and smoother operations with the tools you already use.</p>
          </div>
          <Link to="/services" className="btn-secondary">See services</Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {serviceSummary.map((item) => (
            <article key={item.title} className="bg-panel-muted rounded-[1.5rem] border border-line p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.title}</p>
              <p className="mt-4 text-lg font-semibold tracking-tight text-ink-strong">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-page-muted">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Pricing</p>
            <h2 className="section-title">Fair package options with room to scale by complexity.</h2>
            <p className="lede">Start with the right level, then shape the scope around workflow complexity, connected tools, visibility, and rollout needs.</p>
          </div>
          <Link to="/pricing" className="btn-secondary">View full pricing</Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingPreview.map((item) => (
            <article key={item.name} className="rounded-[1.5rem] border border-line bg-panel p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.name}</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-ink-strong">{item.price}</p>
              <p className="mt-3 text-sm leading-7 text-copy">{item.fit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-surface-dark text-light">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow eyebrow-on-dark">Start the conversation</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-light sm:text-5xl">
              Tell us what the business needs to run better.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-light/70 sm:text-lg">Share the bottlenecks, tools, or workflows you want to improve and we will help shape the right rollout.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link to="/latest" className="btn-secondary btn-secondary-on-dark">
              Latest updates
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;
