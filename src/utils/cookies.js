/**
 * Cookie utility functions for roomworkingAi
 */

/**
 * Cookie configuration based on environment
 */
const getCookieConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/'
  };
};

/**
 * Set a cookie with secure defaults
 * @param {Response} res - Express response object
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {Object} options - Additional cookie options
 */
export const setCookie = (res, name, value, options = {}) => {
  const config = getCookieConfig();
  const cookieOptions = { ...config, ...options };
  
  res.cookie(name, value, cookieOptions);
};

/**
 * Get a cookie value
 * @param {Request} req - Express request object
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export const getCookie = (req, name) => {
  return req.cookies?.[name] || null;
};

/**
 * Clear a cookie
 * @param {Response} res - Express response object
 * @param {string} name - Cookie name
 */
export const clearCookie = (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/'
  });
};

/**
 * Middleware to attach cookie utilities to request/response objects
 */
export const cookieMiddleware = (req, res, next) => {
  // Attach utility methods to response object
  res.setCookie = (name, value, options) => setCookie(res, name, value, options);
  res.getCookie = (name) => getCookie(req, name);
  res.clearCookie = (name) => clearCookie(res, name);
  
  next();
};

/**
 * Session cookie utilities
 */
export const sessionCookies = {
  /**
   * Set user session cookie
   */
  setUserSession: (res, userId, sessionData = {}) => {
    setCookie(res, 'user_session', JSON.stringify({
      userId,
      timestamp: Date.now(),
      ...sessionData
    }), {
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days for session
    });
  },

  /**
   * Get user session from cookie
   */
  getUserSession: (req) => {
    const sessionCookie = getCookie(req, 'user_session');
    
    if (!sessionCookie) {
      return null;
    }

    try {
      return JSON.parse(sessionCookie);
    } catch (error) {
      console.warn('Invalid session cookie format:', error.message);
      return null;
    }
  },

  /**
   * Clear user session cookie
   */
  clearUserSession: (res) => {
    clearCookie(res, 'user_session');
  }
};

export default {
  setCookie,
  getCookie,
  clearCookie,
  cookieMiddleware,
  sessionCookies
};