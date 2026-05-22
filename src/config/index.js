/**
 * Configuration settings for roomworkingAi
 */
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },

  // Security configuration
  security: {
    sessionSecret: process.env.SESSION_SECRET || 'roomworkingai-development-secret',
    cookieSecret: process.env.COOKIE_SECRET || 'roomworkingai-cookie-secret'
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // AI configuration (for future use)
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY
  }
};

export default config;