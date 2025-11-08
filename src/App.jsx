import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact.jsx';

/**
 * Defines the client‑side routes for the site.  React Router will
 * render the appropriate page component based on the current URL.
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