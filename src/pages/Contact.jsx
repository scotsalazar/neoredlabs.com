import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import useAvailability from '../hooks/useAvailability.js';
import { bookSlotForDate } from '../lib/services/availability.js';

/**
 * Contact page providing multiple ways to get in touch with the NeoLabs
 * team.  Email addresses use the new domain and clearly label
 * contact types.
 */
const Contact = () => {
  const [bookingForm, setBookingForm] = useState({
    date: '',
    slot: '',
    name: '',
    company: '',
    email: '',
    contactNumber: '',
  });
  const [bookingErrors, setBookingErrors] = useState({});
  const [bookingFeedback, setBookingFeedback] = useState({
    submitting: false,
    message: '',
    isError: false,
  });
  const [formValues, setFormValues] = useState({
    name: '',
    company: '',
    mobile: '',
    email: '',
    message: '',
  });
  const [formFeedback, setFormFeedback] = useState({
    submitting: false,
    message: '',
    isError: false,
  });

  const { availableSlots, bookedSlots, loading: availabilityLoading, error: availabilityError, refresh } =
    useAvailability(bookingForm.date);

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'date' ? { slot: '' } : {}),
    }));
    setBookingErrors((prev) => ({
      ...prev,
      [name]: '',
      ...(name === 'date' ? { slot: '' } : {}),
    }));
    setBookingFeedback((prev) => ({
      ...prev,
      message: '',
      isError: false,
    }));
  };

  const validateBookingForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[+]?[-()\s\d]{7,}$/;

    if (!bookingForm.date) {
      errors.date = 'Please choose a preferred date.';
    }
    if (!bookingForm.slot) {
      errors.slot = 'Please choose an available time slot.';
    }
    if (!bookingForm.name.trim()) {
      errors.name = 'Your name is required.';
    }
    if (!bookingForm.email.trim()) {
      errors.email = 'An email address is required.';
    } else if (!emailPattern.test(bookingForm.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!bookingForm.contactNumber.trim()) {
      errors.contactNumber = 'A contact number is required.';
    } else if (!phonePattern.test(bookingForm.contactNumber)) {
      errors.contactNumber = 'Enter a valid phone number (including country code if applicable).';
    }

    return errors;
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    const errors = validateBookingForm();
    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      setBookingFeedback({
        submitting: false,
        message: 'Please review the highlighted fields before submitting.',
        isError: true,
      });
      return;
    }

    setBookingErrors({});
    setBookingFeedback({ submitting: true, message: '', isError: false });

    try {
      const bookingResponse = await bookSlotForDate({
        date: bookingForm.date,
        slot: bookingForm.slot,
        name: bookingForm.name.trim(),
        company: bookingForm.company.trim(),
        email: bookingForm.email.trim(),
        contactNumber: bookingForm.contactNumber.trim(),
      });

      setBookingFeedback({
        submitting: false,
        message: `Your 30-minute meeting on ${bookingResponse.date} at ${bookingResponse.slot} is confirmed. We'll reach out at ${bookingResponse.email} soon.`,
        isError: false,
      });
      setBookingForm({
        date: '',
        slot: '',
        name: '',
        company: '',
        email: '',
        contactNumber: '',
      });
      await refresh(bookingResponse.date);
    } catch (error) {
      setBookingFeedback({
        submitting: false,
        message: error?.message || 'We could not book your meeting. Please try again.',
        isError: true,
      });
      if (bookingForm.date) {
        await refresh(bookingForm.date);
      }
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    setFormFeedback({ submitting: true, message: '', isError: false });

    const { name, company, mobile, email, message } = formValues;
    const subject = `Question from ${name || 'Website Visitor'}`;
    const bodyLines = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Mobile Number: ${mobile}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ];
    const mailtoLink = `mailto:info@neoredlabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    try {
      window.location.href = mailtoLink;
      setFormFeedback({
        submitting: false,
        message: 'Thanks! Your email client should now be opening so you can send your question.',
        isError: false,
      });
    } catch (error) {
      setFormFeedback({
        submitting: false,
        message: 'We could not open your email client. Please reach out directly at info@neoredlabs.com.',
        isError: true,
      });
    }
  };

  return (
    <Layout
      title="Contact Us | NeoLabs"
      description="Reach out to NeoLabs for partnerships, media enquiries or general information."
    >
      <section className="bg-dark py-20">
        <div className="section-container max-w-3xl space-y-16 text-left">
          <div className="text-center">
            <h1 className="section-title">Contact Us</h1>
            <p className="mt-6 text-lg leading-relaxed text-light/80">
              We'd love to hear from you. Whether you're interested in our
              services, have a media enquiry, or would like to partner with us,
              please get in touch using the details below.
            </p>
            <div className="mt-10 space-y-4 text-left">
              <p>
                <span className="font-medium text-light">General:</span>{' '}
                <a href="mailto:info@neoredlabs.com" className="text-primary hover:underline">
                  info@neoredlabs.com
                </a>
              </p>
              <p>
                <span className="font-medium text-light">Media:</span>{' '}
                <a href="mailto:media@neoredlabs.com" className="text-primary hover:underline">
                  media@neoredlabs.com
                </a>
              </p>
              <p>
                <span className="font-medium text-light">Partnerships:</span>{' '}
                <a href="mailto:partnerships@neoredlabs.com" className="text-primary hover:underline">
                  partnerships@neoredlabs.com
                </a>
              </p>
            </div>
          </div>

          <section id="schedule-call" className="space-y-6 rounded-2xl bg-slate-900/40 p-8 shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-light">Schedule a Call</h2>
              <p className="mt-2 text-sm text-light/80" id="schedule-call-description">
                Choose a date, time, and share your contact details. We’ll confirm your meeting and follow up shortly after booking.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleBookingSubmit} noValidate>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Preferred date *</span>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleBookingChange}
                    className={`rounded-lg border bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                      bookingErrors.date ? 'border-red-500 focus:ring-red-500/60' : 'border-slate-700'
                    }`}
                    aria-describedby="schedule-call-description"
                    aria-invalid={Boolean(bookingErrors.date)}
                    required
                  />
                  {bookingErrors.date && <span className="text-xs text-red-400">{bookingErrors.date}</span>}
                </label>
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Available time slots *</span>
                  <select
                    name="slot"
                    value={bookingForm.slot}
                    onChange={handleBookingChange}
                    disabled={!bookingForm.date || availabilityLoading}
                    className={`rounded-lg border bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                      bookingErrors.slot ? 'border-red-500 focus:ring-red-500/60' : 'border-slate-700'
                    } ${!bookingForm.date ? 'cursor-not-allowed opacity-70' : ''}`}
                    aria-invalid={Boolean(bookingErrors.slot)}
                    required
                  >
                    <option value="" disabled>
                      {bookingForm.date ? 'Select a time slot' : 'Choose a date first'}
                    </option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                    {bookedSlots.length > 0 && (
                      <optgroup label="Unavailable">
                        {bookedSlots.map((slot) => (
                          <option key={`booked-${slot}`} value={slot} disabled>
                            {`${slot} (Booked)`}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                  {bookingErrors.slot && <span className="text-xs text-red-400">{bookingErrors.slot}</span>}
                  {availabilityLoading && <span className="text-xs text-light/60">Checking availability…</span>}
                  {availabilityError && !availabilityLoading && (
                    <span className="text-xs text-red-400">{availabilityError}</span>
                  )}
                  {!availabilityLoading && bookingForm.date && availableSlots.length === 0 && bookedSlots.length > 0 && (
                    <span className="text-xs text-light/60">All time slots for this date are currently booked.</span>
                  )}
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleBookingChange}
                    className={`rounded-lg border bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                      bookingErrors.name ? 'border-red-500 focus:ring-red-500/60' : 'border-slate-700'
                    }`}
                    aria-invalid={Boolean(bookingErrors.name)}
                    required
                  />
                  {bookingErrors.name && <span className="text-xs text-red-400">{bookingErrors.name}</span>}
                </label>
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Company (optional)</span>
                  <input
                    type="text"
                    name="company"
                    value={bookingForm.company}
                    onChange={handleBookingChange}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleBookingChange}
                    className={`rounded-lg border bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                      bookingErrors.email ? 'border-red-500 focus:ring-red-500/60' : 'border-slate-700'
                    }`}
                    aria-invalid={Boolean(bookingErrors.email)}
                    required
                  />
                  {bookingErrors.email && <span className="text-xs text-red-400">{bookingErrors.email}</span>}
                </label>
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Contact number *</span>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={bookingForm.contactNumber}
                    onChange={handleBookingChange}
                    className={`rounded-lg border bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                      bookingErrors.contactNumber ? 'border-red-500 focus:ring-red-500/60' : 'border-slate-700'
                    }`}
                    aria-invalid={Boolean(bookingErrors.contactNumber)}
                    required
                  />
                  {bookingErrors.contactNumber && (
                    <span className="text-xs text-red-400">{bookingErrors.contactNumber}</span>
                  )}
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-dark transition hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  disabled={bookingFeedback.submitting || availabilityLoading}
                >
                  {bookingFeedback.submitting ? 'Booking your meeting…' : 'Confirm 30-minute meeting'}
                </button>
                <p
                  className={`text-sm ${bookingFeedback.isError ? 'text-red-400' : 'text-light/80'}`}
                  role="status"
                  aria-live="polite"
                >
                  {bookingFeedback.message || 'Fields marked with * are required to schedule a call.'}
                </p>
              </div>
            </form>
          </section>

          <section className="space-y-6 rounded-2xl bg-slate-900/40 p-8 shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-light">Send a Question</h2>
              <p className="mt-2 text-sm text-light/80">
                Complete the form below and we'll draft an email to info@neoredlabs.com so you can review it before sending.
              </p>
            </div>
            <form className="grid gap-6" onSubmit={handleQuestionSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Name *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formValues.name}
                    onChange={handleFormChange}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Company</span>
                  <input
                    type="text"
                    name="company"
                    value={formValues.company}
                    onChange={handleFormChange}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Mobile Number *</span>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formValues.mobile}
                    onChange={handleFormChange}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
                <label className="flex flex-col gap-2 text-light">
                  <span className="text-sm font-medium">Email *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formValues.email}
                    onChange={handleFormChange}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-light">
                <span className="text-sm font-medium">Message *</span>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formValues.message}
                  onChange={handleFormChange}
                  className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-dark transition hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  disabled={formFeedback.submitting}
                >
                  {formFeedback.submitting ? 'Preparing email…' : 'Send your question'}
                </button>
                <p
                  className={`text-sm ${formFeedback.isError ? 'text-red-400' : 'text-light/80'}`}
                  role="status"
                  aria-live="polite"
                >
                  {formFeedback.message || 'All fields marked with * are required.'}
                </p>
              </div>
            </form>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
