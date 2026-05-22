/**
 * API routes for roomworkingAi
 */
import { Router } from 'express';
import { sessionCookies } from '../utils/cookies.js';

const router = Router();

/**
 * Session management endpoints
 */
router.post('/session/create', (req, res) => {
  const { userId, userData = {} } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'userId is required'
    });
  }

  // Create session cookie
  sessionCookies.setUserSession(res, userId, userData);

  res.json({
    success: true,
    message: 'Session created successfully',
    userId,
    timestamp: new Date().toISOString()
  });
});

router.get('/session/info', (req, res) => {
  const session = sessionCookies.getUserSession(req);

  if (!session) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No active session found'
    });
  }

  res.json({
    session,
    timestamp: new Date().toISOString()
  });
});

router.post('/session/destroy', (req, res) => {
  sessionCookies.clearUserSession(res);

  res.json({
    success: true,
    message: 'Session destroyed successfully',
    timestamp: new Date().toISOString()
  });
});

/**
 * Cookie management endpoints
 */
router.post('/cookies/set', (req, res) => {
  const { name, value, options = {} } = req.body;

  if (!name || value === undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'name and value are required'
    });
  }

  res.setCookie(name, value, options);

  res.json({
    success: true,
    message: `Cookie '${name}' set successfully`
  });
});

router.get('/cookies/:name', (req, res) => {
  const { name } = req.params;
  const value = res.getCookie(name);

  res.json({
    name,
    value,
    exists: value !== null
  });
});

router.delete('/cookies/:name', (req, res) => {
  const { name } = req.params;
  res.clearCookie(name);

  res.json({
    success: true,
    message: `Cookie '${name}' cleared successfully`
  });
});

/**
 * Utility endpoints
 */
router.get('/status', (req, res) => {
  res.json({
    api: 'roomworkingAi API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      'POST /session/create': 'Create user session',
      'GET /session/info': 'Get session information',
      'POST /session/destroy': 'Destroy user session',
      'POST /cookies/set': 'Set cookie',
      'GET /cookies/:name': 'Get cookie value',
      'DELETE /cookies/:name': 'Clear cookie'
    },
    timestamp: new Date().toISOString()
  });
});

export default router;