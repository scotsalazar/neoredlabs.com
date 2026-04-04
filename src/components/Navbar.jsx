import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeProvider.jsx';

const navLinks = [
  { label: 'Business', to: '/business' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
];

const ThemeIcon = ({ theme }) =>
  theme === 'dark' ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9L5.3 5.3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6a9 9 0 1 0 10.6 10.6Z" />
    </svg>
  );

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === 'dark' ? 'light' : 'dark';

  return (
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
            <span className="font-display text-3xl font-semibold tracking-tight text-ink-strong">NeoLabs</span>
            <span className="text-xs uppercase tracking-[0.22em] text-copy">Personalized modern apps</span>
          </NavLink>

          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-copy lg:justify-start">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        'relative pb-1 text-sm transition-colors duration-200 hover:text-ink-strong',
                        isActive
                          ? "text-ink-strong after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']"
                          : 'text-copy'
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

        <div className="flex items-center justify-center gap-3 lg:justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${nextThemeLabel} mode`}
            title={`Switch to ${nextThemeLabel} mode`}
          >
            <ThemeIcon theme={theme} />
          </button>
          <NavLink to="/contact" className="btn-primary px-5 py-2.5">
            Contact Us
          </NavLink>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
