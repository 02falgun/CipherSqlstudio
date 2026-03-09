# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where students browse assignments, write solutions in a Monaco SQL editor, execute queries against a PostgreSQL sandbox, and request guided AI hints — without ever seeing the answer.

-

## Project Structure

```text
CipherSQLStudio/
├── package.json                  # Root workspace (npm workspaces)
├── frontend/
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx               # Route definitions
│       ├── main.jsx              # React entry point
│       ├── pages/
│       │   ├── AssignmentsPage.jsx
│       │   └── AssignmentAttemptPage.jsx
│       ├── components/
│       │   ├── AssignmentCard.jsx
│       │   ├── SQLEditor.jsx     # Monaco Editor wrapper
│       │   ├── QueryResults.jsx
│       │   ├── SQLResultsTable.jsx
│       │   ├── QuestionPanel.jsx
│       │   ├── SampleDataViewer.jsx
│       │   ├── HintPanel.jsx
│       │   └── AttemptHistory.jsx
│       ├── hooks/
│       │   ├── useAssignments.js
│       │   └── useAssignmentAttempt.js
│       ├── services/
│       │   ├── apiClient.js      # fetch wrapper
│       │   ├── assignmentService.js
│       │   ├── queryService.js
│       │   └── hintService.js
│       └── styles/
│           ├── global.scss
│           ├── base/             # _variables, _reset, _mixins
│           ├── layout/           # _container, _grid
│           └── components/       # BEM partials per component
└── backend/
    ├── server.js                 # Bootstrap: MongoDB → listen
    ├── app.js                    # Express app, middleware, routes
    ├── config/
    │   ├── env.js                # dotenv config object
    │   ├── mongo.js              # Mongoose connection
    │   └── postgres.js           # pg Pool + query helper
    ├── routes/
    │   ├── assignmentRoutes.js
    │   ├── queryRoutes.js
    │   └── hintRoutes.js
    ├── controllers/
    │   ├── assignmentController.js
    │   ├── queryController.js
    │   └── hintController.js
    ├── services/
    │   ├── assignmentService.js  # CRUD + seed logic
    │   ├── queryService.js       # PostgreSQL execution + timing
    │   ├── queryValidationService.js
    │   ├── hintService.js        # OpenAI prompt + fallback
    │   └── attemptService.js     # Attempt persistence
    ├── middleware/
    │   ├── asyncHandler.js
    │   ├── errorHandler.js
    │   ├── notFoundHandler.js
    │   └── queryValidationMiddleware.js
    └── models/
        ├── Assignment.js
        └── Attempt.js
```

---

## Features

- **Assignment browser** — lists all assignments with title, difficulty badge, and short description
- **Assignment attempt page** — displays question, table schemas, sample data, and starter query
- **Monaco SQL editor** — dark-theme editor with syntax highlighting, word wrap, and auto-layout
- **Query execution** — runs SELECT queries against a live PostgreSQL sandbox; returns columns, rows, row count, and execution time in milliseconds
- **SELECT-only enforcement** — dual-layer validation (middleware + service) blocks all non-SELECT statements and dangerous keywords
- **SQL injection guards** — middleware rejects `--` comments, `/* */` blocks, multiple statements, and `UNION SELECT` patterns
- **AI hint system** — calls OpenAI Chat Completions with a system prompt that prevents full SQL answers; falls back gracefully when the API key is absent
- **Attempt history** — every query execution (success or failure) is persisted in MongoDB with the submitted query, outcome, and execution time
- **Seed endpoint** — `POST /api/assignments/seed` populates the database with three sample assignments (easy / medium / hard)

---

## API Reference

