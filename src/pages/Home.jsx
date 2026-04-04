import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import ClientCarousel from '../components/ClientCarousel.jsx';
import Reviews from '../components/Reviews.jsx';

const pillars = [
  {
    title: 'Custom business apps',
    description: 'Operational software shaped around your team, workflows, and approval structure.',
  },
  {
    title: 'Automation and AI',
    description: 'Modern automations, agentic workflows, and task reduction across the tools you already use.',
  },
  {
    title: 'Integrations and reporting',
    description: 'Connected systems, dashboards, and alerts that make leadership decisions faster and cleaner.',
  }
];

const pricingPreview = [
  { name: 'Starter', price: 'PHP 3,500 - 5,000', fit: 'For SMEs that need a working operational app.' },
  { name: 'Growth', price: 'PHP 6,000 - 12,000', fit: 'For scaling businesses adding automation, integrations, and smarter workflows.' },
  { name: 'Scale', price: 'PHP 20,000+', fit: 'For enterprise, government, and mission-critical environments.' },
];

const Home = () => (
  <Layout
    title="NeoLabs | Philippine App Development Company"
    description="NeoLabs is a Philippines-based app development company delivering modern business apps, automation, integrations, and premium operational systems."
  >
    <Hero />
    <ClientCarousel />

    <section className="bg-slate-50">
      <div className="section-container py-20">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-5">
            <p className="eyebrow">What we build</p>
            <h2 className="section-title">Operational software built to make the business feel more in control.</h2>
            <p className="lede">
              NeoLabs is built for businesses that want better systems without overcomplicated delivery. We combine product thinking, software execution, automation, and commercial practicality into one delivery partner.
            </p>
            <Link to="/services" className="btn-primary">
              Explore services
            </Link>
          </div>

          <div className="grid gap-6">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="surface-panel p-7">
                <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{pillar.title}</p>
                  <p className="text-base leading-7 text-slate-600">{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="surface-panel overflow-hidden">
            <img
              src="/illustrations/service-automation.svg"
              alt="NeoLabs delivering automation and integrated software operations"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <p className="eyebrow">Why NeoLabs</p>
            <h2 className="section-title">Premium in execution, fair in pricing, practical in delivery.</h2>
            <p className="lede">
              We do not position ourselves as the cheapest option. We position NeoLabs as the partner that helps businesses invest in systems that are clearer, more secure, and more useful to actual operations.
            </p>
            <ul className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <li>Built for Philippine business realities, modern delivery expectations, and long-term operational use.</li>
              <li>Structured package options that make it easier to match scope, complexity, and commercial fit.</li>
              <li>Designed for founders, operators, managers, and enterprise teams who need accountability, not noise.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-slate-100">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Pricing preview</p>
            <h2 className="section-title">Structured packages that scale with the seriousness of the work.</h2>
            <p className="lede">Start with a clear package fit, then shape the final scope around security, integrations, workflows, and operational readiness.</p>
          </div>
          <Link to="/pricing" className="btn-secondary">View full pricing guide</Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingPreview.map((item) => (
            <article key={item.name} className="surface-panel p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.name}</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{item.price}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.fit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <Reviews />

    <section className="bg-white">
      <div className="section-container py-20">
        <div className="surface-panel overflow-hidden bg-slate-950 text-white">
          <div className="grid gap-8 p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:p-12">
            <div className="space-y-5">
              <p className="eyebrow border-white/10 bg-white/5 text-slate-200">Start the conversation</p>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Tell us what your business needs to run better.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                If you already know your package fit, we can refine the scope. If not, we can help you map the right starting point.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link to="/business" className="btn-secondary border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                View company updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;
