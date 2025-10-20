import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Documentation from "../models/Documentation.js";

const router = express.Router();

// Setup multer untuk upload file sementara ke folder /uploads
const upload = multer({ dest: "uploads/" });

/* ===========================================================
   🟩 CREATE - Tambah dokumentasi baru
   Endpoint: POST /api/documentations
   Body: form-data { title, description, image }
=========================================================== */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload ke Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "mitra_optical/docs",
    });

    // Hapus file lokal setelah diupload
    fs.unlinkSync(req.file.path);

    // Simpan data ke MongoDB
    const doc = new Documentation({
      title: req.body.title,
      description: req.body.description,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    await doc.save();
    res.status(200).json({ message: "Dokumentasi berhasil ditambahkan", doc });
  } catch (error) {
    console.error("CREATE Error:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ===========================================================
   🟨 READ - Ambil semua dokumentasi
   Endpoint: GET /api/documentations
=========================================================== */
router.get("/", async (req, res) => {
  try {
    const docs = await Documentation.find().sort({ createdAt: -1 });
    res.status(200).json(docs);
  } catch (error) {
    console.error("READ Error:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ===========================================================
   🟦 UPDATE - Edit dokumentasi berdasarkan ID
   Endpoint: PUT /api/documentations/:id
   Body: form-data { title?, description?, image? }
=========================================================== */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const doc = await Documentation.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Data tidak ditemukan" });

    let imageUrl = doc.imageUrl;
    let publicId = doc.publicId;

    // Jika ada gambar baru, hapus gambar lama dan upload yang baru
    if (req.file) {
      await cloudinary.uploader.destroy(doc.publicId);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mitra_optical/docs",
      });
      fs.unlinkSync(req.file.path);
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    // Update data
    doc.title = req.body.title || doc.title;
    doc.description = req.body.description || doc.description;
    doc.imageUrl = imageUrl;
    doc.publicId = publicId;

    await doc.save();
    res.status(200).json({ message: "Dokumentasi berhasil diupdate", doc });
  } catch (error) {
    console.error("UPDATE Error:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ===========================================================
   🟥 DELETE - Hapus dokumentasi berdasarkan ID
   Endpoint: DELETE /api/documentations/:id
=========================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Documentation.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Data tidak ditemukan" });

    // Hapus gambar dari Cloudinary
    await cloudinary.uploader.destroy(doc.publicId);

    // Hapus data dari MongoDB
    await doc.deleteOne();

    res.status(200).json({ message: "Dokumentasi berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
