import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/database';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    phone: string;
    verificationTier: number;
  };
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required', code: 'UNAUTHORIZED' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      phone: string;
      verificationTier: number;
    };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token', code: 'FORBIDDEN' });
  }
}

export function requireVerificationTier(minTier: number) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required', code: 'UNAUTHORIZED' });
      return;
    }

    if (req.user.verificationTier < minTier) {
      res.status(403).json({
        error: `Verification tier ${minTier} required`,
        code: 'INSUFFICIENT_VERIFICATION',
      });
      return;
    }

    next();
  };
}
