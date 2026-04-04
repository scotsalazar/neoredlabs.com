import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import Services from './pages/Services.jsx';
import Pricing from './pages/Pricing.jsx';
import ReleaseNotes from './pages/ReleaseNotes.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/business" element={<ReleaseNotes />} />
    <Route path="/release-notes" element={<ReleaseNotes />} />
    <Route path="/services" element={<Services />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/about" element={<About />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
  </Routes>
);

export default App;
