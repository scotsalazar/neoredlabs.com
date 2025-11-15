import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Primary navigation bar for the NeoLabs site.
 *
 * The bar remains fixed to the top of the viewport and uses a
 * glassmorphism effect via the `.glass` utility class.  Active links
 * are underlined and all links transition to the primary colour on
 * hover.  The brand name is displayed prominently on the left.
 */
const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' }
];

const Navbar = () => (
  <motion.header
    className="glass fixed top-0 left-0 right-0 z-50 py-3"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div className="section-container flex items-center justify-between">
      <NavLink
        to="/"
        end
        className="text-2xl font-heading font-semibold tracking-wide text-primary focus:outline-none"
      >
        NeoLabs
      </NavLink>
      <nav>
        <ul className="flex items-center gap-6 text-sm font-medium md:text-base">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [
                    'relative pb-1 transition-colors duration-200',
                    'hover:text-primary focus:outline-none',
                    isActive
                      ? "text-secondary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-secondary after:content-['']"
                      : 'text-light/80'
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </motion.header>
);

export default Navbar;