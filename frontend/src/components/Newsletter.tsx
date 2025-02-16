import { EnvelopeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
const Newsletter = () => {
  return (
    <div className=" bg-[#f2f4f6] flex items-center justify-center py-20 px-6">
      <div className="flex flex-col items-center ">
        <h3 className="font-bold lg:text-[40px] text-[28px]">
          Tham gia bản tin của chúng tôi
        </h3>
        <p className="font-medium lg:text-[18px] text-[14px] mt-2">
          Đăng ký để nhận các ưu đãi, sản phẩm mới và phiếu giảm giá
        </p>
        <div className="relative mt-8 flex items-center w-full lg:min-w-[500px]">
          <EnvelopeIcon className="size-6 absolute top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Địa chỉ email"
            className="outline-none  w-full text-[16px] placeholder:text-black  font-medium bg-transparent py-2 pl-8 px-4 border-b border-gray-400 focus:border-black  hover:text-black transition-all duration-300 hover:border-black"
          />
          <button className="flex items-center justify-center">
            <PaperAirplaneIcon className="size-6 absolute right-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
