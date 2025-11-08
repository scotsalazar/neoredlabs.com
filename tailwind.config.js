/**
 * Tailwind configuration for the Neo Labs site.
 *
 * Tailwind scans the HTML and all JavaScript/JSX files for class
 * names and generates only the styles that are actually used.  We
 * extend the default colours slightly to provide consistent branding
 * across pages.
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: '#f8fafc',
        dark: '#0f172a',
        primary: '#3b82f6',
        secondary: '#6366f1'
      }
    }
  },
  plugins: []
};