"use strict";
// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// let mongoServer: MongoMemoryServer | null = null;
// const connectTestDB = async (): Promise<void> => {
//   if (mongoose.connection.readyState === 1) {
//     // Connection is already established
//     return;
//   }
//   if (mongoServer) {
//     // Check if an in-memory server is already created
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri);
//     console.log('In-memory MongoDB connected');
//     return;
//   }
//   try {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri);
//     console.log('In-memory MongoDB connected');
//   } catch (error: any) {
//     console.error('Failed to connect to in-memory MongoDB:', error.message);
//     process.exit(1);
//   }
// };
// const disconnectTestDB = async (): Promise<void> => {
//   if (mongoose.connection.readyState === 1) {
//     await mongoose.disconnect();
//   }
//   if (mongoServer) {
//     await mongoServer.stop();
//     mongoServer = null;
//   }
// };
// export { connectTestDB, disconnectTestDB };
