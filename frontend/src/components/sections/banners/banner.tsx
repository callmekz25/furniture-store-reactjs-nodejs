import Slider from 'react-slick';
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { settingHeroImages } from '@/config/slider.config';
const Banner = () => {
  const sliderRef = useRef<Slider | null>(null);
  const next = () => {
    sliderRef?.current?.slickNext();
  };
  const previous = () => {
    sliderRef?.current?.slickPrev();
  };

  return (
    <div className=" relative pb-5">
      <button
        onClick={() => next()}
        className=" absolute top-1/2 right-5 flex items-center justify-center z-10 -translate-y-1/2 size-10 bg-red-700"
      >
        <ChevronRightIcon className="size-6 text-white" />
      </button>
      <Slider ref={sliderRef} {...settingHeroImages}>
        <Link to={'/collections/yeu-bep'}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_1_mb.jpg?v=91"
            ></source>
            <source
              media="(min-width: 768px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_1_img.jpg?v=91"
            ></source>
            <img
              src="//theme.hstatic.net/200000796751/1001266995/14/slide_1_img.jpg?v=91"
              alt="Yêu Bếp"
            ></img>
          </picture>
        </Link>
        <Link to={'/collections/phu-kien-phong-tam'}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_3_mb.jpg?v=91"
            ></source>
            <source
              media="(min-width: 768px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_3_img.jpg?v=91"
            ></source>
            <img
              src="//theme.hstatic.net/200000796751/1001266995/14/slide_3_img.jpg?v=91"
              alt="Phòng tắm"
            ></img>
          </picture>
        </Link>
        <Link to={'/collections/trang-tri'}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_2_mb.jpg?v=91"
            ></source>
            <source
              media="(min-width: 768px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_2_img.jpg?v=91"
            ></source>
            <img
              src="//theme.hstatic.net/200000796751/1001266995/14/slide_2_img.jpg?v=91"
              alt="Nhà đẹp"
            ></img>
          </picture>
        </Link>
        <Link to={''}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_4_mb.jpg?v=91"
            ></source>
            <source
              media="(min-width: 768px)"
              srcSet="//theme.hstatic.net/200000796751/1001266995/14/slide_4_img.jpg?v=91"
            ></source>
            <img
              src="//theme.hstatic.net/200000796751/1001266995/14/slide_4_img.jpg?v=91"
              alt="All Sale"
            ></img>
          </picture>
        </Link>
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
