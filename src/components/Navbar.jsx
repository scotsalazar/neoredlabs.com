import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navigation bar for the Neo Labs site.  Displays the company name and
 * links to the primary pages.  Active links are highlighted with a
 * bottom border via a pseudo element.
 */
const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' }
];

const Navbar = () => (
  <header className="bg-dark py-4 text-white shadow-sm">
    <div className="section-container flex items-center justify-between">
      <NavLink
        to="/"
        end
        className="text-2xl font-bold tracking-wide focus:outline-none"
      >
        NEO&nbsp;LABS
      </NavLink>
      <nav>
        <ul className="flex items-center gap-6 text-sm font-medium md:text-base">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative pb-1 transition-colors duration-200 hover:text-primary focus:outline-none ${
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