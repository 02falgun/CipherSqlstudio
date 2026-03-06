#!/usr/bin/env bash
set -e

echo "🔧 Setting up CipherSQLStudio..."

# Install root dependencies
echo "Installing root workspace dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
npm install --prefix backend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install --prefix frontend

# Create backend .env if not present
if [ ! -f backend/.env ]; then
  echo "Creating backend/.env from .env.example..."
  cp backend/.env.example backend/.env
  echo "⚠️  Remember to configure MongoDB and PostgreSQL credentials in backend/.env"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Configure backend/.env with database credentials"
echo "  2. Start PostgreSQL sandbox: docker run --name ciphersql-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16"
echo "  3. Seed assignments: curl -X POST http://localhost:4000/api/assignments/seed"
echo "  4. Run dev servers: npm run dev"
