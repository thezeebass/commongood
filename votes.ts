import { apiGet, apiPost } from './client';
import type { Vote, VotePattern, FraudAnalysis } from '@/types';

interface SubmitVoteData {
  projectId: number;
  voteValue: boolean;
  voteIntensity: number;
  delegatedTo: string | null;
}

interface VoteStats {
  projectId: number;
  yesVotes: number;
  noVotes: number;
  totalFunding: number;
  participants: number;
}

export async function submitVote(data: SubmitVoteData): Promise<Vote> {
  return apiPost<Vote>('/api/votes', data);
}

export async function getVoteStats(projectId: number): Promise<VoteStats> {
  return apiGet<VoteStats>(`/api/votes/${projectId}`);
}

export async function analyzeFraud(votes: VotePattern[]): Promise<FraudAnalysis> {
  return apiPost<FraudAnalysis>('/api/agents/analyze/fraud', { votes });
}
