import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const services = [
  {
    title: 'Personalized app development',
    image: '/assets/images/generated/service-custom-app.png',
    summary: 'Replace scattered manual steps with a working app built around how your team already operates.',
    proof: 'Built around your approvals, users, dashboards, and internal workflows.',
  },
  {
    title: 'Automation and integrations',
    image: '/assets/images/generated/service-automation-integrations.png',
    summary: 'Reduce repetitive work and missed handoffs by connecting tasks, approvals, and system triggers.',
    proof: 'Ideal for teams that need fewer manual interventions across daily work.',
  },
  {
    title: 'Reporting and operational visibility',
    image: '/assets/images/generated/service-reporting-visibility.png',
    summary: 'Give owners and teams clearer visibility with dashboards, reporting layers, and alerts that surface issues sooner.',
    proof: 'Built for operations that need 24/7 visibility instead of delayed updates.',
  }
];

const deliveryPoints = [
  'Clear scope before build starts',
  'Fast shipping with steady weekly progress',
  'Support that stays close after rollout'
];

const Services = () => (
  <Layout
    title="Services | NeoLabs"
    description="Explore NeoLabs services for modern application development, AI-powered automation, integrations, and operational visibility."
  >
    <section className="bg-page">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">Services</p>
            <h1 className="section-title">Our platform leverages the latest AI and LLM technologies, integrated across most modern applications to deliver intelligent, automated solutions.</h1>
            <p className="lede">
              Each service is designed to fit your existing operations, connect your tools, and create smoother, more intelligent workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pricing" className="btn-primary">View pricing</Link>
              <Link to="/contact" className="btn-secondary">Book a consultation</Link>
            </div>
          </div>

          <div className="surface-panel aspect-[16/10] overflow-hidden">
            <img
              src="/assets/images/generated/service-automation-integrations.png"
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
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} surface-panel aspect-[16/10] overflow-hidden`}>
                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-4`}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Core service</p>
                <h2 className="text-3xl font-semibold tracking-tight text-ink-strong sm:text-4xl">{service.title}</h2>
                <p className="max-w-2xl text-base leading-8 text-copy">{service.summary}</p>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-copy">{service.proof}</p>
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
          <h2 className="mt-4 section-title">A build process that stays clear from scope to rollout.</h2>
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
