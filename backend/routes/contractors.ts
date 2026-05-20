import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /api/contractors - List contractors
router.get('/', async (_req, res, next) => {
  try {
    // TODO: Fetch from Supabase
    res.json([]);
  } catch (err) {
    next(err);
  }
});

// GET /api/contractors/:id - Get contractor by ID
router.get('/:id', async (req, res, next) => {
  try {
    // TODO: Fetch from Supabase
    res.status(501).json({ error: 'Not implemented', code: 'NOT_IMPLEMENTED' });
  } catch (err) {
    next(err);
  }
});

// POST /api/contractors/:id/complete - Mark milestone complete
router.post('/:id/complete', authenticateToken, async (req, res, next) => {
  try {
    // TODO: Verify milestone completion
    // TODO: Trigger smart contract payment release
    res.status(501).json({ error: 'Not implemented', code: 'NOT_IMPLEMENTED' });
  } catch (err) {
    next(err);
  }
});

export default router;
