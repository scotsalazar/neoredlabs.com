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
  { label: 'Services', to: '/services' },
  { label: 'Contacts', to: '/contact' },
  { label: 'Changelog', to: '/release-notes' }
];

const Navbar = () => (
  <motion.header
    className="glass fixed top-0 left-0 right-0 z-50 py-4"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div className="section-container flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-6">
      <NavLink
        to="/"
        end
        className="w-full text-center text-2xl font-heading font-semibold tracking-wide text-primary focus:outline-none sm:w-auto sm:text-left"
      >
        NeoLabs
      </NavLink>
      <nav className="w-full sm:w-auto">
        <ul className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium md:gap-6 md:text-base">
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
