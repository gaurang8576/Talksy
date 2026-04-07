import mongoose from "mongoose";

let databaseConnected = false;

export const isDatabaseConnected = () =>
  databaseConnected || mongoose.connection.readyState === 1;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MongoDB URI not found. Using in-memory fallback data.");
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    databaseConnected = true;
    console.log("MongoDB connected successfully.");
    return true;
  } catch (error) {
    databaseConnected = false;
    console.warn(`MongoDB unavailable (${error.message}). Using in-memory fallback data.`);
    return false;
  }
};

export default connectDB;
