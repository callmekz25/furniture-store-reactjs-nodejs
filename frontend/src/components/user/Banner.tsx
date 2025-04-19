import Slider from "react-slick";
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useBannersByType from "@/hooks/shared/useBannersByType";
import Loading from "./loading";
import { Link } from "react-router-dom";
const Banner = () => {
  const { data, isLoading, error } = useBannersByType("hero");
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    infinite: true,
    swipeToSlide: true,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    waitForAnimate: false,
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" relative">
      <button
        onClick={() => next()}
        className=" absolute top-1/2 right-5 flex items-center justify-center z-10 -translate-y-1/2 size-10 bg-red-700"
      >
        <ChevronRightIcon className="size-6 text-white" />
      </button>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {data.map((item) => {
          return (
            <Link
              to={`${item.slug !== "" ? `/collections/${item.slug}` : "/"}`}
              className="w-full"
              key={item._id}
            >
              <img
                src={item.image}
                alt={item.name}
                className="max-w-full object-cover"
              />
            </Link>
          );
        })}
      </Slider>
      <button
        onClick={() => previous()}
        className=" absolute top-1/2 left-5 flex items-center justify-center z-10 -translate-y-1/2 size-10 bg-red-700"
      >
        <ChevronLeftIcon className="size-6 text-white" />
      </button>
    </div>
  );
};
export default Banner;
