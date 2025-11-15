import React from 'react';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapatApp from '../assets/images/8dbbfc73-2878-4538-8f5b-2f09dac70db2.png';


/**
 * Testimonials section displaying succinct impact statements from
 * clients.  Each card features the client logo, their name and a
 * one‑sentence quote about the difference NeoLabs made.  Cards use a
 * semi‑transparent background to stand out against the dark page.
 */
const testimonials = [
  {
    name: '1PLS Logistics Solutions',
    logo: logo1pls,
    quote:
      'NeoLabs automated our supply chain analytics and cut report time by 70%.'
  },
  {
    name: 'GPFresh Inc.',
    logo: logoGPFresh,
    quote:
      'Their AI chat agents handle 80% of customer inquiries, freeing our team to focus on growth.'
  },
  {
    name: 'Kiapat App',
   logo: logoKiapatApp,
    quote:
      'The custom ERP dashboard built by NeoLabs transformed our inventory management.'
  }
];

const Reviews = () => (
  <section className="bg-dark py-20" id="reviews">
    <div className="section-container">
      <h2 className="section-title text-center">What Our Clients Say</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((test) => (
          <article
            key={test.name}
            className="rounded-xl bg-white/5 p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-2"
          >
            <img
              src={test.logo}
              alt={`${test.name} logo`}
              className="mx-auto mb-4 h-14 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
            />
            <p className="text-base italic text-light/80">“{test.quote}”</p>
            <p className="mt-4 font-medium text-light">{test.name}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
