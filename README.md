# 🤖 roomworkingAi

An AI conversation and cloud work platform built with Node.js, Express, and modern web technologies.

## ✨ Features

- **AI Conversation System**: Built-in chat interface with AI conversation management
- **Session Management**: Secure user sessions with cookie-based authentication
- **Cookie Utilities**: Advanced cookie management with security features
- **Testing Suite**: Comprehensive test coverage with Jest and Supertest
- **Development Tools**: ESLint, build scripts, and development server
- **Modern Architecture**: ES6 modules, async/await, and clean code structure

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
roomworkingAi/
├── src/
│   ├── config/          # Configuration settings
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   │   ├── api.js      # General API endpoints
│   │   └── ai.js       # AI conversation endpoints
│   └── utils/          # Utility functions
│       └── cookies.js  # Cookie management utilities
├── tests/              # Test files
├── public/             # Static assets
│   ├── css/           # Stylesheets
│   ├── js/            # Client-side JavaScript
│   └── images/        # Images and icons
├── scripts/           # Build and utility scripts
└── package.json       # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## 🛠 API Endpoints

### Health Check
- `GET /health` - System health status

### Session Management
- `POST /api/session/create` - Create user session
- `GET /api/session/info` - Get current session info
- `POST /api/session/destroy` - Destroy user session

### Cookie Management
- `POST /api/cookies/set` - Set cookie
- `GET /api/cookies/:name` - Get cookie value
- `DELETE /api/cookies/:name` - Clear cookie

### AI Conversation
- `POST /ai/conversation/start` - Start new conversation
- `POST /ai/conversation/:id/message` - Send message
- `GET /ai/conversation/:id/history` - Get conversation history
- `DELETE /ai/conversation/:id` - Delete conversation

## 🍪 Cookie Features

- **Secure by Default**: Automatic secure flags in production
- **HttpOnly**: Prevents XSS attacks
- **SameSite**: CSRF protection
- **Session Utilities**: Built-in session cookie management
- **Environment-aware**: Different settings for dev/prod

## 🧪 Testing

The project includes comprehensive testing with:

- **Jest**: Test framework
- **Supertest**: HTTP assertion testing
- **Coverage Reports**: Detailed coverage analysis

```bash
# Run all tests
npm test

# Run specific test file
npm test -- cookies.test.js

# Generate coverage report
npm run test:coverage
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Session Management**: Secure session handling
- **Cookie Security**: HttpOnly, Secure, SameSite flags
- **Input Validation**: Request validation and sanitization

## 🌐 Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-secret-key
COOKIE_SECRET=your-cookie-secret
```

## 🎯 Development

### Adding New Routes

1. Create route file in `src/routes/`
2. Add controller logic
3. Update main app configuration
4. Add tests in `tests/`

### Cookie Management

```javascript
import { setCookie, getCookie, clearCookie } from './utils/cookies.js';

// Set cookie
setCookie(res, 'name', 'value');

// Get cookie
const value = getCookie(req, 'name');

// Clear cookie
clearCookie(res, 'name');
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔄 Changelog

### v1.0.0
- Initial release
- Basic AI conversation system
- Session and cookie management
- Testing suite and development tools

---

Built with ❤️ for AI-powered productivity
