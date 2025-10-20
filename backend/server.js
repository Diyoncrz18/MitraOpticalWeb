import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/claudinary.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import documentationRoutes from "./routes/documentationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Gunakan routes sebelum server dijalankan
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/documentations", documentationRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Mitra Optical Backend!");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // 🧠 Connect MongoDB
  await connectCloudinary(); // ☁️ Connect Cloudinary
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
