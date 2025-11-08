import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import AboutPage from './pages/About.jsx';
import CareersPage from './pages/Careers.jsx';
import ContactPage from './pages/Contact.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
