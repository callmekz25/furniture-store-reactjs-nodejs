import Image from "../../assets/slide.avif";
import Image2 from "../../assets/sale.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useBannersByType from "@/hooks/useBannersByType";
import Loading from "./loading";
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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
    afterChange: (index: number) => setCurrentIndex(index),
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {data.map((item) => {
          return (
            <div className="w-full" key={item._id}>
              <img
                src={item.image}
                alt={item.name}
                className="max-w-full object-cover"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default Banner;
