import React from 'react';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapat from '../assets/images/logo-kiapat.png';

/**
 * A simple horizontal carousel displaying client logos.  Clients are
 * represented with cohesive vector style graphics generated for this
 * revamp.  The container allows horizontal scrolling on smaller
 * screens.
 */
const clients = [
  { name: '1PLS Logistics Solutions', logo: logo1pls },
  { name: 'GPFresh Inc.', logo: logoGPFresh },
  { name: 'Kiapat App', logo: logoKiapat }
];

const ClientCarousel = () => (
  <section className="bg-light py-16" id="clients">
    <div className="section-container">
      <h2 className="section-title text-center">Our Clients</h2>
      <div className="mt-8 overflow-x-auto">
        <div className="flex items-center justify-center gap-8">
          {clients.map((client) => (
            <div key={client.name} className="flex-shrink-0">
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ClientCarousel;