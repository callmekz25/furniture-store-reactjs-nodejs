import Image from "../../assets/sale.jpg";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
const SaleSection = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <img src={Image} alt="" className="object-contain w-full h-full" />
      <div className="flex items-center lg:px-20 px-6 py-10 bg-[#F3F5F7]">
        <div className="flex flex-col gap-2 max-w-[500px]">
          <span className="font-bold text-[16px] text-[#377DFF]">
            Giảm giá lên tới 35%
          </span>
          <h3 className="font-bold text-[34px] lg:text-[40px]">
            Khám phá phong cách tối giản mới
          </h3>
          <p className="font-medium text-[16px] lg:text-[20px]">
            Giờ đây, việc làm mới mọi căn phòng trong ngôi nhà của bạn với phong
            cách ấn tượng trở nên dễ dàng và tiết kiệm hơn bao giờ hết.
          </p>
          <button className="font-semibold mt-4 border-b w-fit pb-2 border-black text-[16px] flex items-center gap-2">
            Mua ngay
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleSection;
