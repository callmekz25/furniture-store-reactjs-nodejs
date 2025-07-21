import Loading from "@/components/loading/loading";
import PAYMENTS from "@/constants/payment";
import formatPriceToVND from "@/utils/format-price";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import IProvince from "@/interfaces/location/province.interface";
import IDistrict from "@/interfaces/location/district.interface";
import IWard from "@/interfaces/location/ward.interface";
import IPaymentRequest from "@/interfaces/checkout/payment-request";
import {
  useGetDistricts,
  useGetProvinces,
  useGetWards,
} from "@/hooks/use-location";
import { usePayment } from "@/hooks/use-payment";
import { useGetOrderById } from "@/hooks/use-order";
import ICartItems from "@/interfaces/cart/cart-items.interface";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { getLocationNameById } from "@/utils/get-location-name";
import { useGetUser } from "@/hooks/use-account";

const Checkout = () => {
  const navigate = useNavigate();
  const [toggleShowProducts, setToggleShowProducts] = useState(false);
  const { orderId } = useParams();
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const defaultAddress = user?.addresses?.find((addr) => addr.isDefault);
  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IPaymentRequest>({
    defaultValues: {
      orderId: orderId,
      name: user ? user.name : "",
      email: user ? user.email : "",
      phoneNumber: defaultAddress?.phoneNumber || "",
      address: defaultAddress?.address || "",
      province: defaultAddress?.province || { id: "", name: "" },
      district: defaultAddress?.district || { id: "", name: "" },
      ward: defaultAddress?.ward || { id: "", name: "" },
      paymentMethod: "",
    },
  });
  const { data, isLoading, error } = useGetOrderById(orderId!, "checkout");
  const { mutate: confirmedPayment, isPending } = usePayment();
  const provinceId = watch("province.id");
  const districtId = watch("district.id");
  const { data: provinces, isLoading: isLoadingProvinces } = useGetProvinces();
  const { data: districts, isLoading: isLoadingDistricts } =
    useGetDistricts(provinceId);
  const { data: wards, isLoading: isLoadingWards } = useGetWards(districtId);

  const handleCheckout = async (payload: IPaymentRequest) => {
    const province =
      defaultAddress.province ??
      getLocationNameById(provinces, payload.province.id);
    const district =
      defaultAddress.district ??
      getLocationNameById(districts, payload.district.id);
    const ward =
      defaultAddress.ward ?? getLocationNameById(wards, payload.ward.id);
    const res: IPaymentRequest = {
      ...payload,
      orderId: orderId,
      province: {
        id: province.id,
        name: province.name,
      },
      district: {
        id: district.id,
        name: district.name,
      },
      ward: {
        id: ward.id,
        name: ward.name,
      },
    };
    confirmedPayment(res, {
      onSuccess: (res) => {
        if (+res.resultCode === 0) {
          if (res.partnerCode === "MOMO") {
            window.location.href = res.payUrl;
          } else if (res.partnerCode === "COD") {
            navigate(`/account`);
          }
        }
      },
    });
  };
  if (isLoading || isLoadingUser) {
    return <Loading />;
  }
  if (error) {
    navigate("/cart");
  }

  return (
    <div className="bg-white min-h-screen ">
      <div className="flex flex-wrap-reverse">
        <div className="pt-4 lg:flex-[0_0_60%] lg:px-20 px-3 lg:max-w-[60%] pb-5 flex-[0_0_100%] max-w-[100%] lg:pr-8">
          <h3 className="text-xl font-bold">Thông tin giao hàng</h3>
          <form
            onSubmit={handleSubmit(handleCheckout)}
            className="flex flex-col flex-1 gap-5 mt-2  relative"
          >
            {(isLoadingProvinces ||
              isLoadingDistricts ||
              isLoadingWards ||
              isPending) && <Loading />}
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
                className="outline-none px-2 py-1.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-[13px] text-red-500 font-medium">
                  Họ tên không được trống
                </span>
              )}
            </div>
            <div className="flex items-center flex-wrap ">
              <div className="lg:flex-[0_0_60%] lg:mb-0 mb-4 pr-1  lg:max-w-[60%] flex-[0_0_100%]  max-w-[100%] flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-md font-medium text-gray-500"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="outline-none px-2 py-1.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
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
              <div className="lg:flex-[0_0_40%] pl-1  lg:max-w-[40%] flex flex-[0_0_100%]  max-w-[100%] flex-col gap-1.5">
                <label
                  htmlFor="phoneNumber"
                  className="text-md font-medium text-gray-500"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="outline-none px-2 py-1.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
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

            <div className=" flex items-center gap-2 flex-wrap">
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="province"
                  className="text-md font-medium text-gray-500"
                >
                  Tỉnh / thành
                </label>
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value.id}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className=" border border-gray-300  text-[15px] rounded outline-none shadow-none  text-black ">
                        <SelectValue placeholder="Chọn tỉnh thành" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces &&
                          provinces.length > 0 &&
                          provinces.map((province: IProvince) => {
                            return (
                              <SelectItem value={province.id} key={province.id}>
                                {province.name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  )}
                />
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
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value.id}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className=" border border-gray-300  text-[15px] rounded outline-none shadow-none  text-black ">
                        <SelectValue placeholder="Chọn quận / huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts &&
                          districts.length > 0 &&
                          districts.map((district: IDistrict) => {
                            return (
                              <SelectItem value={district.id} key={district.id}>
                                {district.name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  )}
                />
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
                <Controller
                  name="ward"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value.id}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className=" border border-gray-300  text-[15px] rounded outline-none shadow-none  text-black ">
                        <SelectValue placeholder="Chọn phường xã" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards &&
                          wards.length > 0 &&
                          wards.map((ward: IWard) => {
                            return (
                              <SelectItem value={ward.id} key={ward.id}>
                                {ward.name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.ward?.type === "required" && (
                  <span className="text-[13px] text-red-500 font-medium">
                    Phường xã không được trống
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
                className="outline-none px-2 py-1.5 border border-gray-300 rounded transition-all duration-500 focus:border-blue-500"
                {...register("address", { required: true })}
              />
              {errors.address?.type === "required" && (
                <span className="text-[13px] text-red-500 font-medium">
                  Địa chỉ không được trống
                </span>
              )}
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-bold">Phương thức thanh toán</h3>
              <div className="border border-gray-300 mt-4 flex flex-col">
                {PAYMENTS.map((payment, index) => {
                  return (
                    <label
                      key={payment.label}
                      htmlFor={payment.label}
                      className={`flex items-center hover:cursor-pointer gap-4 px-4 py-3 ${
                        index === 1 ? "border-y border-gray-300" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={payment.label}
                        value={payment.method}
                        className="size-4"
                        {...register("paymentMethod")}
                      />
                      <div className="flex items-center gap-3">
                        <img
                          src={payment.image}
                          alt={payment.label}
                          className="size-10 object-contain"
                        />
                        {payment.label}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button>Giỏ hàng</button>
              <button
                type="submit"
                disabled={
                  isLoadingProvinces || isLoadingDistricts || isLoadingWards
                }
                className="px-3 py-2  rounded bg-red-700 text-white font-medium text-md"
              >
                Hoàn tất
              </button>
            </div>
          </form>
        </div>
        <div className="lg:flex-[0_0_40%] lg:px-20 px-3 lg:max-w-[40%] bg-[#fafafa] flex-[0_0_100%] max-w-[100%] lg:pl-8 lg:border-l border-gray-300 border-b ">
          <div className="flex items-center py-4 border-y lg:hidden border-gray-200 justify-between">
            <button
              onClick={() => setToggleShowProducts(!toggleShowProducts)}
              className="flex items-center gap-2 text-blue-400"
            >
              <h4 className="font-semibold text-[15px]">
                {toggleShowProducts ? "Ẩn" : "Hiển thị"} thông tin sản phẩm
              </h4>
              <ChevronDownIcon className="size-5" />
            </button>
            <span className="font-semibold text-lg">
              {data && formatPriceToVND(data?.totalPrice)}
            </span>
          </div>
          <div
            className={`flex flex-col transition-all  overflow-hidden duration-300 ease-linear lg:sticky lg:top-7 ${
              toggleShowProducts ? "max-h-[600px]" : "max-h-0 lg:max-h-max"
            }`}
          >
            {data && data?.products.length > 0
              ? data.products.map((product: ICartItems, index: number) => {
                  return (
                    <div
                      key={`${product.productId}-${index}`}
                      className="flex items-center border-b border-gray-200 py-4"
                    >
                      <div className="relative border border-gray-300 rounded p-2">
                        <img
                          width={50}
                          height={50}
                          src={product.image}
                          alt={product.title}
                          className="size-[50px] max-w-[50px] object-contain"
                        />
                        <span className="absolute top-[-10px] right-[-10px] size-6 text-center text-white bg-[#a3a3a3]">
                          {product.quantity}
                        </span>
                      </div>
                      <div className="ml-4  flex flex-col gap-1 mr-7">
                        <h4 className="line-clamp-2 font-medium text-[15px] ">
                          {product.title}
                        </h4>
                        {product.attributes && (
                          <p className="text-[13px] font-medium text-gray-500 flex items-center gap-1 line-clamp-2 ">
                            {Object.entries(product.attributes).map(
                              ([key, value]) => {
                                return <span key={key}>{value}</span>;
                              }
                            )}
                          </p>
                        )}
                      </div>
                      <h4 className="ml-auto font-semibold">
                        {formatPriceToVND(
                          product.finalPrice * product.quantity
                        )}
                      </h4>
                    </div>
                  );
                })
              : "Lỗi"}
            <div className="flex flex-col gap-2 py-6">
              <div className="flex items-center justify-between text-md font-semibold">
                <span>Tạm tính</span>
                <span>{formatPriceToVND(data?.totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-md font-semibold pb-4">
                <span>Giảm giá</span>
                <span>- {formatPriceToVND(0)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold border-t border-gray-300 pt-4">
                <span>Tổng cộng</span>
                <span className=" font-bold text-xl">
                  {formatPriceToVND(data?.totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
