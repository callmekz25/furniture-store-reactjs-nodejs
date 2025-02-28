import CardProduct from "./CardProduct";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useCheckScreen from "@/hooks/useCheckScreen";
const NewArrival = () => {
  const isMobile = useCheckScreen();
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
    { id: 6, name: "Product 6" },
    { id: 7, name: "Product 7" },
    { id: 8, name: "Product 8" },
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const nextSlider = () => {
    if (currentIndex != products.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prevSlider = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mt-6 px-4 md:px-0">
      <div className="flex items-center justify-between py-8">
        <h3 className="font-bold text-3xl">Sản phẩm mới</h3>
        <div className="flex items-center gap-2">
          <button
            className={` flex items-center justify-center  bg-gray-200 size-8 rounded-full hover:bg-gray-400 transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed hover:bg-gray-200"
                : ""
            } ${isMobile ? "hidden" : ""}`}
            onClick={() => prevSlider()}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            className={` flex items-center justify-center  bg-gray-200 size-8 rounded-full hover:bg-gray-400 transition-all duration-300 ${
              currentIndex === products.length - 5
                ? "cursor-not-allowed hover:bg-gray-200 opacity-40"
                : ""
            } ${isMobile ? "hidden" : ""}`}
            onClick={() => nextSlider()}
            disabled={currentIndex === products.length - 5}
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden w-full">
        {/* Container chứa các sản phẩm */}
        <div
          className={`flex  transition-transform duration-500 ease-in-out ${
            isMobile ? "grid scroll-slides" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * 20}%)`,
            width: `calc(100%)`, // Đảm bảo chiều rộng đủ chứa tất cả slides
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="lg:w-[20%] w-auto flex-shrink-0 pr-2"
            >
              <CardProduct />
            </div>
          ))}
        </div>
      </div>
      <button className="flex border-b border-black pb-1 items-center gap-2 font-semibold text-[14px] lg:text-[18px]">
        Xem thêm <ChevronRightIcon className="size-4 lg:size-6" />
      </button>
    </div>
  );
};

export default NewArrival;
