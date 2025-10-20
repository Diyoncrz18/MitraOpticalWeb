import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"; // ⬅️ ini penting untuk kirim buffer ke stream

const router = express.Router();

// setup multer untuk menerima file dari form-data (langsung di memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// endpoint POST /upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload ke Cloudinary pakai Promise agar bisa ditunggu (await)
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Kirim file buffer ke Cloudinary
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(200).json({
      message: "Upload success",
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
