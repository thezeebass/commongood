# Getting Started with Common Good

## Prerequisites

- Node.js 18+
- Python 3.9+
- Rust 1.70+
- Docker & Docker Compose
- Git

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/thezeebass/commongood.git
cd common-good
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
cp .env.example .env
```

#### AI Agent
```bash
cd ../ai-agent
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

#### Smart Contracts
```bash
cd ../contracts
cargo build
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Setup Supabase

1. Create a Supabase project at https://supabase.com
2. Run migrations:
```bash
cd database/supabase
supabase db push < migrations/001_initial_schema.sql
supabase db push < migrations/002_add_contractors.sql
supabase db push < migrations/003_add_milestones.sql
supabase db push < migrations/004_add_consensus_rounds.sql
```

3. Seed demo data:
```bash
supabase db push < seed/demo_users.sql
supabase db push < seed/demo_projects.sql
supabase db push < seed/demo_agents.sql
```

### 4. Environment Configuration

Create `.env` files in each service:

**backend/.env**
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
SUPABASE_URL=https://[project].supabase.co
SUPABASE_KEY=[anon-key]
STELLAR_NETWORK=testnet
GOVERNANCE_CONTRACT_ID=[contract-id]
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
```

**ai-agent/.env**
```env
FASTAPI_ENV=development
BACKEND_URL=http://localhost:3000
```

### 5. Deploy Smart Contracts to Stellar Testnet

```bash
cd scripts
chmod +x deploy-contracts.sh
./deploy-contracts.sh
```

This will:
- Compile Rust contracts
- Deploy to Stellar testnet
- Output contract IDs to `.env`

### 6. Run Full Stack

```bash
docker-compose up
```

Or run services individually:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - AI Agent:**
```bash
cd ai-agent
python src/main.py
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

## Testing

```bash
# Run all tests
./scripts/run-tests.sh

# Backend tests
cd backend && npm test

# Contract tests
cd contracts && cargo test
```

## API Documentation

Once backend is running, visit:
- Swagger UI: http://localhost:3000/api-docs
- API Reference: [docs/API_REFERENCE.md](./docs/API_REFERENCE.md)

## Architecture Overview

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for system design and data flow.

## Troubleshooting

### Smart Contract Deployment Issues
- Ensure you have testnet XLM in your account
- Check Stellar documentation: https://developers.stellar.org

### Supabase Connection Failed
- Verify DATABASE_URL environment variable
- Check firewall rules

### WebSocket Connection Issues
- Ensure frontend FRONTEND_URL matches backend configuration
- Check CORS settings

## Contributing

See [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](./LICENSE) file
