# Getting Started with Common Good

## Prerequisites

- Node.js 20+
- Python 3.10+
- Rust 1.70+
- Docker & Docker Compose
- Git

## Local Development Setup

### 1. Clone the Repository

\`\`\`bash
cd C:\Users\a\Documents\GitHub
git clone https://github.com/thezeebass/commongood.git
cd commongood
\`\`\`

### 2. Setup Environment Variables

\`\`\`bash
copy .env.example .env.local
# Edit .env.local with your actual values
\`\`\`

### 3. Start Docker Services

\`\`\`bash
docker-compose up -d
\`\`\`

Verify services are running:
\`\`\`bash
docker-compose ps
\`\`\`

### 4. Install Frontend Dependencies

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Frontend will be at: http://localhost:3000

### 5. Install Backend Dependencies (New Terminal)

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

Backend will be at: http://localhost:3001

### 6. Install AI Agent Dependencies (New Terminal)

\`\`\`bash
cd ai-agent
pip install -r requirements.txt
python -m uvicorn src.main:app --reload
\`\`\`

AI Agent will be at: http://localhost:8000

## Stopping Services

\`\`\`bash
docker-compose down
\`\`\`

## Common Commands

\`\`\`bash
# Build projects
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
\`\`\`

## Troubleshooting

### Port Already in Use
Change ports in docker-compose.yml or .env.local

### Database Connection Refused
Ensure postgres service is running: `docker-compose logs postgres`

### Node Modules Issues
Delete node_modules and reinstall:
\`\`\`bash
rm -r node_modules
npm install
\`\`\`