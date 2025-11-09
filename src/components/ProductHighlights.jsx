import React from 'react';
import { motion } from 'framer-motion';
import perfImage from '../assets/images/revenue-dashboard.png';
import monitorImage from '../assets/images/monitoring-dashboard.png';
import workflowImage from '../assets/images/workflow.png';

/**
 * Displays a set of cards showcasing key NeoLabs solutions.  Each
 * card contains an illustration, a title and a short description.  A
 * simple hover lift effect gives the cards a sense of interactivity.
 */
const products = [
  {
    title: 'Performance Dashboard',
    description:
      'Visualise key metrics and revenue streams with interactive dashboards.',
    image: perfImage
  },
  {
    title: 'Monitoring & Tracking',
    description:
      'Track systems and operations in real time with intuitive monitoring.',
    image: monitorImage
  },
  {
    title: 'Automation Workflow',
    description:
      'Streamline your processes with powerful automation workflows.',
    image: workflowImage
  }
];

const ProductHighlights = () => (
  <section className="bg-dark py-20" id="solutions">
    <div className="section-container">
      <h2 className="section-title text-center">Our Solutions</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {products.map((product) => (
          <motion.article
            key={product.title}
            className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:-translate-y-2"
            whileHover={{ translateY: -4 }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold font-heading text-light">
                {product.title}
              </h3>
              <p className="mt-3 text-base text-light/80">
                {product.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProductHighlights;