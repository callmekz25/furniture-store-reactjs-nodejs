import { useRef, useState, useEffect, memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ProductGallery = ({ images }: { images: string[] }) => {
  let mainSliderRef = useRef<Slider | null>(null);
  let thumbSliderRef = useRef<Slider | null>(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  useEffect(() => {
    setNav1(mainSliderRef);
    setNav2(thumbSliderRef);
  }, []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const next = () => {
    mainSliderRef.slickNext();
  };
  const previous = () => {
    mainSliderRef.slickPrev();
  };
  const goToSlide = (index) => {
    mainSliderRef.slickGoTo(index);
  };

  const mainSettings = {
    dots: false,
    infinite: false,
    speed: 600,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    swipe: true,
    afterChange: (index: number) => setCurrentIndex(index),
  };

  const thumbnailSettings = {
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          verticalSwiping: false,
          vertical: false,
        },
      },
    ],
  };

  return (
    <div className="w-full flex min-h-[400px] lg:flex-row flex-col-reverse lg:w-full lg:h-full h-auto  lg:max-h-[532px] max-h-none overflow-hidden">
      {/* Thumbnail Slider */}
      <div className="lg:w-[16%] w-full p-3 lg:h-auto min-h-[120px] flex-shrink-0">
        <Slider
          asNavFor={nav1}
          {...thumbnailSettings}
          ref={(slider) => (thumbSliderRef = slider)}
        >
          {images.map((img, index) => (
            <div key={index} onClick={() => goToSlide(index)} className="p-1">
              <div
                className={`border border-gray-300 hover:cursor-pointer outline-none focus:outline-none ${
                  currentIndex === index ? "border-red-600" : ""
                }`}
              >
                <img
                  src={img}
                  loading="lazy"
                  alt={img}
                  className="object-cover max-w-full size-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Main Slider */}
      <div className="lg:w-[84%] w-full h-auto flex-grow relative ">
        <button
          className={`absolute left-0 z-10 top-1/2 -translate-y-1/2 ${
            currentIndex === 0 ? "hidden" : ""
          }`}
          onClick={() => previous()}
        >
          <ChevronLeftIcon className="size-8" />
        </button>
        <Slider
          {...mainSettings}
          asNavFor={nav2}
          ref={(slider) => (mainSliderRef = slider)}
        >
          {images.map((img, index) => (
            <div key={index} className="outline-none focus:outline-none">
              <img
                src={img}
                alt={img}
                className="object-contain w-full h-full lg:max-h-full max-h-[500px]"
              />
            </div>
          ))}
        </Slider>
        <button
          className={`absolute right-0 z-10 top-1/2 -translate-y-1/2 ${
            currentIndex === images.length - 1 ? "hidden" : ""
          }`}
          onClick={() => next()}
        >
          <ChevronRightIcon className="size-8" />
        </button>
      </div>
    </div>
  );
};

export default memo(ProductGallery);
