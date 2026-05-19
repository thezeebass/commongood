export type Project = {
  id: number
  title: string
  description: string
  fundingGoal: number
  currentFunding: number
  participants: number
  approvalRate: number
  deadline: string
  status: 'active' | 'funded' | 'completed' | 'failed'
}

export type Vote = {
  id: number
  projectId: number
  userId: string
  voteValue: 'yes' | 'no'
  voteIntensity: number
  amount: number
  timestamp: string
  blockchainTxHash: string
}

export type User = {
  id: string
  name: string
  email: string
  phone: string
  verificationTier: string
  votingWeight: number
  createdAt: string
}
