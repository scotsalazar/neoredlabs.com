import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact';

/**
 * Application routes for the NeoLabs website.
 *
 * Each page is defined in the ./pages directory.  The top‑level Routes
 * component renders the appropriate page based on the URL.  The
 * surrounding Layout component in each page handles shared UI such as
 * navigation and footer.
 */
const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
);

export default App;