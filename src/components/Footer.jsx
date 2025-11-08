import React from 'react';

const Footer = () => (
  <footer className="bg-dark py-8 text-white">
    <div className="section-container text-center text-sm md:text-base">
      © {new Date().getFullYear()} Neo&nbsp;Redlabs. All rights reserved.
    </div>
  </footer>
);

export default Footer;
