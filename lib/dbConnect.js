import mongoose from 'mongoose';
let isConnected = false;
const dbConnect = async () => {
  if (isConnected) return;
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  if (mongoose.connection.readyState >= 1) { isConnected = true; return; }
  await mongoose.connect(uri);
  isConnected = true;
  console.log('MongoDB connected');
};
export default dbConnect;
