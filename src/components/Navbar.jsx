import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Business', to: '/business' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
];

const Navbar = () => (
  <motion.header
    className="bg-nav fixed left-0 right-0 top-0 z-50 border-b border-line/80 backdrop-blur-xl"
    initial={{ y: -18, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    <div className="section-container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
        <NavLink
          to="/"
          end
          className="flex flex-col text-center lg:text-left"
        >
          <span className="font-display text-3xl font-semibold tracking-tight text-slate-950">NeoLabs</span>
          <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Personalized modern apps</span>
        </NavLink>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-600 lg:justify-start">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'relative pb-1 text-sm transition-colors duration-200 hover:text-slate-950',
                      isActive
                        ? "text-slate-950 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']"
                        : 'text-slate-600'
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

      <NavLink to="/contact" className="btn-primary px-5 py-2.5">
        Contact Us
      </NavLink>
    </div>
  </motion.header>
);

export default Navbar;
