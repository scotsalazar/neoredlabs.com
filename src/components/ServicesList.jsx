import React from 'react';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Personalised Business Apps',
    description: 'Eliminate redundant tasks using customised AI workflows.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    title: 'AI-Driven System Integration',
    description: 'Seamlessly connect your systems with intelligent automation.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <circle cx="12" cy="4" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M12 6v8m0 0l-6 4m6-4l6 4" />
      </svg>
    ),
  },
  {
    title: 'Digital Connectivity & Ecosystem Integration',
    description: 'Integrate your digital tools and ecosystem for unified operations.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <path d="M10 13a5 5 0 1 1 0-10h4a5 5 0 1 1 0 10h-4z" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Dashboards & Reporting',
    description: 'Monitor performance with live dashboards and actionable insights.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <rect x="4" y="10" width="3" height="10" />
        <rect x="10.5" y="6" width="3" height="14" />
        <rect x="17" y="2" width="3" height="18" />
      </svg>
    ),
  },
  {
    title: 'Seamless Process Automation',
    description: 'Automate processes effortlessly from start to finish.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
        <path d="M12 4v16m0 0l-5-5m5 5l5-5" />
      </svg>
    ),
  },
];

const ServicesList = () => (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {services.map((service) => (
      <ServiceCard key={service.title} icon={service.icon} title={service.title} description={service.description} />
    ))}
  </div>
);

export default ServicesList;
