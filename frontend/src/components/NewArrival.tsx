import CardProduct from "./CardProduct";
import "../App.css";
import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
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
    if (currentIndex != products.length - 4) {
      setCurrentIndex(currentIndex + 1);
      console.log(currentIndex);
    }
  };
  const prevSlider = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between py-8">
        <h3 className="font-bold text-3xl">Sản phẩm mới</h3>
        <button className="flex border-b border-black pb-1 items-center gap-2 font-semibold text-[14px] lg:text-[18px]">
          Xem thêm <ArrowRightIcon className="size-4 lg:size-6" />
        </button>
      </div>
      <div className="relative ">
        <button
          className={`absolute flex items-center justify-center left-[-20px] z-10 top-1/2 -translate-y-1/2 bg-gray-300 size-14 rounded-full hover:bg-gray-400 transition-all duration-300 ${
            currentIndex === 0 ? "hidden" : ""
          } ${isMobile ? "hidden" : ""}`}
          onClick={() => prevSlider()}
        >
          <ArrowLeftIcon className="size-7" />
        </button>
        <div className="overflow-hidden">
          <div
            className={`mt-2   gap-4 flex items-center transition-all duration-500 ease-in-out   ${
              isMobile ? "grid scroll-slides" : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * (300 + 16)}px)`,
            }}
          >
            {products.map((product) => (
              <CardProduct key={product.id} name={product.name} />
            ))}
          </div>
        </div>
        <button
          className={`absolute flex items-center justify-center right-[-20px] z-10 top-1/2 -translate-y-1/2 bg-gray-300 size-14 rounded-full hover:bg-gray-400 transition-all duration-300 ${
            currentIndex === products.length - 4 ? "hidden" : ""
          } ${isMobile ? "hidden" : ""}`}
          onClick={() => nextSlider()}
        >
          <ArrowRightIcon className="size-7" />
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
