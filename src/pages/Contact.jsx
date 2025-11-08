import React from 'react';
import Layout from '../components/Layout.jsx';
import contactImage from '../assets/images/contact.png';
import flag from '../assets/images/philippines-flag.png';

const Contact = () => (
  <Layout
    title="Contact Neo Redlabs"
    description="Contact Neo Redlabs to discuss projects, partnerships or career opportunities. We'd love to hear from you."
    image={contactImage}
  >
    <section className="relative overflow-hidden py-20">
      <img
        src={contactImage}
        alt="Contact banner"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-dark/80" aria-hidden="true" />
      <div className="relative z-10 section-container max-w-4xl text-center text-white">
        <h1 className="text-3xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mt-6 text-lg leading-relaxed text-white/90">
          We partner with teams ready to build, experiment and create meaningful change. Share your vision—we are excited to explore how we can collaborate.
        </p>
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="section-container grid gap-12 md:grid-cols-[1.1fr,0.9fr] md:items-start">
        <div className="rounded-2xl bg-light p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-dark">Corporate Headquarters</h2>
          <p className="mt-4 flex items-center gap-2 text-base text-slate-700">
            Makati City, Metro Manila, Philippines
            <img
              src={flag}
              alt="Philippine flag"
              className="h-5 w-5"
              loading="lazy"
              decoding="async"
            />
          </p>
          <p className="mt-4 text-base text-slate-700">
            Email:{' '}
            <a href="mailto:info@neoredlabs.com" className="font-medium">
              info@neoredlabs.com
            </a>
          </p>
          <p className="mt-2 text-base text-slate-700">
            Phone:{' '}
            <a href="tel:+630212345678" className="font-medium">
              +63 (02) 1234 5678
            </a>
          </p>
          <p className="mt-2 text-base text-slate-700">
            Office Hours: Monday – Friday, 9:00&nbsp;AM – 6:00&nbsp;PM (Asia/Manila)
          </p>
          <div className="mt-6 rounded-xl bg-white p-4 shadow-inner">
            <h3 className="text-lg font-semibold text-dark">Project Enquiries</h3>
            <p className="mt-2 text-sm text-slate-600">
              Tell us about your challenge—product builds, integrations, AI experimentation or no-code delivery. We respond within two working days.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-dark">Send Us a Message</h2>
          <p className="mt-3 text-base text-slate-600">
            Complete the form and we will reply shortly. Submissions are delivered securely to our team inbox.
          </p>
          <form
            className="mt-8 space-y-5"
            action="https://docs.google.com/forms/d/e/1FAIpQLScT4Lf5Ldkyp1gD6dUScItgxMWTb52kAy8zpPezglSWVfzr-Q/formResponse"
            method="POST"
            target="_blank"
          >
            <div>
              <label className="block text-sm font-medium text-dark" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="entry.1845715320"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="entry.1634268134"
                type="email"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                name="entry.1852400455"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="entry.1322903222"
                rows="4"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Share the details of your enquiry"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <section className="bg-light py-12">
      <div className="section-container grid gap-8 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-dark">Partnerships</h3>
          <p className="mt-3 text-sm text-slate-600">
            Interested in collaborating or co-developing a solution? Email{' '}
            <a href="mailto:partnerships@neoredlabs.com" className="font-medium">
              partnerships@neoredlabs.com
            </a>
            .
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-dark">Careers</h3>
          <p className="mt-3 text-sm text-slate-600">
            Explore open roles and internships on our careers page. Questions? Reach us at{' '}
            <a href="mailto:careers@neoredlabs.com" className="font-medium">
              careers@neoredlabs.com
            </a>
            .
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-dark">Media & Events</h3>
          <p className="mt-3 text-sm text-slate-600">
            For press kits, speaking opportunities and media enquiries contact{' '}
            <a href="mailto:media@neoredlabs.com" className="font-medium">
              media@neoredlabs.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
