import { Router } from 'express';
import { authRateLimiter } from '../middleware/rateLimiting';
import { validateRegister, validateVerifyOtp } from '../utils/validation';
import { generateToken } from '../utils/jwt';

const router = Router();

// POST /api/auth/register - Register new user
router.post('/register', authRateLimiter, async (req, res, next) => {
  try {
    const validation = validateRegister(req.body);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    // TODO: Check if user exists in Supabase
    // TODO: Generate and send OTP via Twilio
    // TODO: Store OTP hash in Redis with expiry

    res.status(201).json({
      message: 'OTP sent to phone',
      phone: req.body.phone,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/verify - Verify OTP
router.post('/verify', authRateLimiter, async (req, res, next) => {
  try {
    const validation = validateVerifyOtp(req.body);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    // TODO: Verify OTP from Redis
    // TODO: Create user in Supabase if new
    // TODO: Generate JWT token

    const mockUser = {
      id: 'mock-user-id',
      phone: req.body.phone,
      name: 'Mock User',
      email: 'user@example.com',
      verificationTier: 1,
      votingWeight: 1,
      stellarAddress: '',
    };

    const token = generateToken({
      id: mockUser.id,
      phone: mockUser.phone,
      verificationTier: mockUser.verificationTier,
    });

    res.json({ user: mockUser, token });
  } catch (err) {
    next(err);
  }
});

export default router;
