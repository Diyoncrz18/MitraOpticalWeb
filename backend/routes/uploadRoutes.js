import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const router = express.Router();

// Konfigurasi multer (menyimpan file sementara di folder 'uploads')
const upload = multer({ dest: "uploads/" });

// Endpoint upload file
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "mitra_optical", // nama folder di Cloudinary
    });

    // Hapus file sementara dari server
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Upload berhasil!",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal upload", error: error.message });
  }
});

export default router;
