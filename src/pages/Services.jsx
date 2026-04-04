import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const services = [
  {
    title: 'Custom business applications',
    category: 'Apps',
    image: '/illustrations/service-custom-apps.svg',
    summary: 'Operational software designed around your exact approvals, team roles, and working process.',
    points: [
      'Admin control pages, web and mobile access, and workflow-specific UI',
      'Structured CRUD operations, dashboards, and forms built for day-to-day use',
      'Product direction that keeps the system clear for operators and leadership',
    ],
  },
  {
    title: 'Automation and AI-enabled workflows',
    category: 'Automation',
    image: '/illustrations/service-automation.svg',
    summary: 'Agentic processes, automations, approvals, notifications, and repetitive-task reduction across modern operations.',
    points: [
      'Automations, approval flows, and notifications for teams that need faster movement',
      'AI-assisted steps where it improves speed, routing, and decision support',
      'A clearer operating model with less manual follow-up and fewer dropped handoffs',
    ],
  },
  {
    title: 'Integrations, dashboards, and reporting',
    category: 'Reporting',
    image: '/illustrations/service-reporting.svg',
    summary: 'Systems that connect your tools and turn fragmented data into operational visibility.',
    points: [
      'App integrations across the platforms your business already depends on',
      'Executive and team reporting with stronger visibility across activity and performance',
      'Alerts and reporting structures that help leadership act earlier',
    ],
  },
  {
    title: 'Operational support and stakeholder coordination',
    category: 'Support',
    image: '/illustrations/service-support.svg',
    summary: 'Delivery and support built for long-term operational confidence, not just one-off launches.',
    points: [
      'Structured communication and coordinated release support',
      'Stakeholder alignment, issue visibility, and clear ownership of follow-through',
      'A more reliable post-launch experience for clients, operators, and managers',
    ],
  }
];

const Services = () => (
  <Layout
    title="Services | NeoLabs"
    description="Explore NeoLabs services for custom business apps, automation, integrations, dashboards, and operational support."
  >
    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">Services</p>
            <h1 className="section-title">Delivery built around business outcomes, not just features.</h1>
            <p className="lede">
              NeoLabs helps companies move from scattered tools and manual effort into software that is clearer, more integrated, and easier to operate at scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pricing" className="btn-primary">View pricing</Link>
              <Link to="/contact" className="btn-secondary">Book a consultation</Link>
            </div>
          </div>

          <div className="surface-panel overflow-hidden">
            <img
              src="/illustrations/service-automation.svg"
              alt="NeoLabs services for automation, apps, and modern business operations"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-slate-100">
      <div className="section-container py-20">
        <div className="grid gap-12">
          {services.map((service, index) => (
            <article key={service.title} className="surface-panel overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} h-full`}>
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} p-8 lg:p-12`}>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{service.category}</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{service.title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{service.summary}</p>
                  <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white lg:grid-cols-[1fr_0.88fr] lg:items-center lg:p-12">
          <div className="space-y-4">
            <p className="eyebrow border-white/10 bg-white/5 text-slate-200">How we deliver</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Clear scope, weekly progress, and systems designed for real operations.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              The goal is not just to launch something modern. The goal is to deliver software that your team can actually run, trust, and grow with.
            </p>
          </div>
          <div className="surface-panel overflow-hidden border-white/10 bg-white/5 shadow-none">
            <img src="/illustrations/service-reporting.svg" alt="NeoLabs delivery model for reporting and operational visibility" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
