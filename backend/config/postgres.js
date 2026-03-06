import { Pool } from 'pg';

import { env } from './env.js';

export const sandboxPool = new Pool({
  host: env.postgres.host,
  port: env.postgres.port,
  user: env.postgres.user,
  password: env.postgres.password,
  database: env.postgres.database,
  max: 10,
  idleTimeoutMillis: 30000
});

sandboxPool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error.message);
});

export const query = (...args) => sandboxPool.query(...args);
