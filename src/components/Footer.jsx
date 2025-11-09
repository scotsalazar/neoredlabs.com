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
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/neolabs',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M4.983 3.5a2.5 2.5 0 1 1-.001 5.001 2.5 2.5 0 0 1 .001-5.001ZM3 9h3.968v12H3zM9.691 9h3.804v1.733h.054c.53-1.004 1.825-2.06 3.756-2.06 4.016 0 4.758 2.645 4.758 6.083V21H18V15.5c0-1.309-.024-2.993-1.824-2.993-1.827 0-2.107 1.43-2.107 2.902V21H9.691z" />
      </svg>
    )
  },
  {
    label: 'X',
    href: 'https://twitter.com/neolabs',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.089-6.658-5.823 6.658H1.95l7.73-8.838L1.5 2.25h7.598l4.6 6.034 4.546-6.034Zm-1.161 18.31h1.833L7.045 4.072H5.077l12.006 16.488Z" />
      </svg>
    )
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/neolabs',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M13.5 9H16l.5-3h-3V4.5a1.5 1.5 0 0 1 1.5-1.5H16V0h-2.5A3.5 3.5 0 0 0 10 3.5V6H7.5v3H10v12h3.5z" />
      </svg>
    )
  }
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
                rel="noreferrer noopener"
                aria-label={`Visit NeoLabs on ${link.label}`}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-light transition-colors hover:bg-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                {link.icon}
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