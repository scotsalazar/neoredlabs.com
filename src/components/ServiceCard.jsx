import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, valueProp, benefits, cta }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-950 to-black p-8 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-primary/20">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 blur-3xl transition duration-500 group-hover:opacity-80" />
    <div className="relative flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30">
        {icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight text-light">{title}</h3>
        <p className="text-sm text-light/80 leading-relaxed">{valueProp}</p>
        <ul className="space-y-2 text-sm text-light/80">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
        >
          {cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </div>
);

export default ServiceCard;
