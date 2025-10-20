import React from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

import Img1 from "../../assets/product/p-1.jpg";
import Img2 from "../../assets/product/p-1.jpg";
import Img3 from "../../assets/product/p-1.jpg";
import Img4 from "../../assets/product/p-1.jpg";
import Img5 from "../../assets/product/p-1.jpg";
import Img6 from "../../assets/product/p-1.jpg";
import Img7 from "../../assets/product/p-1.jpg";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Boat Headphone",
    price: 1200000, // ✅ ubah ke number (bukan string)
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Rocky Mountain",
    price: 2200000,
    aosDelay: "200",
  },
  { id: 3, img: Img3, title: "Goggles", price: 3200000, aosDelay: "400" },
  { id: 4, img: Img4, title: "Printed", price: 2200000, aosDelay: "600" },
];

const ProductsData2 = [
  {
    id: 5,
    img: Img5,
    title: "Boat Headphone",
    price: 1200000,
    aosDelay: "0",
  },
  {
    id: 6,
    img: Img6,
    title: "Rocky Mountain",
    price: 3200000,
    aosDelay: "200",
  },
  { id: 7, img: Img7, title: "Goggles", price: 2200000, aosDelay: "400" },
  { id: 8, img: Img5, title: "Printed", price: 1200000, aosDelay: "600" },
];

const Products = ({ handleOrderPopup, isLoggedIn, handleLoginPopup }) => {
  // ✅ Hapus state yang tidak perlu
  const handleOrderPopupWithProduct = (product) => {
    if (!isLoggedIn) {
      handleLoginPopup();
    } else {
      // ✅ Kirim produk ke App.jsx
      handleOrderPopup(product);
    }
  };

  return (
    <div id="shop">
      <div className="container">
        <Heading title="Produk Kami" subtitle="Telusuri Produk" />
        <ProductCard
          data={ProductsData}
          handleOrderPopup={handleOrderPopupWithProduct}
        />
        <ProductCard
          data={ProductsData2}
          handleOrderPopup={handleOrderPopupWithProduct}
        />
      </div>
    </div>
  );
};

export default Products;
