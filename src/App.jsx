import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Footer from './components/Footer.jsx';
import careersImage from './assets/images/careers.png';
import contactImage from './assets/images/contact.png';

const App = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <About />
      <Services />
      <section className="py-16">
        <div className="section-container grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
          <div>
            <h2 className="section-title">We're Hiring</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Our team is expanding! Neo&nbsp;Redlabs is looking for talented and passionate individuals to join us on our journey.
              We currently have openings for an Executive Assistant and a No-code Developer. If you're ready to make an impact and
              work with cutting-edge technologies, explore our careers page.
            </p>
            <a href="/careers" className="btn-primary mt-8">Explore Careers</a>
          </div>
          <img src={careersImage} alt="Team collaboration" className="mx-auto w-full max-w-md rounded-lg shadow-lg" />
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="section-container grid gap-10 md:grid-cols-[0.8fr,1.2fr] md:items-center">
          <img src={contactImage} alt="Contact concept" className="mx-auto w-full max-w-md rounded-lg shadow-lg" />
          <div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Whether you're interested in working with us, partnering on a project, or learning more about our solutions, we'd love
              to hear from you. Reach out and let's shape the future together.
            </p>
            <a href="/contact" className="btn-primary mt-8">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default App;
