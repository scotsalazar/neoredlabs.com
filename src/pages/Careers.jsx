import React, { useState } from 'react';
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
      'Utilise critical thinking and problem‑solving skills',
      'Deploy features fast with end‑to‑end ownership',
      'Bonus: Familiarity with LLMs & AI model training'
    ]
  },
  {
    title: 'Marketing Specialist',
    bullets: [
      'Develop modern, data‑driven marketing campaigns',
      'Collaborate with sales team for strategy alignment',
      'Build the company’s digital presence and brand',
      'Explore and co-develop AI-powered marketing tools to enhance campaign efficiency and engagement'
    ]
  },
  {
    title: 'Sales Executive',
    bullets: [
      'Handle leads and close deals effectively',
      'Manage and grow client relationships',
      'Commission‑based rewards for successful contracts',
      'Identify and pursue sales opportunities for software applications and AI-driven products'
    ]
  }
];

const Careers = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <Layout
      title="Careers | NeoLabs"
      description="Explore open roles at NeoLabs and join a modern AI startup shaping the next generation of intelligent apps."
    >
      <section className="bg-dark py-20">
        <div className="section-container text-center">
          <span className="mb-6 inline-block rounded-full bg-secondary px-5 py-2 text-xs font-medium text-dark uppercase tracking-wider">
            Now Hiring
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-light">
            Join a modern AI startup shaping the next generation of intelligent apps.
          </h1>
          <p className="mt-4 text-base text-light/80">
            Share a few details to begin a short, AI-powered conversation tailored to your role.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {jobOpenings.map((job) => (
              <article
                key={job.title}
                className="flex flex-col rounded-xl bg-white/5 p-8 shadow-lg"
              >
                <h2 className="text-2xl font-heading font-semibold text-light">
                  {job.title}
                </h2>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">
                  Key Responsibilities
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-left text-base text-light/80">
                  {job.bullets.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowApplicationForm(true)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-xl rounded-2xl bg-dark p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">AI interview pre-step</p>
                <h2 className="mt-2 text-2xl font-heading font-semibold text-light">Tell us about you</h2>
                <p className="mt-2 text-sm text-light/70">
                  This quick form helps us tailor the upcoming AI-led conversation. We will add the AI backend next.
                </p>
              </div>
              <button
                type="button"
                className="text-light/60 transition hover:text-secondary"
                aria-label="Close application form"
                onClick={() => setShowApplicationForm(false)}
              >
                ✕
              </button>
            </div>

            <form
              className="mt-6 space-y-5 text-left"
              onSubmit={(event) => {
                event.preventDefault();
                setShowApplicationForm(false);
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-light/80">
                  <span className="block font-semibold text-light">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Alex Johnson"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light placeholder:text-light/40 focus:border-secondary focus:outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-light/80">
                  <span className="block font-semibold text-light">Position</span>
                  <select
                    name="position"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light focus:border-secondary focus:outline-none"
                  >
                    <option value="" disabled hidden>
                      Select a role
                    </option>
                    <option>Software Engineer</option>
                    <option>Marketing Specialist</option>
                    <option>Sales Executive</option>
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-sm text-light/80">
                <span className="block font-semibold text-light">Upload CV</span>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full cursor-pointer rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-3 text-light file:mr-4 file:rounded file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-semibold file:text-dark hover:border-secondary"
                />
                <span className="block text-xs text-light/60">PDF or Word documents are welcome.</span>
              </label>

              <fieldset className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <legend className="px-2 text-sm font-semibold text-light">How would you like to connect?</legend>
                <p className="text-xs text-light/60">
                  Choose whether to speak with a voice AI agent or chat with a text-based assistant.
                </p>
                <div className="mt-2 grid gap-3 md:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light/80 transition hover:border-secondary">
                    <input type="radio" name="conversationMode" value="voice" required />
                    <div>
                      <p className="font-semibold text-light">Voice conversation</p>
                      <p className="text-xs text-light/60">Talk with an AI agent for a quick screen.</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-light/80 transition hover:border-secondary">
                    <input type="radio" name="conversationMode" value="text" required />
                    <div>
                      <p className="font-semibold text-light">Text chat</p>
                      <p className="text-xs text-light/60">Chat with an AI chatbot about your experience.</p>
                    </div>
                  </label>
                </div>
              </fieldset>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="btn-primary">
                  Start AI pre-screen
                </button>
                <button
                  type="button"
                  className="btn-primary bg-white/10 text-light hover:bg-white/20"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Cancel
                </button>
                <span className="text-xs text-light/60">We will connect this flow to the AI backend soon.</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Careers;