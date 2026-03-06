import mongoose from 'mongoose';

import { env } from './env.js';

export const connectMongoDB = async () => {
  if (!env.mongoUri) {
    throw new Error('Missing MONGO_URI. Set it in backend/.env');
  }

  try {
    console.log('Connecting to MongoDB...');

    const connection = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};
