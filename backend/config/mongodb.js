import mongoose from "mongoose";

const connectDB = async () => {
  const url = `${process.env.DB_BASE_URL}/${process.env.DB_NAME}`;
  console.log("🧠 Connecting to MongoDB at:", url);

  try {
    await mongoose.connect(url);
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
};

export default connectDB;
