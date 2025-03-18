import Image from "../../assets/slide.avif";
import Image2 from "../../assets/sale.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    infinite: true,
    swipeToSlide: true,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    waitForAnimate: false,
    afterChange: (index: number) => setCurrentIndex(index),
  };
  return (
    <div className="">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        <img
          id="banner"
          src={Image}
          alt="Ảnh banner"
          width={1400}
          height={600}
          className="object-cover max-w-full aspect-[1400/600] max-h-[600px]"
        />
        <img
          id="banner"
          src={Image2}
          alt="Ảnh banner"
          width={1400}
          height={600}
          className="object-cover max-w-full aspect-[1400/600] max-h-[600px]"
        />
        <img
          id="banner"
          src={Image}
          alt="Ảnh banner"
          width={1400}
          height={600}
          className="object-cover max-w-full aspect-[1400/600] max-h-[600px]"
        />
      </Slider>
    </div>
  );
};
export default Banner;
