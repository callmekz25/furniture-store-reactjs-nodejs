import Slider from "react-slick";
import { memo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useCheckScreen from "@/hooks/use-check-screen";
import IBlog from "@/interfaces/blog.interface";
import CardBlog from "@/components/cards/blog-card";
import { settingBlogs } from "@/config/slider.config";

const CarouselBlog = ({ blogs, title }: { blogs: IBlog[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isMobile = useCheckScreen();

  const sliderRef = useRef<Slider | null>(null);
  const next = () => {
    sliderRef?.current?.slickNext();
  };
  const previous = () => {
    sliderRef?.current?.slickPrev();
  };
  const settings = {
    ...settingBlogs,
    afterChange: (index: number) => setCurrentIndex(index),
  };

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
      <Slider ref={sliderRef} {...settings}>
        {blogs.map((blog, index) => (
          <div key={index} className="lg:px-2 px-1.5">
            <CardBlog blog={blog} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(CarouselBlog);
