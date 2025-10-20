import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }, // URL dari Cloudinary
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
