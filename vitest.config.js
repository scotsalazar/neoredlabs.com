import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest configuration to enable React testing with jsdom
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js'
  }
});
