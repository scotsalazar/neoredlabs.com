import React from 'react';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Careers', href: '/careers' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' }
];

const Navbar = () => (
  <header className="bg-dark py-4 text-white">
    <div className="section-container flex items-center justify-between">
      <div className="text-2xl font-bold tracking-wide">NEO&nbsp;Redlabs</div>
      <nav>
        <ul className="flex items-center gap-6 text-sm font-medium md:text-base">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                className="hover:text-primary focus:outline-none focus-visible:text-primary"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default Navbar;
