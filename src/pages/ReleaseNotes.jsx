import React from 'react';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';
import workflowImage from '../assets/images/workflow.png';
import dashboardImage from '../assets/images/product-erp.png';
import analyticsImage from '../assets/images/revenue-dashboard.png';
import partnershipImage from '../assets/images/about.png';

const BUSINESS_UPDATES = [
  {
    id: 'business-po-agent-release',
    title: 'PO Agent v1.01 is active across daily order handling.',
    category: 'latest update',
    summary:
      'We rolled out a more stable purchase-order automation flow with stronger monitoring, cleaner exception handling, and better delivery scheduling coverage for day-to-day operations.',
    date: '2026-03-16',
    image: workflowImage,
    ctaLabel: 'Talk to the team',
    ctaHref: '/contact',
  },
  {
    id: 'business-dashboard-rollout',
    title: 'Live reporting dashboards now surface finance and ops signals sooner.',
    category: 'operations',
    summary:
      'Recent delivery work focused on real-time views for revenue, fulfillment, and team workload so clients can spot bottlenecks faster and act before they become expensive fire drills.',
    date: '2026-03-05',
    image: analyticsImage,
    ctaLabel: 'View services',
    ctaHref: '/services',
  },
  {
    id: 'business-partnership-expansion',
    title: 'Partnership conversations continue to expand delivery and support capacity.',
    category: 'business',
    summary:
      'We are continuing to shape new operating partnerships around service coverage, delivery coordination, and shared systems so more businesses can run with fewer manual handoffs.',
    date: '2026-02-24',
    image: partnershipImage,
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
  },
];

const humanDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const ReleaseNotes = () => (
  <Layout
    title="Business | NeoLabs"
    description="Latest NeoLabs business updates, launches, rollouts, and partnership milestones."
  >
    <GradientSection className="py-20 md:py-24">
      <div className="section-container space-y-12">
        <header className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Business</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Latest updates from NeoLabs
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-light/80">
            Follow recent launches, workflow improvements, reporting rollouts, and partnership progress in one place.
          </p>
        </header>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-sm lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-8">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-light/65">Featured post</p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Modern systems, current rollouts, and practical AI progress.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-light/80 sm:text-lg">
              This page now carries the homepage latest-updates path so visitors can move directly from the main hero into live business progress.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/15"
            >
              Schedule a call
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-2">
            <img
              src={dashboardImage}
              alt="NeoLabs business update overview"
              className="aspect-[16/10] w-full rounded-[1.25rem] object-cover"
            />
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="business-updates-heading">
          <h2 id="business-updates-heading" className="text-2xl font-semibold tracking-tight text-light">
            Recent updates
          </h2>

          <ul className="space-y-6" aria-label="NeoLabs business updates">
            {BUSINESS_UPDATES.map((entry) => (
              <li key={entry.id} className="list-none">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm md:flex-row md:min-h-[320px]">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="h-56 w-full object-cover md:h-auto md:w-[38%] lg:w-[42%]"
                    loading="lazy"
                  />

                  <div className="flex h-full flex-col gap-4 p-6">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-light/70">
                        {entry.category}
                      </p>
                      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-light">
                        {entry.title}
                      </h3>
                      <p className="text-base leading-relaxed text-light/90">{entry.summary}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <time
                        dateTime={entry.date}
                        className="text-xs font-medium uppercase tracking-[0.16em] text-light/70"
                      >
                        {humanDateFormatter.format(new Date(entry.date))}
                      </time>
                      <a
                        href={entry.ctaHref}
                        className="rounded-md px-2 py-1 text-sm font-semibold text-secondary transition-colors hover:text-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                      >
                        {entry.ctaLabel}
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </GradientSection>
  </Layout>
);

export default ReleaseNotes;
