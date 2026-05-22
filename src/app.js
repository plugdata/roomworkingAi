/**
 * Express application setup for roomworkingAi
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import config from './config/index.js';
import { cookieSetup } from './middleware/cookies.js';
import apiRoutes from './routes/api.js';
import aiRoutes from './routes/ai.js';

// ES6 __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create Express application
 */
const createApp = () => {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    }
  }));

  // CORS configuration
  app.use(cors(config.cors));

  // Logging middleware
  if (config.server.env !== 'test') {
    app.use(morgan('combined'));
  }

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Cookie and session middleware
  app.use(cookieSetup);

  // Static files
  app.use(express.static(path.join(__dirname, '../public')));

  // Routes
  app.use('/api', apiRoutes);
  app.use('/ai', aiRoutes);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: config.server.env
    });
  });

  // Welcome endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to roomworkingAi',
      description: 'AI conversation and cloud work platform',
      endpoints: {
        health: '/health',
        api: '/api',
        ai: '/ai'
      }
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`,
      timestamp: new Date().toISOString()
    });
  });

  // Error handler
  app.use((error, req, res, next) => {
    const isDevelopment = config.server.env === 'development';
    
    console.error('Error:', error);

    res.status(error.status || 500).json({
      error: error.message || 'Internal Server Error',
      ...(isDevelopment && { stack: error.stack }),
      timestamp: new Date().toISOString()
    });
  });

  return app;
};

export default createApp;