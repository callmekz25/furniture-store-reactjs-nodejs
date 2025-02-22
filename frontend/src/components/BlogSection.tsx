import useCheckScreen from "@/hooks/useCheckScreen";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CardProduct from "./CardProduct";
const BlogSection = () => {
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
    <section className="lg:py-[80px] py-[40px]">
      <div className="flex items-center justify-between">
        <h3 className="font-bold lg:text-[40px] text-[30px]">
          Bài viết mới nhất
        </h3>
      </div>
      <div className="relative mt-6">
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
            className={`mt-2  gap-5 lg:gap-4 flex items-center transition-all duration-500 ease-in-out   ${
              isMobile ? "grid scroll-slides" : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * (300 + 24)}px)`,
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
    </section>
  );
};

export default BlogSection;
