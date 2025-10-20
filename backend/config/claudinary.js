import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const connectCloudinary = async () => {
  try {
    // Konfigurasi Cloudinary dari file .env
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("☁️  Cloudinary connected successfully!");
    console.log("🖼️  Test upload URL:", result.secure_url);
  } catch (err) {
    console.error("❌ Cloudinary connection error:", err.message);
  }
};

export default connectCloudinary;   
