# Smart Contract Specification

## Governance Contract

### Contract Address
Deployed on Stellar Testnet/Mainnet

### Key Functions

#### vote(voter, projectId, voteValue, amount)
Record a vote on the blockchain

**Parameters:**
- `voter`: Address of voting user
- `projectId`: Project being voted on (u64)
- `voteValue`: Direction of vote (bool - true=yes, false=no)
- `amount`: Amount of funds allocated (i128)

**Events:**
- `vote_cast`: Emitted when vote is recorded

#### check_consensus(projectId)
Check if project reached consensus threshold

**Returns:** bool

#### release_milestone_payment(projectId, milestoneId, contractor)
Release funds to contractor upon milestone completion

**Events:**
- `payment_released`: Emitted when funds transferred

### Data Structures

```rust
struct Vote {
    voter: Address,
    project_id: u64,
    vote_value: bool,
    amount: i128,
    timestamp: u64
}

struct Project {
    id: u64,
    yes_votes: u64,
    no_votes: u64,
    total_funding: i128,
    consensus_threshold: u32
}
```

### Security Considerations

1. **Identity Verification**: Only users with proof-of-personhood can vote
2. **Fund Escrow**: Votes are escrowed, released only after consensus
3. **Milestone Tracking**: Payments require completion verification
4. **Consensus Checking**: Automatic trigger when threshold reached
