import { Request, Response } from 'express';
import stellarService from '../services/stellarService';
import { supabase } from '../config/database';
import { validateVote } from '../utils/validation';

export const submitVote = async (req: Request, res: Response) => {
  try {
    const { projectId, voteValue, voteIntensity, delegatedTo } = req.body;
    const userId = req.user.id; // From auth middleware
    
    // 1. Validate request
    const validation = validateVote(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    
    // 2. Check if user already voted
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', userId)
      .single();
    
    if (existingVote) {
      return res.status(400).json({ error: 'Already voted on this project' });
    }
    
    // 3. Get user wallet and verification tier
    const { data: user } = await supabase
      .from('users')
      .select('verification_tier, voting_weight, wallet:wallets(*)')
      .eq('id', userId)
      .single();
    
    // 4. Get project details
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    // 5. Calculate vote cost (quadratic if intensity > 1)
    const baseCost = project.cost_per_participant;
    const voteCost = voteIntensity > 1 
      ? baseCost * Math.pow(voteIntensity, 2)
      : baseCost;
    
    // 6. Check wallet balance
    if (user.wallet.balance < voteCost) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    // 7. Record vote on Stellar blockchain
    const txHash = await stellarService.recordVote({
      voterAddress: user.stellar_address,
      projectId,
      voteValue,
      amount: voteCost.toString(),
      contractId: process.env.GOVERNANCE_CONTRACT_ID!
    });
    
    // 8. Update database
    const { data: vote } = await supabase
      .from('votes')
      .insert({
        project_id: projectId,
        user_id: userId,
        vote_value: voteValue ? 'yes' : 'no',
        vote_intensity: voteIntensity,
        delegated_to: delegatedTo,
        amount_allocated: voteCost,
        blockchain_tx_hash: txHash
      })
      .select()
      .single();
    
    // 9. Deduct from wallet
    await supabase
      .from('wallets')
      .update({ 
        balance: user.wallet.balance - voteCost,
        lifetime_allocations: user.wallet.lifetime_allocations + voteCost
      })
      .eq('user_id', userId);
    
    // 10. Update project funding
    const newFunding = project.current_funding + voteCost;
    const newParticipants = project.current_participants + 1;
    
    await supabase
      .from('projects')
      .update({
        current_funding: newFunding,
        current_participants: newParticipants,
        current_approval_rate: calculateApprovalRate(projectId) // SQL function
      })
      .eq('id', projectId);
    
    // 11. Broadcast real-time update via WebSocket
    const io = req.app.get('io');
    io.to(`project_${projectId}`).emit('vote_update', {
      projectId,
      currentFunding: newFunding,
      participants: newParticipants
    });
    
    // 12. Check if consensus reached
    if (newFunding >= project.funding_goal) {
      // Trigger contractor assignment logic
      await assignContractorToProject(projectId);
    }
    
    res.json({ 
      success: true, 
      vote,
      transactionHash: txHash
    });
    
  } catch (error) {
    console.error('Vote submission error:', error);
    res.status(500).json({ error: 'Failed to submit vote' });
  }
};
