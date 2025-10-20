import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Product from "../models/Product.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ CREATE (Tambah Produk)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Gambar produk wajib diunggah" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "mitra_optical/products",
    });

    // Hapus file sementara dari folder uploads/
    fs.unlinkSync(req.file.path);

    const product = new Product({
      name: req.body.name,
      price: parseFloat(req.body.price),
      image: result.secure_url,
      publicId: result.public_id,
    });

    await product.save();

    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      product,
    });
  } catch (error) {
    console.error("CREATE Error:", error);
    res.status(500).json({
      message: "Gagal menambahkan produk",
      error: error.message,
    });
  }
});

// ✅ READ (Ambil Semua Produk)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("READ Error:", error);
    res.status(500).json({
      message: "Gagal mengambil data produk",
      error: error.message,
    });
  }
});

// ✅ UPDATE (Edit Produk)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    let image = product.image;
    let publicId = product.publicId;

    // Jika ada gambar baru, hapus yang lama dan upload yang baru
    if (req.file) {
      await cloudinary.uploader.destroy(product.publicId);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mitra_optical/products",
      });
      fs.unlinkSync(req.file.path);
      image = result.secure_url;
      publicId = result.public_id;
    }

    // Update data produk
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.image = image;
    product.publicId = publicId;

    await product.save();

    res.status(200).json({
      message: "Produk berhasil diperbarui",
      product,
    });
  } catch (error) {
    console.error("UPDATE Error:", error);
    res.status(500).json({
      message: "Gagal memperbarui produk",
      error: error.message,
    });
  }
});

// ✅ DELETE (Hapus Produk)
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    // Hapus gambar dari Cloudinary
    await cloudinary.uploader.destroy(product.publicId);

    // Hapus dari MongoDB
    await product.deleteOne();

    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Error:", error);
    res.status(500).json({
      message: "Gagal menghapus produk",
      error: error.message,
    });
  }
});

export default router;
