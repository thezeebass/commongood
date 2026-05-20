import jwt from 'jsonwebtoken';
import { config } from '../config/database';

export function generateToken(payload: {
  id: string;
  phone: string;
  verificationTier: number;
}): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function verifyToken(token: string): {
  id: string;
  phone: string;
  verificationTier: number;
} | null {
  try {
    return jwt.verify(token, config.jwtSecret) as {
      id: string;
      phone: string;
      verificationTier: number;
    };
  } catch {
    return null;
  }
}
