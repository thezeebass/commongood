import { Router } from 'express';
import { authenticateToken, requireVerificationTier } from '../middleware/auth';

const router = Router();

// All admin routes require tier 3 (admin) verification
router.use(authenticateToken, requireVerificationTier(3));

// GET /api/admin/stats - Platform statistics
router.get('/stats', async (_req, res, next) => {
  try {
    // TODO: Aggregate from Supabase
    res.json({
      totalUsers: 0,
      totalProjects: 0,
      totalVotes: 0,
      totalFunding: 0,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/users - List all users
router.get('/users', async (_req, res, next) => {
  try {
    // TODO: Fetch from Supabase
    res.json([]);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/users/:id/verify - Verify user tier
router.patch('/users/:id/verify', async (req, res, next) => {
  try {
    // TODO: Update user verification tier in Supabase
    res.json({
      userId: req.params.id,
      verificationTier: req.body.tier,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
