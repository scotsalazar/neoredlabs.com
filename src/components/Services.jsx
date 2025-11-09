import React from 'react';
import collaboration from '../assets/images/meeting.png';
import integration from '../assets/images/integration.png';
import ai from '../assets/images/ai.png';

const services = [
  {
    title: 'Collaborative Delivery',
    description:
      'Cross-functional teams of engineers, designers and strategists work side by side to deliver holistic, user-focused products.'
    ,
    image: collaboration,
    alt: 'Professionals collaborating in a meeting'
  },
  {
    title: 'App & Workflow Integration',
    description:
      'Connect your favourite apps and services effortlessly with custom integrations that streamline operations and unlock new efficiencies.'
    ,
    image: integration,
    alt: 'Abstract integration diagram'
  },
  {
    title: 'AI-Powered Solutions',
    description:
      'Harness artificial intelligence for predictive analytics, automation and intelligent experiences tailored to your organisation.'
    ,
    image: ai,
    alt: 'Artificial intelligence illustration'
  }
];

const Services = () => (
  <section className="bg-white py-16" id="services">
    <div className="section-container">
      <h2 className="section-title">What We Do</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-700">
        We partner with organisations to design, build and launch technology that creates measurable impact. Our services span
        collaborative delivery, system integration and intelligent automation.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex h-full flex-col overflow-hidden rounded-xl bg-light shadow-md transition-transform duration-200 hover:-translate-y-1"
          >
            <img src={service.image} alt={service.alt} className="h-48 w-full object-cover" />
            <div className="flex flex-1 flex-col p-6 text-center">
              <h3 className="text-xl font-heading font-semibold text-dark">{service.title}</h3>
              <p className="mt-3 text-base text-slate-700">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
