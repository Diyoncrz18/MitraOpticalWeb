import React from "react";
import Image1 from "../../assets/category/vr.png";
import Image2 from "../../assets/category/speaker.png";
import Image3 from "../../assets/category/gaming.png";  
import Image4 from "../../assets/category/macbook.png";
import Button from "../Shared/Button.jsx";

const Category = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Laptop Card */}
          <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-gray-300/90 to-gray-100 text-white rounded-3xl relative h-[320px] flex items-end transition-transform duration-300 hover:scale-105">
            <div>
              <div className="mb-4">

                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Ted Bakers
                </p>
                <Button
                  text="Baru"
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </div>
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[572px] absolute top-1/2 -translate-y-1/2 -right-0"
            />
          </div>

          {/* Earphone Card */}
          <div className="py-10 pl-5 bg-gradient-to-br from-brandGreen/90 to-brandGreen/90 text-white rounded-3xl relative h-[320px] flex items-end transition-transform duration-300 hover:scale-105">
            <div>
              <div className="mb-20">
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Ted Baker
                </p>
                {/* <Button
                  text="Baru"
                  bgColor={"bg-white"}
                  textColor={"text-brandGreen"}
                /> */}
              </div>
            </div>
            <img src={Image1} alt="" className="w-[300px] absolute bottom-0" />
          </div>

          {/* Gadget Card */}
          <div className="py-10 pl-5 bg-gradient-to-br from-brandBlue to-brandBlue/90 text-white rounded-3xl relative h-[320px] flex items-end transition-transform duration-300 hover:scale-105">
            <div>
              <div className="mb-20">
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Teg Heuer
                </p>
                {/* <Button
                  text="Baru"
                  bgColor={"bg-white"}
                  textColor={"text-brandBlue"}
                /> */}
              </div>
            </div>
            <img
              src={Image4}
              alt=""
              className="w-[300px] absolute bottom-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
