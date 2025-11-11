import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  email: string;
  companySize: string;
  scheduleCall: string;
  message: string;
};

type StatusState = 'idle' | 'submitting' | 'success' | 'error';

type Status = {
  state: StatusState;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    companySize: '',
    scheduleCall: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>({ state: 'idle', message: '' });

  const companySizeOptions = useMemo(
    () => [
      '1-10 team members',
      '11-50 team members',
      '51-200 team members',
      '201-500 team members',
      '500+ team members',
    ],
    [],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (status.state !== 'idle') {
      setStatus({ state: 'idle', message: '' });
    }
  };

  const validateForm = () => {
    const validationErrors: FormErrors = {};

    if (!formValues.email.trim()) {
      validationErrors.email = 'Business email is required.';
    } else if (!emailPattern.test(formValues.email.trim())) {
      validationErrors.email = 'Enter a valid business email address.';
    }

    if (!formValues.companySize) {
      validationErrors.companySize = 'Please select your company size.';
    }

    if (!formValues.message.trim()) {
      validationErrors.message = 'Tell us a little about your project or inquiry.';
    }

    return validationErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ state: 'error', message: 'Please review the highlighted fields.' });
      return;
    }

    setStatus({ state: 'submitting', message: '' });

    try {
      const formWebhookURL = import.meta.env.VITE_GOOGLE_FORM_WEBHOOK_URL as string | undefined;

      if (!formWebhookURL) {
        throw new Error('Missing VITE_GOOGLE_FORM_WEBHOOK_URL');
      }

      const response = await fetch(formWebhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formValues.email,
          companySize: formValues.companySize,
          scheduleCall: formValues.scheduleCall,
          message: formValues.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus({
        state: 'success',
        message: 'Thank you for contacting NeoLabs. Our team will reach out to you soon.',
      });

      setFormValues({ email: '', companySize: '', scheduleCall: '', message: '' });
    } catch (error) {
      console.error('Error submitting form data:', error);
      setStatus({
        state: 'error',
        message: 'We were unable to submit your details. Please try again later.',
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`space-y-6 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-8 text-left shadow-xl backdrop-blur${
        className ? ` ${className}` : ''
      }`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      noValidate
    >
      <div className="space-y-1">
        <label className="text-sm font-medium text-light" htmlFor="email">
          Business Email<span className="ml-1 text-primary">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-3 text-base text-light placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
            errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/60'
              : 'border-slate-700/80 bg-slate-900/80 focus:border-primary'
          }`}
          placeholder="you@company.com"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-light" htmlFor="companySize">
          Company Size<span className="ml-1 text-primary">*</span>
        </label>
        <select
          id="companySize"
          name="companySize"
          value={formValues.companySize}
          onChange={handleChange}
          className={`w-full appearance-none rounded-xl border px-4 py-3 text-base text-light focus:outline-none focus:ring-2 focus:ring-primary/60 ${
            errors.companySize
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/60'
              : 'border-slate-700/80 bg-slate-900/80 focus:border-primary'
          }`}
          required
          aria-invalid={Boolean(errors.companySize)}
          aria-describedby={errors.companySize ? 'company-size-error' : undefined}
        >
          <option value="" disabled>
            Select your team size
          </option>
          {companySizeOptions.map((option) => (
            <option key={option} value={option} className="bg-dark text-light">
              {option}
            </option>
          ))}
        </select>
        {errors.companySize && (
          <p id="company-size-error" className="text-sm text-red-400">
            {errors.companySize}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-light" htmlFor="scheduleCall">
          Schedule Call
        </label>
        <select
          id="scheduleCall"
          name="scheduleCall"
          value={formValues.scheduleCall}
          onChange={handleChange}
          className="w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-base text-light focus:outline-none focus:ring-2 focus:ring-primary/60"
          aria-describedby="schedule-call-help"
        >
          <option value="" disabled>
            Let us know if you want to schedule a call
          </option>
          <option value="Yes, please schedule a call" className="bg-dark text-light">
            Yes, please schedule a call
          </option>
          <option value="No, email follow-up is fine" className="bg-dark text-light">
            No, email follow-up is fine
          </option>
        </select>
        <p id="schedule-call-help" className="text-xs text-light/60">
          Choose your preferred follow-up option. We'll coordinate the details in our reply.
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-light" htmlFor="message">
          Message / Inquiry<span className="ml-1 text-primary">*</span>
          <span
            className="ml-2 cursor-help text-xs font-normal text-light/60"
            title="Include your preferred call time or mobile number in the message if you'd like a direct message or call."
          >
            Need a direct message or call?
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formValues.message}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-3 text-base text-light placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/60'
              : 'border-slate-700/80 bg-slate-900/80 focus:border-primary'
          }`}
          placeholder="Share project goals, timelines, or technologies you're exploring."
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <motion.button
        type="submit"
        className="w-full rounded-xl bg-primary px-6 py-3 text-center text-base font-semibold text-dark transition hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-70"
        whileTap={{ scale: 0.98 }}
        disabled={status.state === 'submitting'}
      >
        {status.state === 'submitting' ? 'Sending…' : 'Submit'}
      </motion.button>

      <p className="text-xs text-light/60">
        By submitting this form, you agree to receive updates and communications from NeoLabs related to services and offers.
      </p>

      <div className="min-h-[1.5rem]" aria-live="polite">
        {status.state === 'success' && (
          <p className="text-sm font-medium text-primary/90">{status.message}</p>
        )}
        {status.state === 'error' && <p className="text-sm text-red-400">{status.message}</p>}
      </div>
    </motion.form>
  );
};

export default ContactForm;
