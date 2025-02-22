import Layout from "@/layouts";
import Image from "../assets/bedRoom.png";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Newsletter from "@/components/Newsletter";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/PageContext";
const ShoppingCart = () => {
  const { setIsCartPage } = useContext(PageContext);
  // Kiểm tra nếu user đang ở trang cart
  useEffect(() => {
    setIsCartPage(true);
    return () => setIsCartPage(false);
  }, [setIsCartPage]);
  return (
    <Layout>
      <div className="lg:px-[100px] px-6 lg:py-20 py-6">
        <div className="py-20 flex lg:flex-row flex-col gap-6">
          <div className="flex flex-col lg:w-[65%] w-full  rounded-md lg:p-6 p-3 shadow-md">
            <h3 className="font-semibold text-2xl">Giỏ hàng của bạn</h3>
            {/* Product */}
            <div className="flex items-start justify-between  py-6 border-b border-gray-300">
              <div className="flex lg:gap-4 gap-1">
                <div className="flex items-center justify-center lg:size-[100px] size-[70px] bg-[#f3f5f7]">
                  <img src={Image} alt="" className="object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold lg:text-xl truncate w-[100px] lg:w-auto">
                    Bàn ăn vân gỗ sồi
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2 lg:line-clamp-none">
                    Nâu vàng / 1m2x60cm
                  </p>
                  <span className="font-medium  text-md text-gray-500">
                    950.000đ
                  </span>
                  <span className="font-medium line-through text-sm text-gray-500">
                    950.000đ
                  </span>
                </div>
              </div>
              <div className="flex lg:gap-6 justify-between items-start">
                <div className="flex flex-col gap-4">
                  <span className="font-semibold lg:text-lg text-[16px]">
                    1.700.000đ
                  </span>
                  <div className="flex items-center gap-3 justify-between border-2 border-gray-300 rounded px-3 py-1">
                    <button>
                      <MinusIcon className="size-4" />
                    </button>
                    <span>2</span>
                    <button>
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                </div>
                <button>
                  <XMarkIcon className="size-6" />
                </button>
              </div>
            </div>
            <div className="flex items-start justify-between  py-6 border-b border-gray-300">
              <div className="flex lg:gap-4 gap-1">
                <div className="flex items-center justify-center lg:size-[100px] size-[70px] bg-[#f3f5f7]">
                  <img src={Image} alt="" className="object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold lg:text-xl truncate w-[100px] lg:w-auto">
                    Bàn ăn vân gỗ sồi
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2 lg:line-clamp-none">
                    Nâu vàng / 1m2x60cm
                  </p>
                  <span className="font-medium  text-md text-gray-500">
                    950.000đ
                  </span>
                  <span className="font-medium line-through text-sm text-gray-500">
                    950.000đ
                  </span>
                </div>
              </div>
              <div className="flex lg:gap-6 justify-between items-start">
                <div className="flex flex-col gap-4">
                  <span className="font-semibold lg:text-lg text-[16px]">
                    1.700.000đ
                  </span>
                  <div className="flex items-center gap-3 justify-between border-2 border-gray-300 rounded px-3 py-1">
                    <button>
                      <MinusIcon className="size-4" />
                    </button>
                    <span>2</span>
                    <button>
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                </div>
                <button>
                  <XMarkIcon className="size-6" />
                </button>
              </div>
            </div>
          </div>
          {/* Oder summary */}
          <div className="p-6  rounded-md flex-1 shadow-md h-fit">
            <h3 className="font-semibold text-2xl">Thông tin đơn hàng</h3>
            <div className="flex items-center justify-between py-6">
              <span className="font-semibold">Tổng tiền</span>
              <span className="font-semibold text-xl text-red-500">
                2.300.000đ
              </span>
            </div>
            <ul className="flex flex-col gap-2 text-sm list-disc px-4">
              <li>Phí vận chuyển sẽ được tính ở trang Thanh toán</li>
              <li>Mã giảm giá được nhập ở trang Thanh toán</li>
            </ul>
            <button className="py-2 px-4 flex items-center justify-center bg-black text-white font-medium w-full rounded mt-10">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
    </Layout>
  );
};

export default ShoppingCart;
