import { performance } from 'node:perf_hooks';

import { sandboxPool } from '../config/postgres.js';
import { validateQuerySafety } from './queryValidationService.js';

export const executeSandboxQuery = async (rawQuery) => {
  const safeQuery = validateQuerySafety(rawQuery);

  const startedAt = performance.now();
  const result = await sandboxPool.query({
    text: safeQuery,
    rowMode: 'array'
  });
  const endedAt = performance.now();

  return {
    columns: result.fields.map((field) => field.name),
    rows: result.rows,
    rowCount: result.rowCount,
    executionTimeMs: Number((endedAt - startedAt).toFixed(2))
  };
};
