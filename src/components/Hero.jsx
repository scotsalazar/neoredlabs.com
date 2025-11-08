import React from 'react';
import heroImage from '../assets/images/hero.png';

const Hero = () => (
  <section
    className="relative flex h-[70vh] items-center justify-center overflow-hidden"
  >
    <img
      src={heroImage}
      alt="Abstract technology background"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
    <div className="relative z-10 section-container text-center text-white">
      <h1 className="text-3xl font-bold leading-tight md:text-5xl">
        NEO&nbsp;Redlabs: Innovating the Future
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg">
        Crafting cutting-edge technologies and digital solutions for a changing world.
      </p>
      <a href="/careers" className="btn-primary mt-8">
        Join Our Team
      </a>
    </div>
  </section>
);

export default Hero;
