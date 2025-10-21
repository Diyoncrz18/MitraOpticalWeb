// backend/controllers/productController.js
import Product from "../models/Product.js";

// CREATE product
export const createProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, publicId } = req.body;

    // Validasi
    if (!title || !price || !imageUrl || !publicId) {
      return res.status(400).json({
        message: "Semua field wajib: title, price, imageUrl, publicId",
      });
    }

    // Pastikan price adalah number
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ message: "Price harus berupa angka positif" });
    }

    const newProduct = new Product({
      title,
      price: priceNum,
      imageUrl,
      publicId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, imageUrl, publicId } = req.body;

    if (!title || !price || !imageUrl || !publicId) {
      return res.status(400).json({
        message: "Semua field wajib: title, price, imageUrl, publicId",
      });
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ message: "Price harus berupa angka positif" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, price: priceNum, imageUrl, publicId },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};