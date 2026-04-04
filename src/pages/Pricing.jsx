import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const packages = [
  {
    name: 'Free Trial',
    price: 'Concept preview',
    positioning: 'Best for validating the direction before a paid rollout.',
    points: [
      'Basic branded setup',
      'Simple feature preview',
      'Personalized for initial use case',
      'Limited revisions',
      'Support upon availability',
    ],
  },
  {
    name: 'Starter',
    price: 'PHP 3,500 - 5,000',
    positioning: 'Best for SMEs that need a working app to replace manual coordination.',
    points: [
      'Admin control page',
      'Web and mobile version',
      'Login / user access',
      'CRUD availability',
      'Basic dashboards and forms',
      '24/7 support',
    ],
  },
  {
    name: 'Growth',
    price: 'PHP 6,000 - 12,000',
    positioning: 'Best for growing businesses that want connected tools, automation, and clearer visibility.',
    points: [
      'Modern UI/UX',
      'Improved security setup',
      'App integrations',
      'AI features',
      'Automations',
      'Email workflows',
      'Approval flows and notifications',
    ],
  },
  {
    name: 'Scale',
    price: 'PHP 20,000+',
    positioning: 'Best for complex operations that require stronger governance, reliability, and cross-system control.',
    points: [
      'Role-based access and permissions',
      'Audit trails and activity logs',
      'Large data handling',
      'Multi-department workflows',
      'API integrations across systems',
      'Advanced reporting',
      'Backup and recovery planning',
      'Performance optimization',
      'Security hardening',
      'Deployment readiness for mission-critical use',
    ],
  }
];

const scaleDifferentiators = [
  {
    title: 'Security',
    description: 'Stronger access controls, approval layers, audit logs, data protection, and tighter deployment practices.',
  },
  {
    title: 'Scalability',
    description: 'Designed for larger user bases, heavier data volume, more transactions, and multiple departments.',
  },
  {
    title: 'Reliability',
    description: 'Built for stable operations with monitoring, backup plans, recovery readiness, and reduced downtime risk.',
  },
  {
    title: 'Integration',
    description: 'Can connect with internal systems, third-party services, government tools, CRMs, ERPs, and reporting platforms.',
  },
  {
    title: 'Governance',
    description: 'A better fit for organizations needing traceability, process control, accountability, and compliance-aware workflows.',
  }
];

const pricingGuide = [
  ['Starter', 'PHP 3,500 - 5,000', 'Entry package for basic business apps'],
  ['Growth', 'PHP 6,000 - 12,000', 'Value package for automation and smarter workflows'],
  ['Scale', 'PHP 20,000+', 'Enterprise-grade delivery based on scope, security, and data volume'],
];

const Pricing = () => (
  <Layout
    title="Pricing | NeoLabs"
    description="Explore NeoLabs pricing for app delivery packages built around workflow complexity, automation, visibility, and operational readiness."
  >
    <section className="bg-page">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">Pricing</p>
            <h1 className="section-title">Pricing shaped by the level of workflow, automation, and operational responsibility involved.</h1>
            <p className="lede">
              Each package reflects how much of the business workflow needs to be replaced, connected, automated, and supported.
            </p>
          </div>
          <div className="surface-panel overflow-hidden">
            <img
              src="/illustrations/service-custom-apps.svg"
              alt="NeoLabs pricing and package overview for modern business app development"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-page-muted">
      <div className="section-container py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {packages.map((item) => (
            <article key={item.name} className="surface-panel p-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.name}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong">{item.price}</p>
                  </div>
                  <p className="max-w-xs text-sm leading-6 text-copy">{item.positioning}</p>
                </div>
                <ul className="space-y-3 text-sm leading-7 text-copy sm:text-base">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-page">
      <div className="section-container py-20">
        <div className="space-y-8">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Monthly pricing guide</p>
            <h2 className="section-title">A practical guide for the first quote conversation.</h2>
          </div>

          <div className="surface-panel overflow-hidden">
            <div className="grid grid-cols-1 border-b border-line bg-surface-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-light/80 md:grid-cols-[0.9fr_0.8fr_1.3fr]">
              <span>Package</span>
              <span>Price range</span>
              <span>Commercial intent</span>
            </div>
            {pricingGuide.map((row) => (
              <div key={row[0]} className="grid grid-cols-1 gap-2 border-b border-line px-6 py-5 text-sm text-copy last:border-b-0 md:grid-cols-[0.9fr_0.8fr_1.3fr] md:gap-6 md:text-base">
                <span className="font-semibold text-ink-strong">{row[0]}</span>
                <span>{row[1]}</span>
                <span>{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-page-muted">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-4">
            <p className="eyebrow">Scale package</p>
            <h2 className="section-title">What makes a Scale app different.</h2>
            <p className="lede">
              Scale projects carry more operational responsibility, so visibility, control, security, and reliability matter more.
            </p>
          </div>

          <div className="grid gap-5">
            {scaleDifferentiators.map((item) => (
              <article key={item.title} className="surface-panel p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.title}</p>
                <p className="mt-3 text-base leading-7 text-copy">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-page">
      <div className="section-container py-20">
        <div className="grid gap-6 rounded-[2rem] border border-line bg-surface-dark p-8 text-light lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="space-y-4">
            <p className="eyebrow eyebrow-on-dark">Deployment & hosting</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-light sm:text-5xl">
              Production setup is priced according to operational responsibility.
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-7 text-light/70 sm:text-base">
            <p><span className="font-semibold text-light">Starter:</span> Deployment is an optional add-on depending on project scope and client requirements.</p>
            <p><span className="font-semibold text-light">Growth:</span> Deployment may be included in the proposal or billed separately based on app complexity, third-party integrations, and support requirements.</p>
            <p><span className="font-semibold text-light">Scale:</span> Deployment, infrastructure, security, backups, monitoring, and maintenance are quoted separately to match enterprise-grade requirements.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-page-muted">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-line bg-panel p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Next step</p>
            <h2 className="section-title">Tell us the workflow you need to improve and we will shape the right package around it.</h2>
            <p className="lede">Share your tools, bottlenecks, reporting needs, and timeline so we can scope the right rollout.</p>
          </div>
          <Link to="/contact" className="btn-primary">Request a quote</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Pricing;
