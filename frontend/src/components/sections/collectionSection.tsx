import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
import { Link } from "react-router-dom";
import COLLECTIONS from "../../constants/collections";

const CollectionSection = () => {
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
    <section className="pb-[70px]">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {COLLECTIONS.map((category, index) => (
          <div
            key={index}
            className="relative  rounded-md group overflow-hidden w-full px-2"
          >
            <Link
              to={`/collections/${category.slug}`}
              className=" hover:cursor-pointer block w-full overflow-hidden rounded-md"
            >
              <img
                src={category.image}
                alt={category.label}
                loading="lazy"
                width={334}
                height={239}
                className="max-w-full aspect-[334/239] object-cover rounded-md  transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            <div className="absolute bottom-0 left-0 w-full  text-center flex flex-col overflow-hidden items-center justify-center py-3  transition-all duration-300 ">
              <Link
                to={`/collections/${category.slug}`}
                className="text-lg font-bold text-red-700"
              >
                {category.label}
              </Link>
              <Link
                to={`/collections/${category.slug}`}
                className="text-sm text-gray-700"
              >
                Xem ngay
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CollectionSection;
