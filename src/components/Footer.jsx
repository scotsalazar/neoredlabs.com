import React from 'react';

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Latest', href: '/latest' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const policyLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const Footer = () => (
  <footer className="mt-20 bg-surface-dark text-light/80">
    <div className="section-container py-14">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-display text-3xl font-semibold text-light">NeoLabs</p>
          <p className="max-w-lg text-sm leading-7 text-light/60">
            Personalized app delivery for teams that need less manual work, connected operations, and clearer visibility.
          </p>
          <div className="space-y-1 text-sm text-light/60">
            <p>Makati City, Metro Manila, Philippines</p>
            <a href="mailto:info@neolabs.com" className="hover:text-light">info@neolabs.com</a>
            <p>+63 906-437-0420</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-light/40">Company</p>
          <ul className="space-y-3 text-sm text-light/75">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-light">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-light/40">Policies</p>
          <ul className="space-y-3 text-sm text-light/75">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-light">{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-light">
            Careers
            <span aria-hidden>{'->'}</span>
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-light/10 pt-6 text-xs text-light/40 sm:flex sm:items-center sm:justify-between">
        <p>Copyright {new Date().getFullYear()} NeoLabs. All rights reserved.</p>
        <p className="mt-3 sm:mt-0">Connected operations with less manual load.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
