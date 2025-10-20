import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to Mitra Optical Backend!");
});

const startServer = async () => {
  await connectDB(); // Connect to MongoDB
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
