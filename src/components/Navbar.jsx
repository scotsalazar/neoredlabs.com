import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Careers', to: '/careers' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' }
];

const Navbar = () => (
  <header className="bg-dark py-4 text-white">
    <div className="section-container flex items-center justify-between">
      <NavLink
        to="/"
        end
        className="text-2xl font-bold tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/80"
      >
        NEO&nbsp;Redlabs
      </NavLink>
      <nav>
        <ul className="flex items-center gap-6 text-sm font-medium md:text-base">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative pb-1 transition-colors duration-200 hover:text-primary focus:outline-none focus-visible:text-primary ${
                    isActive
                      ? "text-secondary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-secondary after:content-['']"
                      : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default Navbar;
