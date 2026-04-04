import React from 'react';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapatApp from '../assets/images/8dbbfc73-2878-4538-8f5b-2f09dac70db2.png';
import logoNorthSouth4023 from '../assets/images/logo-northsouth4023.png';
import logoKalyeBilliards from '../assets/images/logo-kalyebilliards.png';
import logoHopeForLupus from '../assets/images/logo-hopeforlupus.png';

const clients = [
  { name: 'GPFresh Inc.', logo: logoGPFresh, label: 'Retail' },
  { name: '1PLS Logistics Solutions', logo: logo1pls, label: 'Logistics' },
  { name: 'Kiapat App', logo: logoKiapatApp, label: 'Mobility' },
  { name: 'Northsouth4023', logo: logoNorthSouth4023, label: 'Operations' },
  { name: 'Kalye Billiards & Bar', logo: logoKalyeBilliards, label: 'Hospitality' },
  { name: 'Hope for Lupus', logo: logoHopeForLupus, label: 'Health' },
];

const ClientCarousel = () => (
  <section className="border-y border-slate-200/80 bg-white">
    <div className="section-container py-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow">Trusted across sectors</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            NeoLabs supports businesses in logistics, retail, hospitality, mobility, and operations.
          </h2>
        </div>

        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <div key={client.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <img src={client.logo} alt={`${client.name} logo`} className="h-12 w-auto max-w-[96px] object-contain" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{client.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{client.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ClientCarousel;
