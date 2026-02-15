import React from 'react';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapatApp from '../assets/images/8dbbfc73-2878-4538-8f5b-2f09dac70db2.png';
import logoIamTechFix from '../assets/images/logo-kiapat.png';
import logoNorthSouth4023 from '../assets/images/logo-northsouth4023.png';
import logoKalyeBilliards from '../assets/images/logo-kalyebilliards.png';
import GradientSection from './GradientSection.jsx';

const clients = [
  {
    name: 'GPFresh Inc.',
    logo: logoGPFresh,
    href: '/services',
    alt: 'GPFresh Inc. client logo',
    label: 'Retail'
  },
  {
    name: 'IAM Tech',
    logo: logoIamTechFix,
    href: '/services',
    alt: 'IAM Tech client logo',
    label: 'Technology'
  },
  {
    name: '1PLS Logistics Solutions',
    logo: logo1pls,
    href: '/services',
    alt: '1PLS Logistics Solutions client logo',
    label: 'Logistics'
  },
  {
    name: 'Kiapat App',
    logo: logoKiapatApp,
    href: '/services',
    alt: 'Kiapat App client logo',
    label: 'Mobility'
  },
  {
    name: 'Kalye Billiards & Bar',
    logo: logoKalyeBilliards,
    href: '/services',
    alt: 'Kalye Billiards and Bar client logo',
    label: 'Hospitality'
  },
  {
    name: 'Northsouth4023',
    logo: logoNorthSouth4023,
    href: '/services',
    alt: 'Northsouth4023 client logo',
    label: 'Operations'
  }
];

const ClientCarousel = () => (
  <GradientSection className="py-24" id="clients">
    <div className="section-container">
      <h2 className="text-center font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
        Trusted by teams in logistics, retail, and hospitality.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-white/75 sm:text-lg">
        From logistics to restaurants to gyms.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-white/75 sm:text-lg">
        Serving multiple industries • Active deployments • Long-term partnerships
      </p>

      <div className="mt-12 rounded-2xl bg-black/25 px-4 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-2 items-end justify-items-center gap-x-6 gap-y-8 md:flex md:flex-wrap md:items-end md:justify-center md:gap-8 lg:gap-10">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.href}
              className="group flex min-h-[92px] min-w-[132px] flex-col items-center justify-end px-2 text-center cursor-pointer"
              aria-label={`View related work for ${client.name}`}
            >
              <div className="flex h-[68px] w-full items-end justify-center">
                <img
                  src={client.logo}
                  alt={client.alt}
                  title={client.name}
                  className="max-h-[52px] w-auto max-w-[160px] object-contain opacity-90 brightness-110 contrast-95"
                />
              </div>
              <span className="mt-2 text-[11px] uppercase tracking-[0.16em] text-light/60">
                {client.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </GradientSection>
);

export default ClientCarousel;
