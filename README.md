# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where students can browse assignments, attempt solutions in Monaco SQL editor, run queries against a PostgreSQL sandbox, and request guided LLM hints.

## Tech Stack

- Frontend: React + Vite + SCSS + Monaco Editor
- Backend: Node.js + Express
- Sandbox Database: PostgreSQL (`pg` connection pooling)
- Persistence Database: MongoDB (`mongoose`)

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
│           ├── base/
│           ├── layout/
│           └── components/
└── backend/
        ├── routes/
        ├── controllers/
        ├── services/
        ├── middleware/
        ├── models/
        └── config/
```

## Features

- Assignment listing page with title, difficulty, and short description
- Assignment attempt page with:
    - Question panel
    - Sample data viewer (schemas + sample rows)
    - Monaco SQL editor (dark theme)
    - Query results panel
    - LLM hint panel
- SQL sandbox execution with SELECT-only validation
- MongoDB persistence for assignments and attempts
- Mobile-first SCSS architecture (variables, mixins, partials, BEM-style classes)

## API Endpoints

### Assignments

- `GET /assignments`
- `GET /assignments/:id`
- `GET /api/assignments`
- `GET /api/assignments/:id`
- `POST /api/assignments/seed`

### Query Execution

- `POST /execute-query`
- `POST /api/query/execute-query`

Successful response:

```json
{
    "success": true,
    "data": [[1]]
}
```

Validation failure response:

```json
{
    "success": false,
    "error": "Only SELECT queries are allowed"
}
```

### Hints

- `POST /hint`
- `POST /api/hints`

Hint request body:

```json
{
    "assignmentQuestion": "Find top students by average score",
    "userQueryAttempt": "SELECT student_id FROM exam_scores"
}
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

3. Ensure PostgreSQL is running and credentials in `backend/.env` are valid.

4. Run frontend and backend:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Security Notes

- SQL execution is restricted to `SELECT` statements.
- Dangerous SQL keywords are blocked (`DROP`, `DELETE`, `ALTER`, `TRUNCATE`, `INSERT`, `UPDATE`).
- Query validation middleware includes SQL injection pattern checks.
- LLM prompt rules explicitly prevent returning full SQL solutions.
