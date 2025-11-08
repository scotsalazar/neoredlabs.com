/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e88e5',
        secondary: '#e85d75',
        dark: '#0a192f',
        light: '#f5f9ff'
      },
      fontFamily: {
        sans: ["'Segoe UI'", 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
      },
      maxWidth: {
        content: '1200px'
      }
    }
  },
  plugins: []
};
