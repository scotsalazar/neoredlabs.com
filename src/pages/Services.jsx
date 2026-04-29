import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const services = [
  {
    title: 'Personalized app development',
    visual: 'app',
    summary: 'Replace scattered manual steps with a working app built around how your team already operates.',
    proof: 'Built around your approvals, users, dashboards, and internal workflows.',
  },
  {
    title: 'Automation and integrations',
    visual: 'automation',
    summary: 'Reduce repetitive work and missed handoffs by connecting tasks, approvals, and system triggers.',
    proof: 'Ideal for teams that need fewer manual interventions across daily work.',
  },
  {
    title: 'Reporting and operational visibility',
    visual: 'reporting',
    summary: 'Give owners and teams clearer visibility with dashboards, reporting layers, and alerts that surface issues sooner.',
    proof: 'Built for operations that need 24/7 visibility instead of delayed updates.',
  }
];

const deliveryPoints = [
  'Clear scope before build starts',
  'Fast shipping with steady weekly progress',
  'Support that stays close after rollout'
];

const ServiceVisual = ({ type, title }) => (
  <div className={`service-card-visual service-card-visual-${type}`} role="img" aria-label={`${title} technical service visual`}>
    <div className="service-card-grid" aria-hidden="true" />
    <div className="service-card-glow" aria-hidden="true" />

    {type === 'app' && (
      <div className="service-app-frame" aria-hidden="true">
        <div className="service-window-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="service-app-sidebar">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="service-app-workspace">
          <span className="service-app-toolbar" />
          <span className="service-app-hero" />
          <span className="service-app-card service-app-card-one" />
          <span className="service-app-card service-app-card-two" />
          <span className="service-app-card service-app-card-three" />
        </div>
        <div className="service-app-device">
          <span />
          <span />
          <span />
        </div>
      </div>
    )}

    {type === 'automation' && (
      <div className="service-order-flow" aria-hidden="true">
        <div className="service-order-depth" />
        <div className="service-order-road">
          <span />
          <span />
          <span />
        </div>
        <div className="service-order-progress" />
        <span className="service-order-particle service-order-particle-one" />
        <span className="service-order-particle service-order-particle-two" />
        <span className="service-order-particle service-order-particle-three" />

        <div className="service-order-po">
          <div className="service-order-po-header">
            <span />
            <span />
          </div>
          <div className="service-order-po-items">
            <span />
            <span />
            <span />
          </div>
          <i className="service-order-po-check" />
        </div>

        <div className="service-order-package">
          <span className="service-order-package-lid" />
          <div className="service-order-label">
            <span />
            <span />
            <i />
          </div>
        </div>

        <div className="service-order-truck">
          <b className="service-order-truck-trail" />
          <span className="service-order-truck-cargo" />
          <span className="service-order-truck-cab" />
          <i className="service-order-truck-wheel-one" />
          <i className="service-order-truck-wheel-two" />
        </div>

        <div className="service-order-client">
          <span />
          <i />
        </div>
      </div>
    )}

    {type === 'reporting' && (
      <div className="service-reporting-board" aria-hidden="true">
        <div className="service-reporting-panel service-reporting-panel-wide">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="service-reporting-panel service-reporting-panel-ring">
          <span />
        </div>
        <div className="service-reporting-panel service-reporting-panel-bars">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="service-reporting-panel service-reporting-panel-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
    )}
  </div>
);

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
            <h1 className="section-title">Our platform leverages the latest AI technologies to deliver smart automated solutions.</h1>
            <p className="lede">
              Each service is designed to fit your existing operations, connect your tools, and create smoother, more intelligent workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pricing" className="btn-primary">View pricing</Link>
              <Link to="/contact" className="btn-secondary">Book a consultation</Link>
            </div>
          </div>

          <div className="service-stack-visual min-h-[27rem] overflow-hidden sm:aspect-[16/10] sm:min-h-0">
            <img
              src="/assets/images/generated/services-ai-platform-logos.png"
              alt="AI and creative platform integrations supported by NeoLabs"
              className="service-stack-logos"
            />
            <div className="service-stack-scanline" aria-hidden="true" />
            <div className="service-orbit" aria-hidden="true">
              <div className="service-orbit-ring service-orbit-ring-one" />
              <div className="service-orbit-ring service-orbit-ring-two" />
              <div className="service-orbit-beam service-orbit-beam-one" />
              <div className="service-orbit-beam service-orbit-beam-two" />
              <div className="service-orbit-core" />
              <div className="service-orbit-node service-orbit-node-one" />
              <div className="service-orbit-node service-orbit-node-two" />
              <div className="service-orbit-node service-orbit-node-three" />
              <div className="service-orbit-node service-orbit-node-four" />
              <div className="service-orbit-node service-orbit-node-five" />
              <div className="service-orbit-node service-orbit-node-six" />
            </div>
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
                <ServiceVisual type={service.visual} title={service.title} />
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
