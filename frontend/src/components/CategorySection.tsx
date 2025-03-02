import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CATEGORIES from "../constants/categories";
import { useRef } from "react";
const CategorySection = () => {
  let sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    initialSlide: 0,
    arrows: false, // Ẩn arrow mặc định

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {CATEGORIES.map((category, index) => (
          <div
            key={index}
            className="relative  rounded-md group overflow-hidden w-full px-3"
          >
            {/* Ảnh (chỉ zoom khi hover) */}
            <div className=" hover:cursor-pointer w-full overflow-hidden rounded-md">
              <img
                src={category.image}
                alt={category.label}
                className="w-full  h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Nội dung (không bị ảnh hưởng khi hover) */}
            <div className="absolute bottom-0 left-0 w-full  text-center flex flex-col overflow-hidden items-center justify-center py-3  transition-all duration-300 ">
              <a className="text-lg font-bold text-red-700">{category.label}</a>
              <span className="text-sm text-gray-700">Xem ngay</span>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CategorySection;
