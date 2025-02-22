import LivingRoom from "../assets/livingRoom.png";
import Kitchen from "../assets/kitchenRoom.png";
import Bedroom from "../assets/bedRoom.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
const CategorySection = () => {
  return (
    <section className="grid lg:grid-cols-2 lg:grid-rows-2 grid-cols-1 gap-4 mt-8 lg:max-h-[664px]">
      <div className="bg-[#f3f5f7] lg:p-8 p-4 lg:row-span-2">
        <span className="font-bold text-3xl">Phòng khách</span>
        <button className="flex items-center border-b border-black text-[16px] font-semibold gap-2 mt-4">
          Mua ngay <ArrowRightIcon className="size-4" />
        </button>
        <div className="flex items-center justify-center">
          <img src={LivingRoom} alt="" className="object-contain" />
        </div>
      </div>
      <div className="bg-[#f3f5f7] lg:p-8 p-4 flex ">
        <div className="flex flex-col justify-end lg:min-w-[200px] min-w-[130px]">
          <span className="font-bold text-3xl">Phòng ngủ</span>
          <button className="flex w-fit items-center border-b border-black text-[16px] font-semibold gap-2 mt-4">
            Mua ngay <ArrowRightIcon className="size-4" />
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <img src={Bedroom} alt="" className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="bg-[#f3f5f7] lg:p-8 p-4 flex ">
        <div className="flex flex-col justify-end lg:min-w-[200px] min-w-[130px]">
          <span className="font-bold text-3xl">Phòng bếp</span>
          <button className="flex w-fit items-center border-b border-black text-[16px] font-semibold gap-2 mt-4">
            Mua ngay <ArrowRightIcon className="size-4" />
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <img src={Kitchen} alt="" className="object-contain w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
