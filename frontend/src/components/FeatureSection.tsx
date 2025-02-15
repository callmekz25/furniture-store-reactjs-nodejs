import {
  TruckIcon,
  BanknotesIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
const FeatureSection = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-14">
      <div className="bg-[#F3F5F7] py-9 px-8 flex flex-col gap-2 justify-center">
        <TruckIcon className="w-10 h-10 text-black" />
        <p className="font-bold lg:text-[20px] text-md line-clamp-2">
          Giao hàng miễn phí
        </p>
        <span className="font-medium text-sm text-gray-500">
          Đơn đặt trên 1 triệu
        </span>
      </div>
      <div className="bg-[#F3F5F7] py-9 px-8 flex flex-col gap-2 justify-center">
        <BanknotesIcon className="w-10 h-10 text-black" />
        <p className="font-bold lg:text-[20px] text-md line-clamp-2 ">
          Hỗ trợ hoàn tiền
        </p>
        <span className="font-medium text-sm text-gray-500">
          Lên tới 30 ngày sau
        </span>
      </div>
      <div className="bg-[#F3F5F7] py-9 px-8 flex flex-col gap-2 justify-center">
        <LockClosedIcon className="w-10 h-10 text-black" />
        <p className="font-bold lg:text-[20px] text-md line-clamp-2">
          Thanh toán an toàn
        </p>
        <span className="font-medium text-sm text-gray-500">
          Bảo mật và tin cậy
        </span>
      </div>
      <div className="bg-[#F3F5F7] py-9 px-8 flex flex-col gap-2 justify-center">
        <PhoneIcon className="w-10 h-10 text-black" />
        <p className="font-bold lg:text-[20px] text-md line-clamp-2">
          Hỗ trợ 24/7
        </p>
        <span className="font-medium text-sm text-gray-500">
          Hỗ trợ qua điện thoại và email
        </span>
      </div>
    </section>
  );
};

export default FeatureSection;
