import React from 'react';

/**
 * Footer component containing contact details and social links.
 *
 * Uses a gradient dark background and provides clear spacing.  Email
 * addresses use the neolabs.com domain to reflect the new branding.
 */
const contactDetails = [
  {
    label: 'Address',
    value: 'Makati City, Metro Manila, Philippines',
    href: null
  },
  {
    label: 'Email',
    value: 'info@neolabs.com',
    href: 'mailto:info@neolabs.com'
  },
  {
    label: 'Phone',
    value: '+63 (02) 1234 5678',
    href: 'tel:+630212345678'
  }
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/neolabs' },
  { label: 'Twitter', href: 'https://twitter.com/neolabs' },
  { label: 'Facebook', href: 'https://www.facebook.com/neolabs' }
];

const Footer = () => (
  <footer className="bg-gradient-to-r from-dark via-gray-900 to-black py-20 text-light">
    <div className="section-container">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl font-semibold font-heading">Get in touch</h2>
          <ul className="space-y-2 text-sm md:text-base">
            {contactDetails.map((detail) => (
              <li key={detail.label}>
                <span className="font-medium">{detail.label}:</span>{' '}
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="hover:text-primary transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span>{detail.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl font-semibold font-heading">Follow us</h2>
          <div className="flex justify-center gap-4 md:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-light hover:bg-primary/20 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs md:text-sm">
        © {new Date().getFullYear()} NeoLabs. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;