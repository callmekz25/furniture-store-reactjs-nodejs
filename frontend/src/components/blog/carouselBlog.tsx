import Slider from "react-slick";
import { memo, useRef, useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useCheckScreen from "@/hooks/useCheckScreen";
import IBlog from "@/interfaces/blog.interface";
import CardBlog from "../blog/blogCard";

const CarouselBlog = ({ blogs, title }: { blogs: IBlog[]; title: string }) => {
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
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    arrows: false, // Ẩn arrow mặc định
    afterChange: (index: number) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.22,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const blogCards = useMemo(() => {
    return blogs.map((blog, index) => (
      <div key={`${blog._id}-${index}`} className="lg:px-2 px-1.5 ">
        <CardBlog blog={blog} />
      </div>
    ));
  }, [blogs]);

  return (
    <div className="slider-container">
      <div className="flex items-center justify-between py-5 px-4">
        <h3 className="font-bold  lg:text-[24px] text-xl text-red-700">
          {title}
        </h3>
        <div
          className={` items-center gap-2 ${
            blogs.length > 4 ? "flex" : "hidden"
          }`}
        >
          <button
            className={` flex items-center justify-center  bg-white  size-8 rounded-full  transition-all duration-300 ${
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
              currentIndex === blogs.length - 4
                ? "cursor-not-allowed hover:bg-gray-200 opacity-40"
                : "hover:bg-red-600 hover:text-white"
            } ${isMobile ? "hidden" : ""}`}
            onClick={() => next()}
            disabled={currentIndex === blogs.length - 4}
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
        {blogCards}
      </Slider>
    </div>
  );
};

export default memo(CarouselBlog);
