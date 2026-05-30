@echo off
echo 🚀 Setting up Common Good development environment...

REM Copy environment
echo ✓ Setting up environment...
copy .env.example .env.local

REM Create directories
mkdir logs
mkdir coverage

REM Install backend
echo ✓ Installing backend...
cd backend
call npm install
cd ..

REM Install frontend
echo ✓ Installing frontend...
cd frontend
call npm install
cd ..

REM Start services
echo ✓ Starting Docker services...
docker-compose up -d

echo ✅ Setup complete!
echo Next: npm run dev (in separate terminals)
pause