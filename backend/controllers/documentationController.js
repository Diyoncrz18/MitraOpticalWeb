import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import Documentation from "../models/Documentation.js";

/* ===========================================================
   🟩 CREATE - Tambah dokumentasi baru
   =========================================================== */
export const createDocumentation = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "mitra_optical/docs",
    });

    fs.unlinkSync(req.file.path);

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
};

/* ===========================================================
   🟨 READ - Ambil semua dokumentasi
   =========================================================== */
export const getDocumentations = async (req, res) => {
  try {
    const docs = await Documentation.find().sort({ createdAt: -1 });
    res.status(200).json(docs);
  } catch (error) {
    console.error("READ Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ===========================================================
   🟦 UPDATE - Edit dokumentasi berdasarkan ID
   =========================================================== */
export const updateDocumentation = async (req, res) => {
  try {
    const doc = await Documentation.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Data tidak ditemukan" });

    let imageUrl = doc.imageUrl;
    let publicId = doc.publicId;

    if (req.file) {
      await cloudinary.uploader.destroy(doc.publicId);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mitra_optical/docs",
      });
      fs.unlinkSync(req.file.path);
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

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
};

/* ===========================================================
   🟥 DELETE - Hapus dokumentasi berdasarkan ID
   =========================================================== */
export const deleteDocumentation = async (req, res) => {
  try {
    const doc = await Documentation.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Data tidak ditemukan" });

    await cloudinary.uploader.destroy(doc.publicId);
    await doc.deleteOne();

    res.status(200).json({ message: "Dokumentasi berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Error:", error);
    res.status(500).json({ message: error.message });
  }
};