### Assignments

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/assignments` | List all assignments |
| `GET` | `/api/assignments/:id` | Get full assignment detail |
| `POST` | `/api/assignments/seed` | Seed sample assignments (`?force=true` to re-seed) |

**List response**
```json
{
  "assignments": [
    {
      "_id": "...",
      "title": "Find Top Performing Students",
      "difficulty": "easy",
      "shortDescription": "Return top 5 students with highest average score..."
    }
  ]
}
```

**Detail response**
```json
{
  "assignment": {
    "_id": "...",
    "title": "Find Top Performing Students",
    "difficulty": "easy",
    "question": "Return top 5 students...",
    "requirements": ["GROUP BY", "AVG", "ORDER BY", "LIMIT"],
    "tableSchemas": [...],
    "sampleData": [...],
    "starterQuery": "SELECT student_id, full_name, AVG(score) AS average_score FROM exam_scores GROUP BY student_id, full_name ORDER BY average_score DESC LIMIT 5;"
  }
}
```

---

### Query Execution

| Method | Path | Description |
|---|---|---|
| `POST` | `/execute-query` | Execute a SELECT query (legacy path) |
| `POST` | `/api/query/execute-query` | Execute a SELECT query |
| `POST` | `/api/query/execute` | Execute and record an attempt |

**Request**
```json
{ "query": "SELECT * FROM exam_scores LIMIT 5;" }
```

**Success response**
```json
{
  "success": true,
  "data": [
    { "student_id": 1, "full_name": "Alice Johnson", "score": "95.50" }
  ]
}
```

**Validation failure**
```json
{
  "success": false,
  "error": "Only SELECT queries are allowed"
}
```

---

### Hints

| Method | Path | Description |
|---|---|---|
| `POST` | `/hint` | Request a hint (legacy path) |
| `POST` | `/api/hints` | Request a hint |

**Request** (by question text)
```json
{
  "assignmentQuestion": "Return top 5 students by average score",
  "userQueryAttempt": "SELECT student_id FROM exam_scores"
}
```

**Request** (by assignment ID)
```json
{
  "assignmentId": "...",
  "query": "SELECT student_id FROM exam_scores"
}
```

**Response**
```json
{
  "hint": "Consider using AVG() with GROUP BY to aggregate scores per student. Then use ORDER BY and LIMIT to return only the top results.",
  "source": "llm"
}
```

`source` is `"llm"` when OpenAI responds, or `"fallback"` when the API key is missing or the request fails.

---

## Data Models

### Assignment (MongoDB)

| Field | Type | Notes |
|---|---|---|
| `title` | String | Required |
| `description` | String | Required |
| `shortDescription` | String | Auto-truncated to 140 chars for listing |
| `question` | String | Displayed on attempt page |
| `requirements` | [String] | SQL concepts required (e.g. `GROUP BY`) |
| `tableSchemas` | [Mixed] | Column definitions per table |
| `sampleData` | [Mixed] | Sample rows per table |
| `starterQuery` | String | Pre-filled editor content |
| `expectedConcepts` | [String] | Fallback for `requirements` |
| `difficulty` | enum | `easy` \| `medium` \| `hard` |

### Attempt (MongoDB)

| Field | Type | Notes |
|---|---|---|
| `assignmentId` | ObjectId | Ref: Assignment |
| `studentId` | String | Caller-supplied identifier |
| `submittedQuery` | String | Raw SQL submitted |
| `wasSuccessful` | Boolean | True if PostgreSQL executed without error |
| `executionTimeMs` | Number | Null on failure |
| `errorMessage` | String | Null on success |

---

## Environment Variables

Create `backend/.env`:

```env
NODE_ENV=development
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173

# MongoDB (required)
MONGO_URI=mongodb://localhost:27017/ciphersqlstudio

# PostgreSQL sandbox
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ciphersqlstudio_sandbox

# OpenAI (optional — fallback hint used when absent)
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

---

## Setup

**Prerequisites:** Node.js 18+, MongoDB, PostgreSQL

1. **Install all dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your credentials
   ```

3. **Start both servers concurrently:**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000
   - Health check: http://localhost:4000/health

4. **Seed sample assignments** (after backend is running):
   ```bash
   curl -X POST http://localhost:4000/api/assignments/seed
   # Re-seed: curl -X POST "http://localhost:4000/api/assignments/seed?force=true"
   ```

**Individual servers:**
```bash
npm run dev:frontend
npm run dev:backend
```

**Production build:**
```bash
npm run build   # builds frontend dist/
npm start       # starts backend only
```

---

## Security Notes

- All SQL input is validated at two independent layers: `queryValidationMiddleware` (route level) and `queryValidationService` (service level).
- Only `SELECT` statements are permitted; the query must begin with the `SELECT` keyword.
- The following keywords are explicitly blocked: `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `TRUNCATE`, `CREATE`, `GRANT`, `REVOKE`, `COPY`, `CALL`, `DO`, `VACUUM`, `ANALYZE`.
- Multiple statements (`;` mid-query) and SQL injection patterns (`--`, `/*`, `UNION SELECT`, boolean tautologies) are rejected.
- Maximum query length is 5,000 characters.
- The LLM hint system prompt instructs the model never to return complete SQL solutions or code blocks; responses are sanitized server-side before being forwarded to the client.
- CORS is restricted to `FRONTEND_ORIGIN` only; Helmet sets secure HTTP headers on all responses.
