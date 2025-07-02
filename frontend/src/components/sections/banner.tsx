import Slider from "react-slick";
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/loading/loading";
import { Link } from "react-router-dom";
import { useGetAll } from "@/hooks/useGet";
import { settingHeroImages } from "@/config/slider.config";
const Banner = () => {
  const { data, isLoading, error } = useGetAll<
    {
      _id: string;
      name: string;
      slug: string;
      image: string;
      priority: number;
    }[]
  >("/banners", ["banners"], false, "hero");

  const sliderRef = useRef<Slider | null>(null);
  const next = () => {
    sliderRef?.current?.slickNext();
  };
  const previous = () => {
    sliderRef?.current?.slickPrev();
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return;
  }
  return (
    <div className=" relative">
      <button
        onClick={() => next()}
        className=" absolute top-1/2 right-5 flex items-center justify-center z-10 -translate-y-1/2 size-10 bg-red-700"
      >
        <ChevronRightIcon className="size-6 text-white" />
      </button>
      <Slider ref={sliderRef} {...settingHeroImages}>
        {data &&
          data.map((item) => {
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
