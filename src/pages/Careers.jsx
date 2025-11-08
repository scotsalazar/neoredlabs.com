import React from 'react';
import Layout from '../components/Layout.jsx';

/**
 * Simplified careers page that focuses on the most important
 * responsibilities for each role.  It introduces the company
 * succinctly, uses a badge style header to signal that hiring is
 * active and offers clear calls‑to‑action for applicants.
 */
const jobOpenings = [
  {
    title: 'Software Engineer',
    bullets: [
      'Build and scale modern applications',
      'Utilize critical thinking and problem‑solving skills',
      'Deploy features fast with end‑to‑end ownership',
      'Bonus: Familiarity with LLMs & AI model training'
    ]
  },
  {
    title: 'Marketing Specialist',
    bullets: [
      'Develop modern, data‑driven marketing campaigns',
      'Collaborate with sales team for strategy alignment',
      'Build the company’s digital presence and brand'
    ]
  },
  {
    title: 'Sales Executive',
    bullets: [
      'Handle leads and close deals effectively',
      'Manage and grow client relationships',
      'Commission‑based rewards for successful contracts'
    ]
  }
];

const Careers = () => (
  <Layout
    title="Careers | Neo Labs"
    description="Explore open roles at Neo Labs and join a modern AI startup shaping the next generation of intelligent apps."
  >
    <section className="bg-light py-16">
      <div className="section-container text-center">
        <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-2 text-xs font-medium text-white">
          Now Hiring
        </span>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Join a modern AI startup shaping the next generation of intelligent apps.
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {jobOpenings.map((job) => (
            <article
              key={job.title}
              className="flex flex-col rounded-xl bg-white p-6 shadow-md shadow-slate-900/5"
            >
              <h2 className="text-2xl font-semibold text-dark">{job.title}</h2>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">
                Key Responsibilities
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-left text-base text-slate-700">
                {job.bullets.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
          <a
            href="mailto:careers@neolabs.com?subject=Application"
            className="btn-primary"
          >
            Apply Now
          </a>
          <a
            href="mailto:careers@neolabs.com"
            className="btn-primary bg-secondary"
          >
            Send Resume
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default Careers;