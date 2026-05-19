export interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  verificationTier: number;
  votingWeight: number;
  stellarAddress: string;
  createdAt: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  lifetimeAllocations: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  fundingGoal: number;
  currentFunding: number;
  currentParticipants: number;
  currentApprovalRate: number;
  costPerParticipant: number;
  deadline: string;
  status: 'active' | 'funded' | 'completed' | 'failed';
  contractor?: string;
  milestones: Milestone[];
  createdAt: string;
}

export interface Milestone {
  id: number;
  projectId: number;
  title: string;
  description: string;
  paymentAmount: number;
  completionApproved: boolean;
  paid: boolean;
}

export interface Vote {
  id: string;
  projectId: number;
  userId: string;
  voteValue: 'yes' | 'no';
  voteIntensity: number;
  delegatedTo: string | null;
  amountAllocated: number;
  blockchainTxHash: string;
  createdAt: string;
}

export interface VotePattern {
  userId: string;
  projectId: number;
  voteValue: boolean;
  timestamp: string;
  amount: number;
  voteIntensity?: number;
}

export interface FraudAnalysis {
  riskScore: number;
  suspicious: boolean;
  indicators: string[];
  recommendations: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}
