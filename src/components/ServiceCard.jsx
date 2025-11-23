import React from 'react';

const ServiceCard = ({ title }) => (
  <div className="flex flex-col p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-primary transition">
    <h3 className="text-xl font-semibold mb-2 text-light">{title}</h3>
  </div>
);

export default ServiceCard;
