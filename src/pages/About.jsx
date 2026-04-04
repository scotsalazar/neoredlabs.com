import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const principles = [
  {
    title: 'Workflow-first delivery',
    description: 'We shape systems around the approvals, tools, and daily work your team already manages.',
  },
  {
    title: 'Clear business outcomes',
    description: 'Clients trust us to reduce manual work, connect operations, and improve visibility without unnecessary complexity.',
  },
  {
    title: 'Cleaner digital operations',
    description: 'We help teams replace paper-heavy steps and disconnected records with more trackable digital workflows.',
  }
];

const About = () => (
  <Layout
    title="About NeoLabs | Modern App Development Team"
    description="Learn why businesses trust NeoLabs for personalized app delivery, connected operations, and cleaner digital workflows."
  >
    <section className="bg-page">
      <div className="section-container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">About NeoLabs</p>
            <h1 className="section-title">A delivery partner trusted to make operations clearer, faster, and easier to manage.</h1>
            <p className="lede">
              NeoLabs works with teams that need more than a generic app. We build modern operational systems that combine tailored software, connected tools, and intelligent automation.
            </p>
            <p className="text-base leading-8 text-copy">
              Based in Metro Manila, we stay close to the business context so the systems we build align with real operational needs, not just software requirements.
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
              If the workflow matters, the build should fit the way the business actually runs.
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
