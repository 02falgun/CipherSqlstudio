import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { asyncHandler } from './middleware/asyncHandler.js';
import { validateSqlQuery } from './middleware/queryValidationMiddleware.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import hintRoutes from './routes/hintRoutes.js';
import { executeQuery } from './controllers/queryController.js';
import { getQueryHint } from './controllers/hintController.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: false
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/assignments', assignmentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/hints', hintRoutes);

app.use('/assignments', assignmentRoutes);
app.post('/execute-query', validateSqlQuery, executeQuery);
app.post('/hint', asyncHandler(getQueryHint));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
