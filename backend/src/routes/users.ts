import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/users/me - Get current user
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    // TODO: Fetch user from Supabase
    res.json({
      id: req.user?.id,
      phone: req.user?.phone,
      name: 'Mock User',
      email: 'user@example.com',
      verificationTier: req.user?.verificationTier,
      votingWeight: 1,
      stellarAddress: '',
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    // TODO: Fetch user from Supabase
    res.status(501).json({ error: 'Not implemented', code: 'NOT_IMPLEMENTED' });
  } catch (err) {
    next(err);
  }
});

export default router;
