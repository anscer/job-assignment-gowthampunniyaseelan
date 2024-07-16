import mongoose, { Mongoose } from 'mongoose';

let mongooseInstance: Mongoose | null = null;

const connectDB = async (): Promise<Mongoose> => {
  if (mongooseInstance) {
    return mongooseInstance;
  }

  try {
    mongooseInstance = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/robotics');
    console.log('MongoDB connected');
    return mongooseInstance;
  } catch (error: any) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
