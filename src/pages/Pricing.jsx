import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';

const pricingOptions = [
  {
    name: 'Starter Sprint',
    description: 'Best for teams validating one workflow, one integration path, or one high-friction process.',
    price: 'Starts at project scope',
    points: [
      'Discovery, workflow mapping, and delivery plan',
      'One focused automation or app module',
      'Launch support with handoff documentation',
    ],
  },
  {
    name: 'Growth Build',
    description: 'Best for businesses modernizing multiple processes with custom apps, AI, and integrations.',
    price: 'Custom proposal',
    points: [
      'Multi-step automations and connected systems',
      'Operational dashboards, alerts, and reporting',
      'Weekly progress reviews with staged rollouts',
    ],
  },
  {
    name: 'Ongoing Partnership',
    description: 'Best for teams that want a long-term product and automation partner instead of adding headcount.',
    price: 'Monthly engagement',
    points: [
      'Continuous improvements and roadmap support',
      'Monitoring, optimization, and issue response',
      'Strategic guidance across product, ops, and AI delivery',
    ],
  },
];

const Pricing = () => (
  <Layout
    title="Pricing | NeoLabs"
    description="Flexible NeoLabs pricing for custom apps, automations, AI agents, and operational support."
  >
    <GradientSection className="py-20 md:py-24">
      <div className="section-container space-y-12">
        <header className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Pricing</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Flexible pricing for custom builds and ongoing support
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-light/80">
            Most NeoLabs work is scoped around your actual workflows, systems, and outcomes, so we keep pricing simple:
            start with the right engagement shape, then tailor the build around your team.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          {pricingOptions.map((option) => (
            <article
              key={option.name}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">{option.name}</p>
                  <p className="mt-3 text-2xl font-semibold text-light">{option.price}</p>
                </div>
                <p className="text-base leading-relaxed text-light/80">{option.description}</p>
              </div>

              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-light/85">
                {option.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-[6px] w-[6px] rounded-full bg-primary" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-black/20 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-light/60">Need an exact quote?</p>
            <h2 className="text-2xl font-semibold text-light sm:text-3xl">Let&apos;s scope the right starting point together.</h2>
            <p className="max-w-2xl text-base leading-relaxed text-light/80">
              Share your workflows, bottlenecks, and goals and we&apos;ll recommend the fastest path to a real business outcome.
            </p>
          </div>

          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
        </section>
      </div>
    </GradientSection>
  </Layout>
);

export default Pricing;
