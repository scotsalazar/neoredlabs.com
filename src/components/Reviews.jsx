import React from 'react';

const testimonials = [
  {
    name: '1PLS Logistics Solutions',
    quote: 'NeoLabs helped tighten reporting and workflow visibility so our operations team could move faster with less manual follow-up.',
  },
  {
    name: 'GPFresh Inc.',
    quote: 'Their team understood the business side, not just the code. The result felt like a system built around how we actually work.',
  },
  {
    name: 'Kiapat App',
    quote: 'The delivery approach was structured, responsive, and premium without being impractical. That balance mattered to us.',
  }
];

const Reviews = () => (
  <section className="bg-slate-950 text-white">
    <div className="section-container py-20">
      <div className="max-w-2xl">
        <p className="eyebrow border-white/10 bg-white/5 text-slate-200">Client perspective</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          The work should feel dependable, not experimental.
        </h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="flex h-full flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/5 p-8">
            <p className="text-lg leading-8 text-slate-200">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{item.name}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
