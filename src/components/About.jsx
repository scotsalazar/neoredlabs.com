import React from 'react';
import flag from '../assets/images/philippines-flag.png';
import aboutImage from '../assets/images/about.png';

const values = [
  {
    title: 'Innovation & R&D',
    description:
      'We invest in research and development to bring new ideas to life and continuously improve our products and services.'
  },
  {
    title: 'Digital Transformation',
    description:
      'Our work reimagines business processes and customer experiences using modern digital technologies, helping organisations adapt.'
  },
  {
    title: 'Collaboration & Excellence',
    description:
      'We foster a culture of collaboration, continuous learning and excellence, empowering every team member to contribute their best.'
  }
];

const About = () => (
  <section className="bg-light py-16" id="about">
    <div className="section-container">
      <h2 className="section-title">Who We Are</h2>
      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
        <div className="space-y-6 text-lg leading-relaxed text-slate-700">
          <p>
            Neo&nbsp;Redlabs is a technology company based in the Philippines
            <img
              src={flag}
              alt="Philippine flag"
              className="ml-2 inline h-5 w-5 align-middle"
              loading="lazy"
              decoding="async"
            />
            , dedicated to innovation, research &amp; development and digital transformation. We combine systematic R&amp;D that turns
            ideas into reality with a customer-centric approach to modernising organisations.
          </p>
          <p>
            By reimagining how businesses operate and engage with customers using digital technologies, we help partners deliver
            meaningful solutions and stay ahead in a rapidly evolving world.
          </p>
        </div>
        <img
          src={aboutImage}
          alt="Team collaboration in the Neo Redlabs office"
          className="mx-auto w-full max-w-md rounded-xl shadow-lg"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-16">
        <h3 className="text-center text-2xl font-heading font-semibold text-dark md:text-3xl">Our Values</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-xl bg-white p-6 text-center shadow-md transition-transform duration-200 hover:-translate-y-1"
            >
              <h4 className="text-xl font-heading font-semibold text-dark">{value.title}</h4>
              <p className="mt-3 text-base text-slate-700">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
