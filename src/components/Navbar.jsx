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
    className="glass fixed left-0 right-0 top-0 z-50"
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
          <span className="font-display text-3xl font-semibold tracking-tight text-white">NeoLabs</span>
          <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Philippine app development company</span>
        </NavLink>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-300 lg:justify-start">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'relative pb-1 text-sm transition-colors duration-200 hover:text-white',
                      isActive
                        ? "text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']"
                        : 'text-slate-300'
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

      <NavLink to="/contact" className="btn-secondary border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
        Contact Us
      </NavLink>
    </div>
  </motion.header>
);

export default Navbar;
