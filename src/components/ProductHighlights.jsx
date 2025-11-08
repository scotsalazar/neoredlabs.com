import React from 'react';
import { motion } from 'framer-motion';
import erpImage from '../assets/images/product-erp.png';
import analyticsImage from '../assets/images/product-analytics.png';
import chatImage from '../assets/images/product-chat.png';

/**
 * Displays a set of product cards showcasing key Neo Labs offerings.  Each
 * card contains an illustration, a title and a short description.  A
 * simple hover effect gives the cards a sense of interactivity.
 */
const products = [
  {
    title: 'ERP Dashboard',
    description: 'Manage operations with intuitive dashboards and real‑time metrics.',
    image: erpImage
  },
  {
    title: 'AI Chat Agent',
    description: 'Engage customers and automate support with intelligent chat.',
    image: chatImage
  },
  {
    title: 'Analytics Suite',
    description: 'Discover insights and trends through interactive analytics.',
    image: analyticsImage
  }
];

const ProductHighlights = () => (
  <section className="bg-white py-16" id="products">
    <div className="section-container">
      <h2 className="section-title text-center">Product Highlights</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {products.map((product) => (
          <motion.article
            key={product.title}
            className="overflow-hidden rounded-xl bg-light shadow-sm"
            whileHover={{ translateY: -4 }}
          >
            <img src={product.image} alt={product.title} className="h-56 w-full object-cover" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-dark">{product.title}</h3>
              <p className="mt-3 text-base text-slate-700">{product.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProductHighlights;