import React from 'react';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapatApp from '../assets/images/8dbbfc73-2878-4538-8f5b-2f09dac70db2.png';
import logoIamTechFix from '../assets/images/logo-kiapat.png';
import logoNorthSouth4023 from '../assets/images/logo-northsouth4023.png';
import logoKalyeBilliards from '../assets/images/logo-kalyebilliards.png';
import { motion } from 'framer-motion';

const clients = [
  { name: '1PLS Logistics Solutions', logo: logo1pls },
  { name: 'GPFresh Inc.', logo: logoGPFresh },
  { name: 'Kiapat App', logo: logoKiapatApp },
  { name: 'IAM Tech', logo: logoIamTechFix },
  { name: 'Northsouth4023', logo: logoNorthSouth4023 },
  { name: 'Kalye Billiards & Bar', logo: logoKalyeBilliards }
];

const ClientCarousel = () => (
  <section className="bg-dark py-20" id="clients">
    <div className="section-container">
      <h2 className="section-title text-center">Trusted by</h2>
      <div className="mt-10 overflow-x-auto">
        <div className="flex items-center justify-center gap-12">
          {clients.map((client) => (
            <motion.div
              key={client.name}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                title={client.name}
                className="h-32 w-auto object-contain mix-blend-screen opacity-60 transition-transform duration-300 hover:grayscale-0 hover:opacity-100 hover:drop-shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ClientCarousel;
