import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Business', to: '/business' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
];

const Navbar = () => (
  <motion.header
    className="glass fixed left-0 right-0 top-0 z-50 py-4"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div className="section-container flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-10">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            [
              'w-full text-center text-2xl font-heading font-semibold tracking-wide transition-colors focus:outline-none lg:w-auto lg:text-left',
              isActive ? 'text-secondary' : 'text-primary'
            ].join(' ')
          }
        >
          NeoLabs
        </NavLink>

        <nav className="w-full lg:w-auto" aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium lg:justify-start lg:gap-6 lg:text-base">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
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

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          [
            'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none',
            isActive
              ? 'border-secondary bg-secondary text-dark'
              : 'border-white/15 bg-white/5 text-light hover:border-primary/40 hover:bg-primary/10 hover:text-primary'
          ].join(' ')
        }
      >
        Contact Us
      </NavLink>
    </div>
  </motion.header>
);

export default Navbar;
