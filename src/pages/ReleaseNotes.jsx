import React from 'react';
import Layout from '../components/Layout.jsx';
import GradientSection from '../components/GradientSection.jsx';

const releaseEntries = [
  {
    version: 'v1.2.0',
    date: 'March 2026',
    updates: [
      'Introduced the Release Notes page for transparent product and website updates.',
      'Improved site navigation by adding direct access to release updates from the main menu.',
      'Refined page-level metadata handling across key routes for better search previews.',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'February 2026',
    updates: [
      'Expanded services messaging with clearer outcome-oriented descriptions.',
      'Enhanced responsive spacing behavior across major marketing pages.',
      'Polished contact page messaging for faster partnership onboarding.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'January 2026',
    updates: [
      'Launched the refreshed NeoLabs website foundation and page architecture.',
      'Established the shared Layout wrapper for consistent global navigation and footer experiences.',
      'Shipped core routes: Home, About, Services, and Contact.',
    ],
  },
];

const ReleaseNotes = () => (
  <Layout title="Release Notes | NeoLabs" description="Track the latest NeoLabs website and product updates.">
    <GradientSection className="py-20 md:py-24">
      <div className="section-container space-y-12">
        <header className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Release Notes</p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-light">What&apos;s new at NeoLabs</h1>
          <p className="text-lg leading-relaxed text-light/80 max-w-3xl">
            Follow recent improvements, shipped enhancements, and quality updates across our website and digital delivery
            initiatives.
          </p>
        </header>

        <div className="space-y-6">
          {releaseEntries.map((entry) => (
            <section key={entry.version} className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-light">{entry.version}</h2>
                <span className="text-sm font-medium uppercase tracking-[0.16em] text-light/60">{entry.date}</span>
              </div>
              <ul className="space-y-3 text-base leading-relaxed text-light/85">
                {entry.updates.map((update) => (
                  <li key={update} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </GradientSection>
  </Layout>
);

export default ReleaseNotes;
