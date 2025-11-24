import React from 'react';

/**
 * Shared gradient background wrapper used across pages and sections.
 *
 * Adds layered radial glows on top of a dark-to-slate gradient so the
 * cinematic Services look carries through the rest of the site.
 */
const GradientSection = ({ as: Component = 'section', className = '', children, ...rest }) => {
  const baseClasses =
    'relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-slate-900 text-light';

  return (
    <Component className={`${baseClasses} ${className}`.trim()} {...rest}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.2),transparent_35%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_40%)]"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </Component>
  );
};

export default GradientSection;
