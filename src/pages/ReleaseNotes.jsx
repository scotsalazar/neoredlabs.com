import React from 'react';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';

const RELEASE_NOTE_ENTRIES = [
  {
    id: 'iam-release-dashboard-sync',
    title: 'IAM: Unified access dashboard sync release',
    category: 'IAM latest releases',
    summary:
      'Coordinated cross-team alignment to integrate our unified access dashboard across client and operations environments, establishing consistent policies and data flows; deployed the automated synchronization with our main client server hub, linking user management and logs; executed comprehensive testing and monitoring to ensure real-time updates and minimal downtime; resulting in improved policy audit tracking, seamless role transitions, and consolidated IAM insights across the client app.',
    date: '2026-03-12',
    image: '/assets/images/solutions/6e44c11e-99d0-4547-8133-1e77994f764e.png',
    ctaLabel: 'View IAM release details',
    ctaHref: '/services',
  },
  {
    id: 'agent-news-autonomy-monitoring',
    title: 'PO Agent v1.01 release update',
    category: 'latest agent news',
    summary:
      'Coordinated cross-functional research and operations to refine our purchase-order autonomous agent; deployed the v1.01 release with updated monitoring processes across our scheduling system; executed new algorithmic workflows that process 99% of incoming purchase orders and automate delivery scheduling, with real-time adjustments to partner availability; resulting in near-total PO coverage, improved accuracy, and reduced manual intervention.',
    date: '2026-03-05',
    image: '/assets/images/solutions/8053086a-a535-4a34-a4b9-810b49271058.png',
    ctaLabel: 'Read agent updates',
    ctaHref: '/about',
  },
  {
    id: 'venture-expansion-partnership-announcement',
    title: 'Business venture: strategic delivery partnership expansion',
    category: 'latest business ventures',
    summary:
      'Coordinated strategic discussions and handshake agreements with corporate business partners to expand delivery networks; deployed partnership frameworks, aligning service protocols and integration points; executed joint operations through pilot programs to test route efficiencies and cross-service logistics; resulting in expanded reach, improved delivery times, and stronger client relationships across enterprise accounts.',
    date: '2026-02-24',
    image: '/assets/images/solutions/48a604cc-735d-434c-8561-b10b1c6fd76c.png',
    ctaLabel: 'Explore venture highlights',
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
    title="Changelog | NeoLabs"
    description="Concise product, platform, and partnership updates from the NeoLabs team."
  >
    <GradientSection className="py-20 md:py-24">
      <div className="section-container space-y-12">
        <header className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Changelog
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
            What&apos;s new at NeoLabs
          </h1>
          <p className="text-lg leading-relaxed text-light/80 max-w-3xl">
            This section shares our latest updates and changelog entries, including IAM launches, agent improvements,
            and new business venture milestones.
          </p>
        </header>

        <section className="space-y-6" aria-labelledby="changelog-updates-heading">
          <h2 id="changelog-updates-heading" className="text-2xl font-semibold tracking-tight text-light">
            Recent updates
          </h2>

          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="NeoLabs changelog entries">
            {RELEASE_NOTE_ENTRIES.map((entry) => (
              <li key={entry.id} className="list-none">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm">
                  <img src={entry.image} alt={entry.title} className="h-48 w-full object-cover" loading="lazy" />

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
