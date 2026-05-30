#!/bin/bash

echo "🚀 Setting up Common Good development environment..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js required"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker required"; exit 1; }

# Copy environment
echo "✓ Setting up environment..."
cp .env.example .env.local

# Create directories
mkdir -p logs coverage

# Install backend
echo "✓ Installing backend..."
cd backend && npm install && cd ..

# Install frontend
echo "✓ Installing frontend..."
cd frontend && npm install && cd ..

# Start services
echo "✓ Starting Docker services..."
docker-compose up -d

echo "✅ Setup complete!"
echo "Next: npm run dev (in separate terminals)"