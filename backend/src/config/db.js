import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
  try {
    mongoose.set("strictQuery", true); // or false, depending on preference

    const status = await mongoose.connect(config.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${status.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
