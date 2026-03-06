# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where students attempt assignments, write queries in Monaco Editor, and execute them against a PostgreSQL sandbox database.

## Tech Stack

- Frontend: React + Vite + SCSS + Monaco Editor
- Backend: Node.js + Express
- Sandbox DB: PostgreSQL
- Persistence DB: MongoDB Atlas (or local MongoDB)

## Project Structure

```text
CipherSQLStudio/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       └── styles/
└── backend/
    ├── routes/
    ├── controllers/
    ├── services/
    ├── middleware/
    ├── models/
    └── config/
```

## Setup

1. Install dependencies:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

2. Configure backend environment:

```bash
cp backend/.env.example backend/.env
```

3. Run development servers:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Notes

- Query execution is restricted to read-only SQL for safety.
- LLM hints use an OpenAI-compatible API key if configured.
- Seed sample assignments via `POST /api/assignments/seed`.
