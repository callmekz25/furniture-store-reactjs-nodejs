import IProduct from "@/interfaces/product.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";

import { memo, useState } from "react";
const Card = ({ product }: { product: IProduct }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  if (!product || !product.images) {
    return <p>Loading....</p>;
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full px-2 overflow-hidden">
      <div
        className="bg-white overflow-hidden rounded-md  flex flex-col items-center justify-center  h-full "
        style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
      >
        <div
          className="flex w-full overflow-hidden hover:cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={product?.images[0]}
            alt={product.title}
            className="max-w-full object-contain min-w-full transition-all duration-300"
            style={{
              transform: isHover ? "translateX(-100%)" : "translateX(0)",
            }}
          />
          <img
            src={product?.images[1]}
            alt={product.title}
            className="max-w-full object-contain min-w-full transition-all duration-500"
            style={{
              transform: isHover ? "translateX(-100%)" : "translateX(0)",
            }}
          />
        </div>
        {/* <img
          src={product?.images[0]}
          alt={product.title}
          className="max-w-full object-contain  "
        /> */}

        <div className="  px-3.5 py-2.5 w-full min-h-[118px]">
          <h2 className="text-center uppercase mb-1 font-mednum text-[12px] text-gray-500">
            {product.brand}
          </h2>
          <p className="text-sm font-medium text-center line-clamp-2 overflow-hidden mb-1.5 ">
            {product.title}
          </p>
          <p className="flex items-center gap-2 justify-center  pb-2.5 ">
            <span className="text-sm font-semibold text-center text-red-600">
              {formatPriceToVND(product.price)}
            </span>
            <span className="text-sm font-normal text-center text-gray-400 line-through">
              {product.fakePrice > 0 ? formatPriceToVND(product.fakePrice) : ""}
            </span>
            <span></span>
          </p>
        </div>

        <div className="absolute top-2 left-2 text-[12px] bg-red-500 uppercase text-white font-medium rounded-sm py-1 px-2">
          -50%
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
