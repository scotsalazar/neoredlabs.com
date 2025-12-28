import React from 'react';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Custom Business Applications',
    valueProp: 'Design and ship tailor-made apps that mirror how your teams sell, support, and scale—without wasting budget on one-size-fits-all software.',
    benefits: [
      'Capture revenue faster with workflows built for your exact sales, ops, and customer motions.',
      'Remove manual steps so teams close loops in fewer clicks and with fewer handoffs.',
      'Launch confidently with UX that matches your brand and reduces onboarding friction.',
      'Iterate quickly through measurable roadmaps and embedded release analytics.',
    ],
    cta: 'Plan a custom build sprint',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6M9 12h3M9 15h6" />
      </svg>
    ),
  },
  {
    title: 'AI Integration & Intelligent Process Automation',
    valueProp: 'Layer AI into your operations to cut cycle times, enforce quality controls, and free people for higher-value work.',
    benefits: [
      'Automate intake, routing, and approvals so requests move from minutes to seconds.',
      'Blend human-in-the-loop checkpoints with AI to maintain governance and compliance.',
      'Connect to CRMs, ERPs, and support tools to eliminate swivel-chair work.',
      'Deliver measurable ROI with automation scorecards and continuous optimisation.',
    ],
    cta: 'Map your next automation win',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Dashboards & Operational Insights',
    valueProp: 'Give leaders and teams live visibility into performance so they can act on leading indicators, not lagging reports.',
    benefits: [
      'Consolidate KPIs across product, revenue, and operations into one source of truth.',
      'Spot risks early with automated alerts and clear ownership cues.',
      'Guide frontline teams with actionable views tailored to their daily decisions.',
      'Improve forecasting accuracy with scenario models grounded in live data.',
    ],
    cta: 'Get a live metrics walkthrough',
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
    valueProp: 'Keep customers and partners confident with support that anticipates needs, closes loops, and keeps every stakeholder aligned.',
    benefits: [
      'Reduce churn with proactive outreach, playbooks, and health monitoring.',
      'Accelerate escalations with clear ownership, status transparency, and timeline commitments.',
      'Unify communications across product, engineering, and customer teams to prevent gaps.',
      'Turn feedback into prioritized backlogs that improve roadmap velocity.',
    ],
    cta: 'Set up a support excellence review',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
];

const ServicesList = () => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
    {services.map((service) => (
      <ServiceCard
        key={service.title}
        icon={service.icon}
        title={service.title}
        valueProp={service.valueProp}
        benefits={service.benefits}
        cta={service.cta}
      />
    ))}
  </div>
);

export default ServicesList;
