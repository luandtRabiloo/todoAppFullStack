import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log('object',process.env.MONGODB_CONNECTION);
    await mongoose.connect(process.env.MONGODB_CONNECTION ?? "");
    console.log("connect successfully");
  } catch (error) {
    console.log("connect error");
    console.log("connectDB error", error);
    process.exit(1);
  }
};
