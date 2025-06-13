import Slider from "react-slick";
import { memo, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useCheckScreen from "@/hooks/shared/useCheckScreen";
import IProduct from "@/interfaces/product/product.interface";
import ProductCard from "@/components/product/productCard";
import { Link } from "react-router-dom";

const CarouselProduct = ({
  slug,
  products,
  title,
  more = true,
}: {
  products: IProduct[];
  title: string;
  more: boolean;
  slug?: string | null;
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
    swipeToSlide: true,
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
      <div key={`${product._id}-${index}`} className="lg:px-2 px-1 ">
        <ProductCard product={product} />
      </div>
    ));
  }, [products]);

  return (
    <>
      <div className="flex items-center justify-between py-5 px-1">
        <h3 className="font-bold  lg:text-[24px] text-xl text-red-700">
          {title}
        </h3>
        <div
          className={` items-center gap-2 ${
            products.length > 5 ? "flex" : "hidden"
          }`}
        >
          <button
            className={` flex items-center justify-center  bg-white size-8 rounded-full  transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed "
                : "hover:bg-red-600 hover:text-white"
            } ${isMobile ? "hidden" : ""}`}
            onClick={() => previous()}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            className={` flex items-center justify-center  bg-white size-8 rounded-full  transition-all duration-300 ${
              currentIndex === products.length - 5
                ? "cursor-not-allowed hover:bg-gray-200 opacity-40"
                : "hover:bg-red-600 hover:text-white"
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
      <div
        className={` items-center justify-center mt-3 ${
          more ? "flex" : "hidden"
        }`}
      >
        <Link
          to={`/collections/${slug}`}
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
          className="flex justify-center  text-sm mt-4 transition-all duration-500 hover:bg-red-600 hover:text-white  items-center gap-1 font-medium bg-white rounded py-3 px-1.5 min-w-[320px]"
        >
          Xem thêm <ChevronRightIcon className="size-5" />
        </Link>
      </div>
    </>
  );
};

export default memo(CarouselProduct);
