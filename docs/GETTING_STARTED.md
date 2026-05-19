# Getting Started with Common Good

## Repository Setup

### 1. Clone Repository
```bash
git clone https://github.com/thezeebass/commongood.git
cd commongood
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
cd ..
```

#### AI Agent
```bash
cd ai-agent
pip install -r requirements.txt
cd ..
```

#### Frontend
```bash
cd frontend
npm install
cd ..
```

### 3. Environment Setup

Create `.env` files for each service:

#### backend/.env
```
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

DATABASE_URL=postgresql://...
SUPABASE_KEY=your_supabase_key
SUPABASE_URL=your_supabase_url

STELLAR_NETWORK=testnet
GOVERNANCE_CONTRACT_ID=your_contract_id
VOTER_SECRET_KEY=your_secret_key

REDIS_URL=redis://localhost:6379

TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token

JWT_SECRET=your_jwt_secret
```

#### ai-agent/.env
```
FASTAPI_ENV=development
AI_AGENT_PORT=8000
BACKEND_URL=http://localhost:3000

DATABASE_URL=postgresql://...
```

#### frontend/.env
```
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

### 4. Database Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your Database URL and API key

#### Run Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref your_project_ref

# Run migrations
supabase db push
```

### 5. Stellar Smart Contracts

#### Install Soroban CLI
```bash
curl --proto '=https' --tlsv1.2 -sSf https://install.stellar.org/soroban-cli | sh
```

#### Deploy Governance Contract
```bash
cd contracts/governance
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/governance.wasm --network testnet
```

### 6. Start Development Stack

#### Option 1: Docker Compose (Recommended)
```bash
docker-compose up
```

This will start:
- Backend (Express.js) on port 3000
- Frontend (React) on port 5173
- AI Agent (FastAPI) on port 8000
- PostgreSQL database
- Redis cache

#### Option 2: Manual Start

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - AI Agent:
```bash
cd ai-agent
python src/main.py
```

Terminal 3 - Frontend:
```bash
cd frontend
npm run dev
```

### 7. Verify Setup

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- AI Agent: http://localhost:8000

### 8. Load Demo Data

```bash
bash scripts/seed-data.sh
```

## Next Steps

1. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. Check [API_REFERENCE.md](./API_REFERENCE.md) for backend endpoints
3. Review [SMART_CONTRACT_SPEC.md](./SMART_CONTRACT_SPEC.md) for contract details
4. See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines

## Troubleshooting

### Port Already in Use
```bash
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:5173 | xargs kill -9  # Frontend
lsof -ti:8000 | xargs kill -9  # AI Agent
```

### Database Connection Issues
- Verify Supabase credentials in `.env`
- Check database is accessible: `psql postgres://...`
- Run migrations again: `supabase db push`

### Stellar Contract Issues
- Verify contract ID in `.env`
- Check account has sufficient XLM for testnet
- Use [Stellar Lab](https://lab.stellar.org) for debugging

## Development Commands

```bash
bash scripts/run-tests.sh
bash scripts/deploy-contracts.sh
bash scripts/seed-data.sh
bash scripts/setup-dev.sh
```
