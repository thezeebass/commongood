# Common Good Architecture

## System Overview
```
┌─────────────────┐
│   Citizens      │
│   (Web/Mobile)  │
└────────┬────────┘
│
▼
┌─────────────────┐      ┌──────────────┐
│   React Frontend│◄────►│  WebSocket   │
└────────┬────────┘      │  (Real-time) │
│               └──────────────┘
▼
┌─────────────────┐      ┌──────────────┐
│   API Gateway   │◄────►│  Redis Cache │
│   (Express)     │      └──────────────┘
└────────┬────────┘
│
├──────────────┐──────────────┬──────────────┐
▼              ▼              ▼              ▼
┌────────┐    ┌────────┐    ┌─────────┐   ┌──────────┐
│Stellar │    │Supabase│    │AI Agent │   │  Twilio  │
│Soroban │    │   DB   │    │(Python) │   │   SMS    │
└────────┘    └────────┘    └─────────┘   └──────────┘
```

## Data Flow: Voting Process

1. User submits vote via React frontend
2. Frontend calls `/api/votes` endpoint
3. Backend validates user identity & wallet balance
4. Backend calls Stellar smart contract to record vote on-chain
5. Smart contract emits event
6. Backend updates Supabase with vote record
7. WebSocket broadcasts update to all connected clients
8. AI agent analyzes vote pattern for anomalies
9. If project reaches funding threshold, contractor payment triggered
