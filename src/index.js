/**
 * Server entry point for roomworkingAi
 */
import createApp from './app.js';
import config from './config/index.js';

/**
 * Start the server
 */
const startServer = () => {
  const app = createApp();
  const { port, host } = config.server;

  const server = app.listen(port, host, () => {
    console.log(`🚀 roomworkingAi server running on http://${host}:${port}`);
    console.log(`📝 Environment: ${config.server.env}`);
    console.log(`🏥 Health check: http://${host}:${port}/health`);
  });

  // Graceful shutdown
  const gracefulShutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
    
    server.close((err) => {
      if (err) {
        console.error('❌ Error during shutdown:', err);
        process.exit(1);
      }
      
      console.log('✅ Server closed successfully');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.error('⚠️ Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  // Handle process signals
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
    gracefulShutdown('uncaughtException');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
  });

  return server;
};

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export { startServer };
export default createApp;