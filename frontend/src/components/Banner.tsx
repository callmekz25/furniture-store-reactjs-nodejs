import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "../assets/slide.jpg";
const Banner = () => {
  return (
    <div className="">
      {/* <div className="lg:px-[100px] px-10 absolute left-0 bottom-32 text-white font-medium flex flex-col">
        <span className="lg:text-[32px] font-bold">
          Khám phá những sản phẩm mới nhất
        </span>
        <span className="lg:texxt-[20px]">Khám phá sản phẩm</span>
        <button className="bg-white px-4 py-2 w-fit font-semibold text-black mt-10 flex items-center gap-2">
          Xem bộ sưu tập
          <ArrowRightIcon className="size-5" />
        </button>
      </div> */}
      <img
        id="banner"
        src={Image}
        alt=""
        className="object-contain h-full w-full"
      />
    </div>
  );
};
export default Banner;
