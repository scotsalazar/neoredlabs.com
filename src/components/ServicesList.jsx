import React from 'react';
import ServiceCard from './ServiceCard';

const services = [
  'Personalised Business Apps',
  'AI-Driven System Integration',
  'Digital Connectivity & Ecosystem Integration',
  'Real-Time Dashboards & Reporting',
  'Seamless Process Automation'
];

const ServicesList = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full mt-8">
    {services.map((service) => (
      <ServiceCard key={service} title={service} />
    ))}
  </div>
);

export default ServicesList;
