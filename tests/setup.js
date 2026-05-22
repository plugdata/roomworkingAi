// Global test setup
import { jest } from '@jest/globals';

// Mock console methods in tests to reduce noise
global.console = {
  ...console,
  // Keep log for debugging
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Global test timeout
jest.setTimeout(10000);

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-secret-key';