import React from 'react';

const contactDetails = [
  {
    label: 'Address',
    value: 'Makati City, Metro Manila, Philippines',
    href: null
  },
  {
    label: 'Email',
    value: 'info@neoredlabs.com',
    href: 'mailto:info@neoredlabs.com'
  },
  {
    label: 'Phone',
    value: '+63 (02) 1234 5678',
    href: 'tel:+630212345678'
  }
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/neoredlabs' },
  { label: 'Twitter', href: 'https://twitter.com/neoredlabs' },
  { label: 'Facebook', href: 'https://www.facebook.com/neoredlabs' }
];

const Footer = () => (
  <footer className="bg-dark py-12 text-white">
    <div className="section-container">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <ul className="space-y-2 text-sm md:text-base">
            {contactDetails.map((detail) => (
              <li key={detail.label}>
                <span className="font-medium">{detail.label}:</span>{' '}
                {detail.href ? (
                  <a href={detail.href} className="hover:text-secondary">
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
          <h2 className="text-xl font-semibold">Follow us</h2>
          <div className="flex justify-center gap-4 md:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs md:text-sm">
        © {new Date().getFullYear()} Neo&nbsp;Redlabs. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
