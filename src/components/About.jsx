import React from 'react';
import flag from '../assets/images/philippines-flag.png';
import collaboration from '../assets/images/meeting.png';
import integration from '../assets/images/integration.png';
import ai from '../assets/images/ai.png';

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

const expertise = [
  {
    title: 'Collaborative Culture',
    description:
      'Innovation thrives in collaborative settings. Our cross-functional teams bring together engineers, designers and strategists to deliver holistic solutions.',
    image: collaboration,
    alt: 'Business meeting'
  },
  {
    title: 'App Integration',
    description:
      'Connect your favourite apps and services effortlessly. We design integrations that streamline workflows and help organisations maximise modern software ecosystems.',
    image: integration,
    alt: 'Integration diagram'
  },
  {
    title: 'AI Integration',
    description:
      'Harness the power of artificial intelligence—from predictive analytics to intelligent automation—to unlock new opportunities.',
    image: ai,
    alt: 'AI integration'
  }
];

const About = () => (
  <section className="bg-light py-16" id="about">
    <div className="section-container">
      <h2 className="section-title">Who We Are</h2>
      <div className="mt-8 space-y-8 text-lg leading-relaxed">
        <p>
          Neo&nbsp;Redlabs is a technology company based in the Philippines
          <img
            src={flag}
            alt="Philippine flag"
            className="ml-2 inline h-5 w-5 align-middle"
          />
          , dedicated to innovation, research &amp; development and digital transformation. We combine the power of research and
          development—systematic activities that allow companies to innovate and create new products or improve existing ones—with
          a customer-centric approach to digital transformation.
        </p>
        <p>
          By reimagining how businesses operate and engage with customers using digital technologies, we stay ahead of the
          competition while delivering meaningful solutions.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-lg bg-white p-6 shadow-md transition-transform duration-200 hover:-translate-y-1"
          >
            <h4 className="text-xl font-semibold text-dark">{value.title}</h4>
            <p className="mt-3 text-base text-slate-700">{value.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <h3 className="section-title">Our Expertise</h3>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {expertise.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-200 hover:-translate-y-1"
            >
              <img src={item.image} alt={item.alt} className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-6 text-center">
                <h4 className="text-xl font-semibold text-dark">{item.title}</h4>
                <p className="mt-3 text-base text-slate-700">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
