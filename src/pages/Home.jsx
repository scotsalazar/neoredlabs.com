import React from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import AIIntegration from '../components/AIIntegration.jsx';
import ClientCarousel from '../components/ClientCarousel.jsx';
import Reviews from '../components/Reviews.jsx';

const Home = () => (
  <Layout
    title="NeoLabs | Home"
    description="NeoLabs delivers intelligent automation, SaaS engineering and AI-powered products."
  >
    <Hero />
    <AIIntegration />
    <ClientCarousel />
    <Reviews />
  </Layout>
);

export default Home;
