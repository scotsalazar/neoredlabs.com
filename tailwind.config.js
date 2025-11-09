/**
 * TailwindCSS configuration for the revamped NeoLabs site.
 *
 * We adopt a dark theme by default and extend the colour palette
 * with neon and emerald greens for vibrant accents.  Custom
 * font families are defined for body copy and headings.
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#010a13',      // primary background colour
        light: '#f8fafc',     // fallback light colour (unused but kept)
        primary: '#00E676',   // neon green used for CTAs and highlights
        secondary: '#34D399', // emerald green for secondary accents
        accent: '#6EE7B7'     // mint accent for subtle highlights
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'sans-serif']
      }
    }
  },
  plugins: []
};