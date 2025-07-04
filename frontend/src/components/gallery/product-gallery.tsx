import { useRef, useState, useEffect, memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import type { SlideshowRef, ZoomRef } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { settingGallery } from "@/config/slider.config";
import ProgressLoading from "../loading/progress-loading";

const ProductGallery = ({
  images,
  activeVariant,
}: {
  images: string[];
  activeVariant?: ISelectedVariant | undefined | null;
}) => {
  const [openZoomImage, setOpenZoomImage] = useState(false);
  const lightBoxSlideRef = useRef<SlideshowRef | null>(null);
  const zoomRef = useRef<ZoomRef | null>(null);
  const duration = 3000;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomimg, setIsZooming] = useState(false);
  const [progressKey, setProgressKey] = useState(1);
  const mainSliderRef = useRef<Slider | null>(null);
  const thumbSliderRef = useRef<Slider | null>(null);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  useEffect(() => {
    setNav1(mainSliderRef?.current);
    setNav2(thumbSliderRef?.current);
  }, []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const next = () => {
    mainSliderRef?.current?.slickNext();
  };
  const previous = () => {
    mainSliderRef?.current?.slickPrev();
  };
  const goToSlide = (index: number) => {
    mainSliderRef?.current?.slickGoTo(index);
  };

  // Slide to images
  useEffect(() => {
    if (activeVariant && activeVariant.images.length > 0) {
      // First image of variant
      const firstImage = activeVariant.images[0];
      const index = images.indexOf(firstImage as string);

      if (index !== -1 && mainSliderRef) {
        mainSliderRef?.current?.slickGoTo(index);
      }
    }
  }, [activeVariant, images]);

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

  const thumbnailSettings = settingGallery;

  return (
    <div className="w-full flex min-h-[400px] lg:flex-row flex-col-reverse lg:w-full lg:h-full h-auto  lg:max-h-[532px] max-h-none overflow-hidden">
      {isPlaying && (
        <ProgressLoading duration={duration} resetKey={progressKey} />
      )}
      {/* Thumbnail Slider */}
      <div className="lg:w-[16%] w-full p-3 lg:h-auto min-h-[120px] flex-shrink-0">
        <Slider asNavFor={nav1!} {...thumbnailSettings} ref={thumbSliderRef}>
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
                  className="object-cover max-w-full  aspect-square "
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
        <Slider {...mainSettings} asNavFor={nav2!} ref={mainSliderRef}>
          {images.map((img, index) => (
            <div key={index} className="outline-none focus:outline-none">
              <img
                src={img}
                alt={img}
                loading="lazy"
                onClick={() => setOpenZoomImage(true)}
                className="object-cover hover:cursor-zoom-in w-full max-w-full aspect-square "
              />
            </div>
          ))}
        </Slider>
        <Lightbox
          className={`  ${
            isZoomimg ? "hover:cursor-grab" : "hover:cursor-zoom-in"
          }`}
          plugins={[Slideshow, Zoom]}
          zoom={{ ref: zoomRef }}
          slideshow={{
            ref: lightBoxSlideRef,
            autoplay: false,
            delay: duration,
          }}
          on={{
            zoom: ({ zoom }: { zoom: number }) => {
              if (zoom > 1) {
                setIsZooming(true);
              } else {
                setIsZooming(false);
              }
            },
            slideshowStart: () => setIsPlaying(true),
            slideshowStop: () => setIsPlaying(false),
            view: () => {
              if (isPlaying) {
                setProgressKey((prev) => prev + 1);
              }
            },
          }}
          carousel={{ finite: true }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, .8)" },
          }}
          render={{
            buttonPrev: images.length <= 1 ? () => null : undefined,
            buttonNext: images.length <= 1 ? () => null : undefined,
          }}
          open={openZoomImage}
          close={() => setOpenZoomImage(false)}
          slides={images.map((img) => {
            return { src: img, alt: img };
          })}
        />
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
