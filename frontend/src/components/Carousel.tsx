import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./cardProduct";
import { memo, useRef, useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useCheckScreen from "@/hooks/useCheckScreen";
import IProduct from "@/interfaces/product.interface";
const Carousel = ({
  products,
  title,
}: {
  products: [IProduct];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isMobile = useCheckScreen();

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,

    initialSlide: 0,
    arrows: false, // Ẩn arrow mặc định
    afterChange: (index: number) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const productCards = useMemo(() => {
    return products.map((product, index) => (
      <div key={`${product._id}-${index}`} className="px-1.5">
        <Card product={product} />
      </div>
    ));
  }, [products]);
  return (
    <div className="slider-container">
      <div className="flex items-center justify-between py-8 px-4">
        <h3 className="font-bold text-3xl">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            className={` flex items-center justify-center  bg-gray-200 size-8 rounded-full hover:bg-gray-400 transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed hover:bg-gray-200"
                : ""
            } ${isMobile ? "hidden" : ""}`}
            onClick={() => previous()}
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
            onClick={() => next()}
            disabled={currentIndex === products.length - 5}
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {productCards}
      </Slider>
      <div className="flex items-center justify-center">
        <button
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
          className="flex justify-center  text-sm mt-4 transition-all duration-500 hover:bg-red-600 hover:text-white  items-center gap-1 font-medium bg-white rounded-md py-3 px-1.5 min-w-[320px]"
        >
          Xem thêm <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default memo(Carousel);
