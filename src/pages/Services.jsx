import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';
import appImage from '../assets/images/product-erp.png';
import automationImage from '../assets/images/ai.png';
import dashboardImage from '../assets/images/monitoring-dashboard.png';
import supportImage from '../assets/images/meeting.png';

const services = [
  {
    title: 'Custom Business Applications',
    area: 'Service Area',
    valueProp:
      'Design and ship tailor-made apps that mirror how your teams sell, support, and scale—without wasting budget on one-size-fits-all software.',
    image: appImage,
    imageAlt: 'Custom business application interface for sales and operations teams',
    benefits: [
      'Capture revenue faster with workflows built for your exact sales, ops, and customer motions.',
      'Remove manual steps so teams close loops in fewer clicks and with fewer handoffs.',
      'Launch confidently with UX that matches your brand and reduces onboarding friction.',
      'Iterate quickly through measurable roadmaps and embedded release analytics.',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6M9 12h3M9 15h6" />
      </svg>
    ),
  },
  {
    title: 'AI Integration & Intelligent Process Automation',
    area: 'Agentic Area',
    valueProp: 'Layer AI into your operations to cut cycle times, enforce quality controls, and free people for higher-value work.',
    image: automationImage,
    imageAlt: 'AI integration workflow for intelligent process automation',
    benefits: [
      'Automate intake, routing, and approvals so requests move from minutes to seconds.',
      'Blend human-in-the-loop checkpoints with AI to maintain governance and compliance.',
      'Connect to CRMs, ERPs, and support tools to eliminate swivel-chair work.',
      'Deliver measurable ROI with automation scorecards and continuous optimisation.',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Dashboards & Operational Insights',
    area: 'Reporting Area',
    valueProp:
      'Give leaders and teams live visibility into performance so they can act on leading indicators, not lagging reports.',
    image: dashboardImage,
    imageAlt: 'Operational insights dashboard with real-time KPI monitoring',
    benefits: [
      'Consolidate KPIs across product, revenue, and operations into one source of truth.',
      'Spot risks early with automated alerts and clear ownership cues.',
      'Guide frontline teams with actionable views tailored to their daily decisions.',
      'Improve forecasting accuracy with scenario models grounded in live data.',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <rect x="4" y="11" width="3" height="9" />
        <rect x="10.5" y="7" width="3" height="13" />
        <rect x="17" y="3" width="3" height="17" />
      </svg>
    ),
  },
  {
    title: 'Proactive Product Support & Stakeholder Coordination',
    area: 'Support Area',
    valueProp: 'Keep customers and partners confident with support that anticipates needs, closes loops, and keeps every stakeholder aligned.',
    image: supportImage,
    imageAlt: 'Stakeholder support coordination meeting for proactive product support',
    benefits: [
      'Reduce churn with proactive outreach, playbooks, and health monitoring.',
      'Accelerate escalations with clear ownership, status transparency, and timeline commitments.',
      'Unify communications across product, engineering, and customer teams to prevent gaps.',
      'Turn feedback into prioritised backlogs that improve roadmap velocity.',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
];

const Services = () => {
  const [imageErrors, setImageErrors] = React.useState({});

  const handleImageError = (title) => {
    setImageErrors((previousErrors) => ({
      ...previousErrors,
      [title]: true,
    }));
  };

  return (
    <Layout title="NeoRedLabs – Services" description="Discover our services from AI-driven automation to personalised apps.">
      <GradientSection className="py-20 md:py-24">
        <div className="section-container space-y-12">
          <header className="max-w-4xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Services</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-light">What we deliver</h1>
            <p className="text-lg leading-relaxed text-light/80 max-w-3xl">
              A focused lineup built to ship polished products, automate critical journeys, and keep every stakeholder aligned. Each
              engagement is led by senior specialists and tuned to your stack, speed, and standards.
            </p>
          </header>

          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {services.map((service) => (
              <section key={service.title} className="py-10 md:py-12">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
                  <div className="order-1">
                    {imageErrors[service.title] || !service.image ? (
                      <div
                        className="aspect-[16/9] w-full rounded-2xl border border-white/15 bg-gradient-to-br from-primary/20 via-cyan-400/10 to-white/5 p-6 shadow-lg"
                        role="img"
                        aria-label={`${service.area} visual unavailable`}
                      >
                        <div className="flex h-full items-end">
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-light/80">{service.area} placeholder</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        loading="lazy"
                        onError={() => handleImageError(service.title)}
                        className="aspect-[16/9] w-full rounded-2xl border border-white/10 object-cover shadow-lg"
                      />
                    )}
                  </div>

                  <div className="order-2 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-8">
                    <div className="space-y-4 max-w-3xl">
                      <div className="inline-flex items-center gap-3 text-primary">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
                          {service.icon}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-light/70">{service.area}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-light">{service.title}</h2>
                      <p className="text-lg leading-relaxed text-light/85">{service.valueProp}</p>
                    </div>

                    <div className="space-y-4 max-w-2xl">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-light/60">What that looks like</h3>
                      <ul className="space-y-3 text-base leading-relaxed text-light/85">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex gap-3">
                            <span className="mt-2 h-[6px] w-[6px] rounded-full bg-primary" aria-hidden />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="flex justify-center pt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-base font-semibold text-primary shadow-sm transition hover:border-primary/60 hover:bg-primary/15"
            >
              Talk to the team
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </GradientSection>
    </Layout>
  );
};

export default Services;
