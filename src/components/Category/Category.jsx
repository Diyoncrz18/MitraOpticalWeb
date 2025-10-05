import React from "react";
import Image1 from "../../assets/category/earphone.png";
import Image2 from "../../assets/category/watch.png";
import Image3 from "../../assets/category/photo2.png";
import Image4 from "../../assets/hero/headphone.png";
import Button from "../Shared/Button.jsx";

const Category = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-gray-300/90 to-gray-100 text-white rounded-3xl relative h-[320px] flex items-end transition-transform duration-300 hover:scale-105">
            <div>
              <div className="mb-4">  

                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Marc Jacobs
                </p>
                <Button
                  text="Baru"
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </div>
            </div>
            <img src={Image2} alt="" className="w-[320px] absolute lg:top-[40px]" />
          </div>

          <div className="py-10 pl-5 bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white rounded-3xl relative h-[320px] flex items-end transition-transform duration-300 hover:scale-105">
            <div>
              <div className="mb-4">
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Marc Jacobs
                </p>
                <Button
                  text="Baru"
                  bgColor={"bg-white"}
                  textColor={"text-brandYellow"}
                />
              </div>
            </div>
            <img
              src={Image2}
              alt=""
              className="w-[320px] absolute lg:top-[40px]"
            />
          </div>

          {/* Third Col */}
          <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end transition-transform duration-300 hover:scale-105">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Wujudkan</p>
                <p className="text-2xl font-semibold mb-[2px]">Impianmu</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2 ">
                  Tranding Glasses
                </p>
                <Button
                  text="Baru"
                  bgColor={"bg-white"}
                  textColor={"text-primary"}
                />
              </div>
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[575px] absolute top-1/2 -translate-y-1/2 -right-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
