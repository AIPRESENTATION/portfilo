import mongoose from 'mongoose';
import { resolveMongoUri } from './resolveMongoUri.js';

const connectDB = async () => {
  try {
    const uri = await resolveMongoUri();
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
