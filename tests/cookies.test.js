import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import { cookieMiddleware, setCookie, getCookie } from '../src/utils/cookies.js';

describe('Cookie Functionality', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(cookieParser());
    app.use(cookieMiddleware);
    
    // Test routes
    app.get('/set-cookie/:name/:value', (req, res) => {
      setCookie(res, req.params.name, req.params.value);
      res.json({ success: true });
    });

    app.get('/get-cookie/:name', (req, res) => {
      const value = getCookie(req, req.params.name);
      res.json({ value });
    });
  });

  afterEach(() => {
    app = null;
  });

  it('should set and retrieve cookies correctly', async () => {
    const agent = request.agent(app);
    
    // Set cookie
    await agent
      .get('/set-cookie/testCookie/testValue')
      .expect(200)
      .expect(res => {
        expect(res.headers['set-cookie']).toBeDefined();
      });

    // Get cookie
    await agent
      .get('/get-cookie/testCookie')
      .expect(200)
      .expect(res => {
        expect(res.body.value).toBe('testValue');
      });
  });

  it('should handle secure cookies in production', async () => {
    process.env.NODE_ENV = 'production';
    
    const agent = request.agent(app);
    
    await agent
      .get('/set-cookie/secureCookie/secureValue')
      .expect(200)
      .expect(res => {
        const cookieHeader = res.headers['set-cookie'][0];
        expect(cookieHeader).toContain('Secure');
        expect(cookieHeader).toContain('HttpOnly');
      });
    
    process.env.NODE_ENV = 'test';
  });

  it('should return null for non-existent cookies', async () => {
    const agent = request.agent(app);
    
    await agent
      .get('/get-cookie/nonExistentCookie')
      .expect(200)
      .expect(res => {
        expect(res.body.value).toBeNull();
      });
  });
});