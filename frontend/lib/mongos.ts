import mongoose from "mongoose";

const mongos_url = process.env.MONGO_URI;
if (!mongos_url) {
  throw new Error("No MongoDB connection string found");
}

export const connectionDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(mongos_url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
