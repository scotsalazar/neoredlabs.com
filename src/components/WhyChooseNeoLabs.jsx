import React from 'react';
import { Link } from 'react-router-dom';
import GradientSection from './GradientSection.jsx';

const iconClasses = 'h-7 w-7 stroke-[1.5]';

const CpuChipIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={iconClasses}
    aria-hidden="true"
    {...props}
  >
    <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" />
    <path d="M9 4.5V6m3-1.5V6m3-1.5V6M9 18v1.5m3-1.5V20m3-1.5V20M4.5 9H6m-1.5 3H6m-1.5 3H6m12 0h1.5m-1.5-3h1.5m-1.5-3h1.5" />
  </svg>
);

const AdjustmentsHorizontalIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={iconClasses}
    aria-hidden="true"
    {...props}
  >
    <path d="M3.75 8.25h10.5M3.75 15.75h10.5" />
    <path d="M14.25 8.25A2.25 2.25 0 1 1 9.75 8.25a2.25 2.25 0 0 1 4.5 0Zm0 7.5a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0Z" />
    <path d="M19.5 6v4.5M19.5 13.5V18" />
  </svg>
);

const SparklesIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={iconClasses}
    aria-hidden="true"
    {...props}
  >
    <path d="M12 3.75 13.5 9 18.75 10.5 13.5 12 12 17.25 10.5 12 5.25 10.5 10.5 9Z" />
    <path d="M6.75 5.25 6 7.5 3.75 8.25 6 9 6.75 11.25 7.5 9 9.75 8.25 7.5 7.5Z" />
    <path d="M17.25 12.75 16.5 15l-2.25.75L16.5 16.5l.75 2.25.75-2.25 2.25-.75-2.25-.75Z" />
  </svg>
);

const LifebuoyIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={iconClasses}
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="12" cy="12" r="3.75" />
    <path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" />
    <path d="m6.4 6.4 2.1 2.1m8.1 8.1 2.1 2.1M6.4 17.6l2.1-2.1m8.1-8.1 2.1-2.1" />
  </svg>
);

const pillars = [
  {
    title: 'Modern Tech Expertise',
    description:
      'Engineering with the latest cloud, data, and AI stacks to keep your products on the leading edge.',
    Icon: CpuChipIcon
  },
  {
    title: 'Tailored Applications',
    description:
      'Solutions designed around your workflows, integrating seamlessly with the tools your teams already use.',
    Icon: AdjustmentsHorizontalIcon
  },
  {
    title: 'AI Agents and Automation',
    description:
      'Composable agents that streamline operations, reduce manual work, and unlock real-time decisions.',
    Icon: SparklesIcon
  },
  {
    title: 'Trusted Support',
    description:
      'Guidance from discovery through launch and beyond, with a partner who ships reliably.',
    Icon: LifebuoyIcon
  }
];

const WhyChooseNeoLabs = () => (
  <GradientSection className="py-20" id="why-neolabs">
    <div className="section-container">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Why Choose NeoLabs</p>
        <h2 className="section-title mt-3">Why Choose NeoLabs</h2>
        <p className="mt-5 text-lg leading-relaxed text-light/80">
          From strategy to shipped software, NeoLabs pairs AI-native engineering with collaborative delivery so you can scale with confidence.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map(({ title, description, Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-white/5 bg-[#05090f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_20px_45px_rgba(0,230,147,0.18)]"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-white/70">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link to="/contact" className="btn-primary">
          Get a Free Tech Assessment
        </Link>
      </div>
    </div>
  </GradientSection>
);

export default WhyChooseNeoLabs;
