import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip || 'unknown';
  const now = Date.now();

  if (!store[key] || now > store[key].resetTime) {
    store[key] = { count: 1, resetTime: now + WINDOW_MS };
    return next();
  }

  store[key].count++;

  if (store[key].count > MAX_REQUESTS) {
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
    });
    return;
  }

  next();
}

// Stricter limit for auth endpoints
export function authRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = `auth:${req.ip || 'unknown'}`;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  if (!store[key] || now > store[key].resetTime) {
    store[key] = { count: 1, resetTime: now + windowMs };
    return next();
  }

  store[key].count++;

  if (store[key].count > maxRequests) {
    res.status(429).json({
      error: 'Too many authentication attempts.',
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
    });
    return;
  }

  next();
}
