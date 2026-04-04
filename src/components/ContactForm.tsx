import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  name: string;
  email: string;
  companySize: string;
  packageInterest: string;
  scopeLevel: string;
  callDate: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  companySize: '',
  packageInterest: '',
  scopeLevel: '',
  callDate: '',
  message: '',
};

const ContactForm = (): JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error' | 'submitting'; message: string }>({
    type: 'idle',
    message: '',
  });

  const companySizeOptions = useMemo(
    () => ['1-10 team members', '11-50 team members', '51-200 team members', '201-500 team members', '500+ team members'],
    [],
  );

  const packageOptions = useMemo(
    () => ['Free Trial', 'Starter', 'Growth', 'Scale', 'Not sure yet'],
    [],
  );

  const scopeOptions = useMemo(
    () => ['Basic app rollout', 'Operational app with dashboards', 'Automation and integrations', 'Enterprise / government workflow'],
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!formValues.name.trim()) nextErrors.name = 'Name is required.';
    if (!formValues.email.trim()) {
      nextErrors.email = 'Business email is required.';
    } else if (!emailPattern.test(formValues.email.trim())) {
      nextErrors.email = 'Enter a valid business email address.';
    }
    if (!formValues.companySize) nextErrors.companySize = 'Please select your company size.';
    if (!formValues.packageInterest) nextErrors.packageInterest = 'Please select a package fit.';
    if (!formValues.scopeLevel) nextErrors.scopeLevel = 'Please select the expected project level.';
    if (!formValues.message.trim()) nextErrors.message = 'Tell us about your project or inquiry.';
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Please review the highlighted fields.' });
      return;
    }

    setStatus({ type: 'submitting', message: '' });

    try {
      const response = await fetch('https://shezzo.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          companySize: formValues.companySize,
          packageInterest: formValues.packageInterest,
          scopeLevel: formValues.scopeLevel,
          callDate: formValues.callDate || null,
          message: formValues.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormValues(initialValues);
      setErrors({});
      setStatus({
        type: 'success',
        message: 'Thanks for reaching out. NeoLabs will respond with the next steps and scheduling options soon.',
      });
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setStatus({
        type: 'error',
        message: 'We could not submit your inquiry right now. Please try again in a moment.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-soft" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Name</span>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
            placeholder="Your name"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Business email</span>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
            placeholder="you@company.com"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Company size</span>
          <select name="companySize" value={formValues.companySize} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary">
            <option value="" disabled>Select size</option>
            {companySizeOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errors.companySize && <p className="text-xs text-red-500">{errors.companySize}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Package fit</span>
          <select name="packageInterest" value={formValues.packageInterest} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary">
            <option value="" disabled>Select package</option>
            {packageOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errors.packageInterest && <p className="text-xs text-red-500">{errors.packageInterest}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Project level</span>
          <select name="scopeLevel" value={formValues.scopeLevel} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary">
            <option value="" disabled>Select level</option>
            {scopeOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errors.scopeLevel && <p className="text-xs text-red-500">{errors.scopeLevel}</p>}
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-700">
        <span className="font-semibold text-slate-900">Preferred call time (optional)</span>
        <input
          type="datetime-local"
          name="callDate"
          value={formValues.callDate}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-700">
        <span className="font-semibold text-slate-900">Project summary</span>
        <textarea
          name="message"
          rows={6}
          value={formValues.message}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
          placeholder="Share the workflows, systems, or business problem you want to improve."
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-slate-500">By sending this form, you allow NeoLabs to contact you about your inquiry and next steps.</p>
        <button type="submit" className="btn-primary min-w-[180px]" disabled={status.type === 'submitting'}>
          {status.type === 'submitting' ? 'Sending...' : 'Send inquiry'}
        </button>
      </div>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {status.type === 'success' && <p className="text-sm font-medium text-primary">{status.message}</p>}
        {status.type === 'error' && <p className="text-sm font-medium text-red-500">{status.message}</p>}
      </div>
    </form>
  );
};

export default ContactForm;
