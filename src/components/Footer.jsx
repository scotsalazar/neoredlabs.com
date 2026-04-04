import React from 'react';

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Business', href: '/business' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const policyLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const Footer = () => (
  <footer className="mt-20 bg-dark text-slate-200">
    <div className="section-container py-14">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-display text-3xl font-semibold text-white">NeoLabs</p>
          <p className="max-w-lg text-sm leading-7 text-slate-400">
            Personalized app development, automation, and integrations for teams that need fast delivery and dependable support.
          </p>
          <div className="space-y-1 text-sm text-slate-400">
            <p>Makati City, Metro Manila, Philippines</p>
            <a href="mailto:info@neolabs.com" className="hover:text-white">info@neolabs.com</a>
            <p>+63 906-437-0420</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Company</p>
          <ul className="space-y-3 text-sm text-slate-300">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Policies</p>
          <ul className="space-y-3 text-sm text-slate-300">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-white">
            Careers
            <span aria-hidden>{'->'}</span>
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex sm:items-center sm:justify-between">
        <p>Copyright {new Date().getFullYear()} NeoLabs. All rights reserved.</p>
        <p className="mt-3 sm:mt-0">Modern systems aligned to real operations.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
