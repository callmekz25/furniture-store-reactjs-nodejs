import { useState } from "react";
import Image from "../assets/livingRoom.png";

const Card = ({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}) => {
  return (
    <div className="flex flex-col gap-2 lg:min-w-[300px] w-auto">
      <div className="bg-[#f6f6f6] card p-5 flex flex-col items-center justify-center hover:cursor-pointer transition-all duration-300 relative">
        <img
          src={Image}
          alt="Áo khoác phao ấm"
          className="lg:w-[300px]  w-[250px] lg:h-[300px] h-[260px] object-contain  "
        />
        <div className="absolute top-3 left-3 text-sm bg-white  uppercase font-bold rounded-sm py-1 px-3">
          mới
        </div>
        <div className="absolute top-12 left-3 text-sm  bg-red-500 uppercase text-white font-bold rounded-sm py-1 px-3">
          -50%
        </div>
      </div>
      <span className="lg:text-[20px] font-bold">{name}</span>
      <span className="lg:text-[18px] font-semibold">499.999 đ</span>
    </div>
  );
};

export default Card;
