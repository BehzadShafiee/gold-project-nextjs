import mongoose from 'mongoose';
import { mongoUrl, port } from './config.js';

let initialized = false;

export const connect = async () => {
  mongoose.set('strictQuery', true);
  if (initialized) {
    console.log('Already connected to DB');
    return;
  }
  try {
    await mongoose.connect(mongoUrl, {
      dbName: 'gold-project-next',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to DB, port: ${port}`);
    initialized = true;
  } catch (error) {
    console.log('Error connecting to DB:', error);
  }
};