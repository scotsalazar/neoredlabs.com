// Setup file for Vitest
// Extends jest-dom matchers for convenient assertions
import '@testing-library/jest-dom';
import { vi } from 'vitest';

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true
  });
}
