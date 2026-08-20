const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('MongoDB URI not configured. Running without database.');
    return null;
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.log('Running without database. Set MONGODB_URI in .env to enable.');
    return null;
  }
};

module.exports = connectDB;
