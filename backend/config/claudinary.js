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

    // Tes koneksi dengan upload dummy (optional)
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      { folder: "test_connection", public_id: "connection_check" }
    );

    console.log("☁️  Cloudinary connected successfully!");
    console.log("🖼️  Test upload URL:", result.secure_url);
  } catch (err) {
    console.error("❌ Cloudinary connection error:", err.message);
  }
};

export default connectCloudinary;
