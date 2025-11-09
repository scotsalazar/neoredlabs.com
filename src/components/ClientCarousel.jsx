import React from 'react';
import logo1pls from '../assets/images/logo-1pls.png';
import logoGPFresh from '../assets/images/logo-gpfresh.png';
import logoKiapat from '../assets/images/logo-kiapat.png';
import logoIamTech from '../assets/images/logo-iamtech.png';
import logoNorthSouth4023 from '../assets/images/logo-northsouth4023.png';
import logoKalyeBilliards from '../assets/images/logo-kalyebilliards.png';
import { motion } from 'framer-motion';

/**
 * A responsive carousel displaying client logos
 *
 * Each logo is shown in grayscale by default and animates to full colour
 * and a slightly larger size on hover. The grid is horizontally
 * scrollable on small screens and centred on larger breakpoints.
 */
const clients = [
  { name: '1PLS Logistics Solutions', logo: logo1pls },
  { name: 'GPFresh Inc.', logo: logoGPFresh },
  { name: 'Kiapat', logo: logoKiapat },
  { name: 'IAM Tech', logo: logoIamTech },
  { name: 'NorthSouth4023', logo: logoNorthSouth4023 },
  { name: 'Kalye Billiards', logo: logoKalyeBilliards }
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
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="h-32 w-auto object-contain mix-blend-screen opacity-60 transition-transform duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ClientCarousel;