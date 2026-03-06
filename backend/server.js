import app from './app.js';
import { env } from './config/env.js';
import { connectMongoDB } from './config/mongo.js';

const bootstrap = async () => {
  await connectMongoDB();

  app.listen(env.port, () => {
    console.log(`CipherSQLStudio backend running on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
