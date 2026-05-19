import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { validateVote } from '../utils/validation';

const router = Router();

// POST /api/votes - Submit a vote
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const validation = validateVote(req.body);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    // TODO: Check if already voted
    // TODO: Validate wallet balance
    // TODO: Call Stellar smart contract
    // TODO: Record in Supabase
    // TODO: Broadcast via WebSocket

    res.status(201).json({
      id: 'mock-vote-id',
      projectId: req.body.projectId,
      userId: req.user?.id,
      voteValue: req.body.voteValue ? 'yes' : 'no',
      voteIntensity: req.body.voteIntensity,
      delegatedTo: req.body.delegatedTo,
      amountAllocated: 0,
      blockchainTxHash: 'mock-tx-hash',
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/votes/:projectId - Get voting stats
router.get('/:projectId', async (req, res, next) => {
  try {
    // TODO: Aggregate from Supabase
    res.json({
      projectId: Number(req.params.projectId),
      yesVotes: 0,
      noVotes: 0,
      totalFunding: 0,
      participants: 0,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
