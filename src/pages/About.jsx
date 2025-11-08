import React from 'react';
import Layout from '../components/Layout.jsx';
import AboutSection from '../components/About.jsx';
import Services from '../components/Services.jsx';

const milestones = [
  {
    year: '2019',
    title: 'Founded Neo Redlabs',
    description:
      'We began our journey with a mission to combine research and practical delivery for organisations embracing digital transformation.'
  },
  {
    year: '2021',
    title: 'Expanded Delivery Capabilities',
    description:
      'Our cross-functional delivery teams grew to include strategists, engineers and designers supporting partners in diverse industries.'
  },
  {
    year: '2024',
    title: 'Scaling Intelligent Solutions',
    description:
      'We now prototype and deploy AI-powered experiences that help businesses innovate faster and deliver better customer outcomes.'
  }
];

const About = () => (
  <Layout
    title="About Neo Redlabs"
    description="Learn about Neo Redlabs, our mission, values, and the milestones that shaped our approach to innovation and digital transformation."
  >
    <section className="bg-gradient-to-r from-dark via-secondary/70 to-primary/80 py-20 text-white">
      <div className="section-container max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Innovation with Purpose</h1>
        <p className="mt-6 text-lg leading-relaxed text-white/90">
          Neo&nbsp;Redlabs is driven by curiosity and a commitment to make emerging technologies accessible. We partner with organisations to
          shape ideas into tangible products that empower people and create lasting impact.
        </p>
      </div>
    </section>

    <AboutSection />

    <section className="bg-white py-16">
      <div className="section-container">
        <h2 className="section-title">Our Journey</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {milestones.map((milestone) => (
            <article
              key={milestone.year}
              className="rounded-2xl border border-slate-200 bg-light p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{milestone.year}</p>
              <h3 className="mt-3 text-xl font-semibold text-dark">{milestone.title}</h3>
              <p className="mt-4 text-base text-slate-700">{milestone.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="section-container max-w-4xl text-center">
        <h2 className="section-title">How We Deliver</h2>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          Collaboration is at the heart of every engagement. We combine strategy, product thinking and experimentation so that the solutions we
          build today continue to evolve tomorrow.
        </p>
      </div>
    </section>

    <Services />
  </Layout>
);

export default About;
