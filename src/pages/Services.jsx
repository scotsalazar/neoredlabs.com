import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const services = [
  {
    title: 'Personalized app development',
    image: '/illustrations/service-custom-apps.svg',
    summary: 'Internal apps, admin panels, dashboards, and workflow tools built around how your team actually works.',
  },
  {
    title: 'Automation and integrations',
    image: '/illustrations/service-automation.svg',
    summary: 'Approvals, alerts, AI-assisted steps, and connected systems that reduce repetitive work and missed handoffs.',
  },
  {
    title: 'Reporting and operational visibility',
    image: '/illustrations/service-reporting.svg',
    summary: 'Dashboards, signals, and reporting layers that help teams act earlier and manage the work with more clarity.',
  }
];

const deliveryPoints = [
  'Clear scope from the start',
  'Fast build cycles and steady progress',
  'Operational alignment and 24/7 support'
];

const Services = () => (
  <Layout
    title="Services | NeoLabs"
    description="Explore NeoLabs services for personalized app development, automation, integrations, and operational reporting."
  >
    <section className="bg-page">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">Services</p>
            <h1 className="section-title">Modern systems built around your operations, not around generic software.</h1>
            <p className="lede">
              We focus on the work that matters most: personalized apps, automation, integrations, and reporting that make the business easier to run.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pricing" className="btn-primary">View pricing</Link>
              <Link to="/contact" className="btn-secondary">Book a consultation</Link>
            </div>
          </div>

          <div className="surface-panel overflow-hidden">
            <img
              src="/illustrations/service-automation.svg"
              alt="NeoLabs services for automation, apps, and operational systems"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-page-muted">
      <div className="section-container py-20">
        <div className="grid gap-10">
          {services.map((service, index) => (
            <article key={service.title} className="grid gap-6 border-b border-line pb-10 last:border-b-0 last:pb-0 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} surface-panel overflow-hidden`}>
                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-4`}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Core service</p>
                <h2 className="text-3xl font-semibold tracking-tight text-ink-strong sm:text-4xl">{service.title}</h2>
                <p className="max-w-2xl text-base leading-8 text-copy">{service.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-page">
      <div className="section-container py-20">
        <div className="bg-panel-muted rounded-[1.75rem] border border-line p-8 lg:p-12">
          <p className="eyebrow">How we deliver</p>
          <h2 className="mt-4 section-title">Fast, clear, and aligned to the business.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {deliveryPoints.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-line bg-panel p-5">
                <p className="text-base font-semibold text-ink-strong">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
