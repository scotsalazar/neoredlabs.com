import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  email: string;
  companySize: string;
  callDate: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

type Status = {
  state: SubmissionState;
  message: string;
};

const initialValues: FormValues = {
  email: '',
  companySize: '',
  callDate: '',
  message: '',
};

const ContactForm = (): JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;

    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setErrors((prev) => ({ ...prev, [fieldName]: '' }));

    if (status.state === 'error') {
      setStatus({ state: 'idle', message: '' });
    }
  };

  const validateForm = (): FormErrors => {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ state: 'error', message: 'Please review the highlighted fields.' });
      return;
    }

    setStatus({ state: 'submitting', message: '' });

    const payload: Record<string, string> = {
      email: formValues.email,
      companySize: formValues.companySize,
      message: formValues.message,
    };

    if (formValues.callDate) {
      payload.callDate = formValues.callDate;
    }

    try {
      const response = await fetch('https://shezzo.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus({
        state: 'success',
        message: 'Thank you for contacting NeoLabs. Our team will reach out to you soon.',
      });

      setFormValues(initialValues);
      setErrors({});
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
      className="space-y-6 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-8 text-left shadow-xl backdrop-blur"
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
        <label className="text-sm font-medium text-light" htmlFor="callDate">
          Preferred Call Time <span className="text-light/60">(Optional)</span>
        </label>
        <input
          id="callDate"
          name="callDate"
          type="datetime-local"
          value={formValues.callDate}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-3 text-base text-light focus:outline-none focus:ring-2 focus:ring-primary/60 ${
            errors.callDate
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/60'
              : 'border-slate-700/80 bg-slate-900/80 focus:border-primary'
          }`}
          aria-invalid={Boolean(errors.callDate)}
          aria-describedby={errors.callDate ? 'call-date-error' : undefined}
        />
        {errors.callDate && (
          <p id="call-date-error" className="text-sm text-red-400">
            {errors.callDate}
          </p>
        )}
        <p className="text-xs text-light/60">
          Select a time that works best for you. We'll confirm or propose alternatives in our reply.
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
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-200">
            <svg
              className="h-4 w-4 text-emerald-300"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 0 1 0 1.42l-7.5 7.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.42l2.793 2.793 6.793-6.793a1 1 0 0 1 1.414 0Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}
        {status.state === 'error' && <p className="text-sm text-red-400">{status.message}</p>}
      </div>
    </motion.form>
  );
};

export default ContactForm;
