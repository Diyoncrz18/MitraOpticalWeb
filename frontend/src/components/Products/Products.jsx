import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

const Products = ({ handleOrderPopup, isLoggedIn, handleLoginPopup }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Ambil data produk dari backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Jika belum login, munculkan popup login dulu
  const handleOrderPopupWithProduct = (product) => {
    if (!isLoggedIn) {
      handleLoginPopup();
    } else {
      handleOrderPopup(product);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Memuat produk...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Tidak ada produk yang tersedia.
      </div>
    );
  }

  return (
    <div id="shop">
      <div className="container">
        <Heading title="Produk Kami" subtitle="Telusuri Produk" />
        <ProductCard
          data={products}
          handleOrderPopup={handleOrderPopupWithProduct}
        />
      </div>
    </div>
  );
};

export default Products;
