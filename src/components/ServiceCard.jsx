import React from 'react';

const ServiceCard = ({ icon, title, description }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-950 to-black p-8 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-primary/20">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 blur-3xl transition duration-500 group-hover:opacity-80" />
    <div className="relative flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-light">{title}</h3>
        <p className="mt-2 text-sm text-light/70 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export default ServiceCard;
