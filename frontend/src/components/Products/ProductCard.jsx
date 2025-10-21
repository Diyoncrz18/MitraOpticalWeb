import React from "react";
import Button from "../Shared/Button.jsx";

const ProductCard = ({ data, handleOrderPopup }) => {
  return (
    <div className="mb-10 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {data.map((item) => (
          <div
            data-aos="fade-up"
            data-aos-delay={item.aosDelay || "0"}
            className="group"
            key={item._id || item.id}
          >
            <div className="relative">
              <img
                src={item.imageUrl || "/placeholder.jpg"} // ✅ DIPERBAIKI
                alt={item.title || item.name || "Produk"}
                className="h-[280px] w-[360px] object-cover rounded-md"
              />
              <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
                <Button
                  text="Pesan"
                  bgColor="bg-primary"
                  textColor="text-white"
                  handler={() => handleOrderPopup(item)}
                />
              </div>
            </div>

            <div className="leading-7 mt-3 text-center">
              <h2 className="font-semibold">{item.title || item.name || "Tanpa Judul"}</h2> {/* ✅ DIPERBAIKI */}
              <h2 className="font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(item.price)}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;