# Common Good — Direct Democracy Platform

## Architecture
Multi-service: React (3000) → Express (3001) → Soroban | Supabase | AI Agent (8000) | Twilio

## Development Environment
- Docker Compose for PostgreSQL + Redis
- 3 terminal sessions for frontend, backend, AI agent
- Soroban CLI for smart contract development
- Stellar Testnet for local development

## Key Conventions
- Smart contracts in `contracts/governance/` (Rust)
- Backend API routes in `backend/src/routes/`
- AI models in `ai-agent/src/models/`
- Frontend components in `frontend/src/components/`
- All API responses use `{success: boolean, data: any, error: string}` format

## Environment Variables
- `STELLAR_NETWORK` — testnet | mainnet
- `SUPABASE_URL` — Database connection
- `TWILIO_SID` — SMS service
- `AI_MODEL_PATH` — TensorFlow model location

## Testing
- Backend: `npm test`
- AI Agent: `pytest`
- Contracts: `cargo test`
- Integration: `bash scripts/run-tests.sh`

## Deployment Order
1. Deploy smart contracts (mainnet)
2. Update contract addresses in backend .env
3. Deploy backend (Cloud Run / VPS)
4. Deploy AI agent (Cloud Run)
5. Build and deploy frontend (Vercel / Netlify)
6. Run smoke tests

## South Africa Specific
- RICA verification required for all voters
- Phone-based auth (no email required)
- ZAR currency for funding goals
- Local contractor payment integration
