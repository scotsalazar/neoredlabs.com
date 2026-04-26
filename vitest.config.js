import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest configuration to enable React testing with jsdom
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.{test,spec}.{js,jsx,ts,tsx}', 'tests/server/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    setupFiles: './vitest.setup.js'
  }
});
