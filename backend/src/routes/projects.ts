import { Router } from 'express';
import { authenticateToken, requireVerificationTier } from '../middleware/auth';
import { createProjectSchema } from '../utils/validation';

const router = Router();

// GET /api/projects - List all active projects
router.get('/', async (_req, res, next) => {
  try {
    // TODO: Fetch from Supabase
    res.json([]);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id - Get project by ID
router.get('/:id', async (req, res, next) => {
  try {
    // TODO: Fetch from Supabase
    res.status(501).json({ error: 'Not implemented', code: 'NOT_IMPLEMENTED' });
  } catch (err) {
    next(err);
  }
});

// POST /api/projects - Create new project (admin only)
router.post(
  '/',
  authenticateToken,
  requireVerificationTier(3),
  async (req, res, next) => {
    try {
      const result = createProjectSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          error: result.error.errors.map(e => e.message).join(', '),
        });
        return;
      }

      // TODO: Insert into Supabase
      res.status(201).json({
        id: 1,
        ...result.data,
        currentFunding: 0,
        currentParticipants: 0,
        currentApprovalRate: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
