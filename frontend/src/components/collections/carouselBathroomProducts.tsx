import Slider from "react-slick";
import { memo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import getProductImages from "@/utils/getProductImages";
import formatPriceToVND from "@/utils/formatPriceToVND";
import useItemsPerView from "@/hooks/shared/useItemsPerView";
import getFakePrice from "@/utils/getFakePrice";
import IProduct from "@/interfaces/product/product.interface";
import { Link } from "react-router-dom";
const CarouselBathroomProducts = ({
  products,
  title,
}: {
  products: [IProduct[]];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const itemsPerView = useItemsPerView();
  const maxIndex = Math.ceil(products.length / itemsPerView) - 1;
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
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    arrows: false, // Ẩn arrow mặc định
    afterChange: (index: number) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex items-center justify-between ">
        <Link to={`/collections/phu-kien-phong-tam`}>
          <h3 className="color-red lg:text-[24px] text-xl font-bold mb-5">
            {title}
          </h3>
        </Link>
        <div className={` items-center gap-4 flex lg:hidden`}>
          <button
            className={` flex items-center justify-center  bg-gray-200  size-8 rounded-full  transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed "
                : "hover:bg-red-600 hover:text-white"
            } `}
            onClick={() => previous()}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            className={` flex items-center justify-center  bg-gray-200 size-8 rounded-full  transition-all duration-300 ${
              currentIndex === maxIndex
                ? "cursor-not-allowed hover:bg-gray-200 opacity-40"
                : "hover:bg-red-600 hover:text-white"
            } `}
            onClick={() => next()}
            disabled={currentIndex === maxIndex}
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
        {products.map((group, index) => (
          <div key={index} className="flex flex-col gap-2 pr-5">
            {group.map((product: IProduct) => (
              <div
                key={product._id}
                className="flex border-b border-gray-200 py-2"
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="max-w-[100px]"
                >
                  <img
                    src={getProductImages(product, true)}
                    alt={product.title}
                    loading="lazy"
                    width={100}
                    height={100}
                    className="max-w-full object-cover size-[100px]"
                  />
                </Link>
                <div className=" pl-2 flex flex-col flex-1">
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="text-sm font-medium mb-2 leading-[16.8px] line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm font-semibold ${
                        product.discount > 0 ? "text-red-500" : ""
                      }`}
                    >
                      {formatPriceToVND(product.minPrice)}
                    </span>
                    <span className=" line-through text-[13px] text-gray-500">
                      {getFakePrice(product) > 0 ? getFakePrice(product) : ""}
                    </span>
                    {product && product.discount > 0 && (
                      <span className="text-red-500 text-[13px] font-bold">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Slider>
    </>
  );
};

export default memo(CarouselBathroomProducts);
