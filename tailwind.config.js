module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0D1B2A',
        light: '#F8FAFC',
        primary: '#168B80',
        secondary: '#6FD3C6',
        accent: '#E2F3EF'
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Newsreader', 'Georgia', 'serif'],
        heading: ['Manrope', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 30px 80px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
