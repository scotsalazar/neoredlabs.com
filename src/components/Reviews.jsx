import React from 'react';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapat from '../assets/images/logo-kiapat.png';

/**
 * Testimonials section displaying succinct impact statements from
 * clients.  Each card features the client logo, their name and a
 * one‑sentence quote about the difference Neo Labs made.
 */
const testimonials = [
  {
    name: '1PLS Logistics Solutions',
    logo: logo1pls,
    quote: 'Neo Labs automated our supply chain analytics and cut report time by 70%.'
  },
  {
    name: 'GPFresh Inc.',
    logo: logoGPFresh,
    quote: 'Their AI chat agents handle 80% of customer inquiries, freeing our team to focus on growth.'
  },
  {
    name: 'Kiapat App',
    logo: logoKiapat,
    quote: 'The custom ERP dashboard built by Neo Labs transformed our inventory management.'
  }
];

const Reviews = () => (
  <section className="bg-light py-16" id="reviews">
    <div className="section-container">
      <h2 className="section-title text-center">What Our Clients Say</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((test) => (
          <article
            key={test.name}
            className="rounded-xl bg-white p-6 text-center shadow-md transition-transform duration-200 hover:-translate-y-1"
          >
            <img
              src={test.logo}
              alt={`${test.name} logo`}
              className="mx-auto mb-4 h-12 w-auto object-contain"
            />
            <p className="text-base italic text-slate-700">“{test.quote}”</p>
            <p className="mt-4 font-medium text-dark">{test.name}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;