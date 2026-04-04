module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        page: 'rgb(var(--color-page) / <alpha-value>)',
        'page-muted': 'rgb(var(--color-page-muted) / <alpha-value>)',
        'panel-muted': 'rgb(var(--color-panel-muted) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        'ink-strong': 'rgb(var(--color-ink-strong) / <alpha-value>)',
        copy: 'rgb(var(--color-copy) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Newsreader', 'Georgia', 'serif'],
        heading: ['Manrope', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 30px 80px rgb(var(--color-dark) / 0.08)'
      }
    }
  },
  plugins: []
};
