import React from 'react';
import collaboration from '../assets/images/meeting.png';
import integration from '../assets/images/integration.png';
import ai from '../assets/images/ai.png';

const services = [
  {
    title: 'Collaborative Delivery',
    description:
      'Cross-functional teams of engineers, designers, and strategists work side by side to deliver user-focused products.',
    image: collaboration,
    alt: 'Professionals collaborating in a meeting'
  },
  {
    title: 'App & Workflow Integration',
    description:
      'Connect your favourite apps with custom integrations that streamline operations and unlock new efficiencies.',
    image: integration,
    alt: 'Abstract integration diagram'
  },
  {
    title: 'AI-Powered Solutions',
    description:
      'Harness artificial intelligence for predictive analytics, automation, and intelligent experiences tailored to you.',
    image: ai,
    alt: 'Artificial intelligence illustration'
  }
];

const Services = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black py-20" id="services">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_40%)]" aria-hidden />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.15),transparent_35%)]" aria-hidden />
    <div className="section-container relative space-y-12">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Services
        </span>
        <h2 className="section-title mt-4">Building Blocks for Modern Experiences</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-light/70">
          We design, build, and ship connected products with the same visual language that runs throughout NeoRedLabs. Expect dark,
          cinematic visuals, deliberate spacing, and human-friendly language across every touchpoint.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl ring-1 ring-white/5 transition duration-300 hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              <img src={service.image} alt={service.alt} className="h-44 w-full object-cover" loading="lazy" />
              <div className="relative flex flex-col gap-3 p-6">
                <h3 className="text-xl font-semibold text-light">{service.title}</h3>
                <p className="text-sm text-light/70 leading-relaxed">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950 to-black p-8 shadow-2xl">
          <div className="absolute -left-24 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" aria-hidden />
          <div className="relative space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">How we work</p>
            <h3 className="text-2xl md:text-3xl font-bold text-light">Human-led design, technology-first delivery.</h3>
            <p className="text-base text-light/70 leading-relaxed">
              Our teams embed with yours to map opportunities, shape outcomes, and release iterative updates. Everything—from design systems
              to deployment pipelines—mirrors the cohesive theme you see across our site.
            </p>
            <ul className="grid gap-3 text-sm text-light/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                Experience-first solutions matched with measurable KPIs.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                Secure, scalable integrations built for modern stacks.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                Clear communication, weekly showcases, and transparent roadmaps.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
