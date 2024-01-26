import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Replace with your MongoDB URI

export const connectToDatabase = () => {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
};

export const disconnectFromDatabase = () => {
  mongoose.disconnect()
    .then(() => console.log('MongoDB disconnected successfully'))
    .catch(err => console.error('MongoDB disconnection error:', err));
};