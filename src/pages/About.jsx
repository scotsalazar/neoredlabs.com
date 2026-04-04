import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const principles = [
  {
    title: 'Personalized',
    description: 'We shape the system around your approvals, users, and daily operations.',
  },
  {
    title: 'Fast',
    description: 'We keep scope clear and delivery moving so the work does not stall.',
  },
  {
    title: 'Available',
    description: 'We stay close to the rollout and support the work when it is live.',
  }
];

const About = () => (
  <Layout
    title="About NeoLabs | Modern App Development Team"
    description="Learn about NeoLabs, a modern app development team focused on personalized delivery, fast shipping, and operational fit."
  >
    <section className="bg-page">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">About NeoLabs</p>
            <h1 className="section-title">A modern app partner focused on operational fit.</h1>
            <p className="lede">
              NeoLabs helps businesses move from fragmented manual work into modern systems that feel easier to use, easier to manage, and easier to trust.
            </p>
            <p className="text-base leading-8 text-copy">
              We are based in Metro Manila and work with teams that need a responsive partner, faster delivery, and a stronger understanding of how operations really run.
            </p>
          </div>

          <div className="surface-panel overflow-hidden">
            <img
              src="/illustrations/service-support.svg"
              alt="NeoLabs collaborating with clients on software delivery"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-page-muted">
      <div className="section-container py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-line bg-panel p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.title}</p>
              <p className="mt-4 text-base leading-7 text-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-surface-dark text-light">
      <div className="section-container py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow eyebrow-on-dark">Work with NeoLabs</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-light sm:text-5xl">
              If the system matters, the delivery partner should too.
            </h2>
          </div>
          <Link to="/contact" className="btn-primary">
            Talk to the team
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
