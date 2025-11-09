import React, { useMemo, useState } from 'react';
import Layout from '../components/Layout.jsx';

/**
 * Contact page providing multiple ways to get in touch with the NeoLabs
 * team.  Email addresses use the new domain and clearly label
 * contact types.
 */
const Contact = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [meetingStatus, setMeetingStatus] = useState('');
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

  const timeSlots = useMemo(() => {
    const slots = [];
    const start = 9 * 60; // 9:00 AM
    const end = 17 * 60; // 5:00 PM
    for (let minutes = start; minutes < end; minutes += 30) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const nextMinutes = minutes + 30;
      const nextHours = Math.floor(nextMinutes / 60);
      const nextMins = nextMinutes % 60;
      const label = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} - ${String(nextHours).padStart(2, '0')}:${String(nextMins).padStart(2, '0')}`;
      slots.push(label);
    }
    return slots;
  }, []);

  const resetMeetingStatus = () => setMeetingStatus('');

  const handleConfirmMeeting = () => {
    if (!selectedDate || !selectedSlot) {
      return;
    }
    const message = `We'll be in touch to confirm your ${selectedSlot} meeting on ${selectedDate}.`;
    setMeetingStatus(message);
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
              <p
                className="mt-2 text-sm text-light/80"
                id="schedule-call-description"
              >
                Choose a date and a 30-minute slot that works for you. All inputs are fully accessible and you can navigate with your keyboard.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-light">
                <span className="text-sm font-medium">Preferred date</span>
                <input
                  type="date"
                  className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                  aria-describedby="schedule-call-description"
                  value={selectedDate}
                  onChange={(event) => {
                    resetMeetingStatus();
                    setSelectedDate(event.target.value);
                  }}
                />
              </label>
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-light">Available time slots</legend>
                <p className="text-xs text-light/60">
                  Use the arrow keys to move between options and press space to select a time.
                </p>
                <div className="flex flex-wrap gap-2" role="list">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        role="listitem"
                        onClick={() => {
                          resetMeetingStatus();
                          setSelectedSlot(slot);
                        }}
                        className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                          isSelected
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-slate-700 bg-slate-950/60 text-light hover:border-primary/60'
                        }`}
                        aria-pressed={isSelected}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-dark transition hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/60 sm:w-auto"
                onClick={handleConfirmMeeting}
                disabled={!selectedDate || !selectedSlot}
              >
                Confirm 30-minute meeting
              </button>
              <p className="text-sm text-light/80" aria-live="polite">
                {meetingStatus || 'Select a date and time to enable confirmation.'}
              </p>
            </div>
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
