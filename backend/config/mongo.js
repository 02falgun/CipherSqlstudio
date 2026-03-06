import mongoose from 'mongoose';

import { env } from './env.js';

export const connectMongo = async () => {
  if (!env.mongoUri) {
    throw new Error('Missing MONGODB_URI. Set it in backend/.env');
  }

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000
  });

  console.log('Connected to MongoDB');
};
