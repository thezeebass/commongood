# API Reference

## Authentication Endpoints

### POST /api/auth/register
Register new user with RICA verification
```json
{
  "phone": "+1234567890",
  "name": "User Name",
  "email": "user@example.com"
}
```

### POST /api/auth/verify
Verify OTP from SMS
```json
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

## Voting Endpoints

### POST /api/votes
Submit a vote on a project
```json
{
  "projectId": 1,
  "voteValue": true,
  "voteIntensity": 2,
  "delegatedTo": null
}
```

### GET /api/votes/:projectId
Get voting statistics for a project

## Project Endpoints

### GET /api/projects
List all active projects

### POST /api/projects
Create new project (admin only)
```json
{
  "title": "Project Title",
  "description": "Description",
  "fundingGoal": 50000,
  "deadline": "2026-06-18T00:00:00Z"
}
```

## Agent Endpoints

### POST /api/agents/analyze/fraud
Detect suspicious voting patterns
```json
{
  "votes": [...]
}
```

### POST /api/agents/optimize/proposal
Suggest proposal modifications for consensus
```json
{
  "projectId": 1,
  "currentProposal": {...},
  "votingHistory": [...]
}
```

### POST /api/agents/optimize/budget
Optimize budget allocation across projects
```json
{
  "totalBudget": 100000,
  "projects": [...],
  "constraints": {...}
}
```
