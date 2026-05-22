/**
 * Cookie middleware for Express application
 */
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { cookieMiddleware } from '../utils/cookies.js';

/**
 * Configure session middleware
 */
export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'roomworkingai-default-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  },
  name: 'roomworkingai.sid'
});

/**
 * Cookie parser middleware with secret
 */
export const cookieParserMiddleware = cookieParser(
  process.env.COOKIE_SECRET || 'roomworkingai-cookie-secret'
);

/**
 * All cookie-related middleware bundled together
 */
export const cookieSetup = [
  cookieParserMiddleware,
  sessionMiddleware,
  cookieMiddleware
];

export default cookieSetup;