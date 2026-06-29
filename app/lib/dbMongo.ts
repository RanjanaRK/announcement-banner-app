import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://sparkle042000_db_user:sparkleshopify@cluster0.foxywbp.mongodb.net/?appName=Cluster0",
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectDB;
