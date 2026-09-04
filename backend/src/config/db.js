const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log('⚠️ MONGO_URI not provided. Backend running in in-memory seed mode.');
    return false;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`⚠️ MongoDB connection error: ${error.message}. Fallback mode active.`);
    return false;
  }
};

module.exports = connectDB;
