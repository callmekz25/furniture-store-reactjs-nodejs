import CATEGORIES from "@/constants/categories";
import Background from "@/assets/background.webp";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
const CategorySection = () => {
  let sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3.3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="pb-[70px]">
      <div className="flex lg:px-3 py-6  items-center relative ">
        <div
          className=" absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/35"></div>
        <div className="lg:flex hidden flex-col z-50 px-4 lg:flex-[0_0_17%] lg:max-w-[17%] text-right">
          <h3 className=" text-white font-semibold mb-2 text-[20px] ">
            Xu hướng tìm kiếm
          </h3>
          <Link
            to="collections/all"
            className=" ml-auto rounded-full w-fit text-sm px-4 py-1 text-white font-normal uppercase bg-red-700"
          >
            Xem ngay
          </Link>
        </div>

        <div className="lg:flex-[0_0_83%] lg:max-w-[83%] w-full ">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {CATEGORIES.map((category) => {
              return (
                <div key={category.label} className="   z-50  px-5 mt-2 mb-6 ">
                  <Link
                    to={`/collections/${category.slug}`}
                    className="bg-white mb-2 flex-1 lg:size-[110px]  md:size-[120px] size-[95px]  rounded-full p-3 flex items-center justify-center transition-all duration-300 hover:scale-105 relative"
                  >
                    <img
                      src={category.image}
                      alt={category.label}
                      loading="lazy"
                      width={75}
                      height={75}
                      className="max-w-[75px] object-cover"
                    />
                    <p className="text-white min-w-[100px] text-center font-medium z-[900]  absolute bottom-[-30px] left-[50%] translate-x-[-50%] ">
                      {category.label}
                    </p>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
