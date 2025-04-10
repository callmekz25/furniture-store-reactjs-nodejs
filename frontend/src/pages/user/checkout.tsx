import useDistricts from "@/hooks/location/useDistricts";
import useProvinces from "@/hooks/location/useProvinces";
import useWards from "@/hooks/location/useWards";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const provinceId = watch("province");
  const districtId = watch("district");
  const wardId = watch("ward");
  const {
    data: provinces,
    isLoadingProvinces,
    errorProvinces,
  } = useProvinces();
  const {
    data: districts,
    isLoadingDistricts,
    errorDistricts,
  } = useDistricts(provinceId);
  const { data: wards, isLoadingWards, errorWards } = useWards(districtId);
  const handleCheckout = () => {
    return;
  };
  return (
    <div className="bg-white min-h-screen">
      <div className=" max-w-[85%]  flex  p-[5%]  mx-auto ">
        <div className="pt-4 flex-[0_0_60%] max-w-[60%] ">
          <div className="flex items-center">Giỏ hàng</div>
          <h3 className="text-xl font-bold">Thông tin giao hàng</h3>
          <p className="mt-4 text-md font-medium text-gray-500">
            Bạn đã có tài khoản?{" "}
            <span className="font-semibold text-black">Đăng nhập</span>
          </p>
          <form
            onSubmit={handleSubmit(handleCheckout)}
            className="flex flex-col flex-1 gap-5 mt-2"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-md font-medium text-gray-500"
              >
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                className="outline-none px-2 py-2.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-[13px] text-red-500 font-medium">
                  Họ tên không được trống
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-[0_0_60%]  max-w-[60%] flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-md font-medium text-gray-500"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="outline-none px-2 py-2.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
                {errors.email?.type === "required" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    Email không được trống
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="phoneNumber"
                  className="text-md font-medium text-gray-500"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="outline-none px-2 py-2.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                  {...register("phoneNumber", {
                    required: true,
                    pattern: {
                      value: /^(0[3-9])(\d{8})$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                />
                {errors.phoneNumber?.type === "required" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    Số điện thoại không được trống
                  </span>
                )}
                {errors.phoneNumber?.type === "pattern" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label
                htmlFor="address"
                className="text-md font-medium text-gray-500"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                className="outline-none px-2 py-2.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                {...register("address", { required: true })}
              />
              {errors.address?.type === "required" && (
                <span className="text-[13px] text-red-500 font-medium">
                  Địa chỉ không được trống
                </span>
              )}
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="province"
                  className="text-md font-medium text-gray-500"
                >
                  Tỉnh / thành
                </label>
                <select
                  id="province"
                  className="outline-none px-2 py-2.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                  {...register("province", { required: true })}
                >
                  <option value="">Chọn tỉnh thành</option>
                  {provinces?.data?.length > 0
                    ? provinces.data.map((province) => {
                        return (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        );
                      })
                    : "Lỗi"}
                </select>
                {errors.province?.type === "required" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    Tỉnh thành không được trống
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="district"
                  className="text-md font-medium text-gray-500"
                >
                  Quận / huyện
                </label>
                <select
                  id="district"
                  className="outline-none px-2 py-2.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                  {...register("district", { required: true })}
                >
                  <option value="">Chọn quận / huyện</option>
                  {districts?.data?.length > 0
                    ? districts.data.map((district) => {
                        return (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        );
                      })
                    : "Lỗi"}
                </select>
                {errors.district?.type === "required" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    Quận huyện không được trống
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="ward"
                  className="text-md font-medium text-gray-500"
                >
                  Phường / xã
                </label>
                <select
                  id="ward"
                  className="outline-none px-2 py-2.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                  {...register("ward", { required: true })}
                >
                  <option value="">Chọn phường / xã</option>
                  {wards?.data?.length > 0
                    ? wards.data.map((ward) => {
                        return (
                          <option key={ward.id} value={ward.id}>
                            {ward.name}
                          </option>
                        );
                      })
                    : "Lỗi"}
                </select>
                {errors.ward?.type === "required" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    Phường xã không được trống
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-bold">Phương thức thanh toán</h3>
              <div className="border border-gray-300 mt-4 flex flex-col">
                <label
                  htmlFor="cod"
                  className="flex items-center hover:cursor-pointer gap-2 px-4 py-6"
                >
                  <input
                    type="radio"
                    name="payment"
                    id="cod"
                    className="size-4"
                  />
                  Thanh toán khi nhận hàng (COD)
                </label>
                <label
                  htmlFor="momo"
                  className="flex border-y border-gray-300 items-center hover:cursor-pointer gap-2 px-4 py-6"
                >
                  <input
                    type="radio"
                    name="payment"
                    id="momo"
                    className="size-4"
                  />
                  Ví MoMo
                </label>
                <label
                  htmlFor="cod"
                  className="flex items-center hover:cursor-pointer gap-2 px-4 py-6"
                >
                  <input
                    type="radio"
                    name="payment"
                    id="cod"
                    className="size-4"
                  />
                  Thanh toán khi nhận hàng (COD)
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button>Giỏ hàng</button>
              <button className="px-3 py-4 rounded bg-red-700 text-white font-sembibold">
                Hoàn tất đơn hàng
              </button>
            </div>
          </form>
        </div>
        <div className="flex-[0_0_40%] max-w-[40%]">
          <div className="flex flex-col">
            <div className="flex items-center border-b border-gray-300 pb-4">
              <div className="relative border border-gray-300 rounded-md p-2">
                <img
                  width={64}
                  height={64}
                  src="../../assets/chair.webp"
                  alt=""
                  className="size-[64px] max-w-[64px] object-contain"
                />
                <span className="absolute top-[-10px] right-[-10px] size-7 text-center text-white bg-[#a3a3a3]">
                  1
                </span>
              </div>
              <h4 className="ml-4 line-clamp-2 font-medium">
                Bát ăn snack gốm sứ
              </h4>
              <span className="ml-auto font-medium">2000đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
