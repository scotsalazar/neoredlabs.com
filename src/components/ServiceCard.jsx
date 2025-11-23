import React from 'react';

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl p-8 hover:border-emerald-500 hover:shadow-emerald-500/20 transition">
    <div className="mb-4 text-emerald-400">{icon}</div>
    <h3 className="text-lg font-bold tracking-wide text-light">{title}</h3>
    <p className="mt-2 text-sm text-light/80">{description}</p>
  </div>
);

export default ServiceCard;
