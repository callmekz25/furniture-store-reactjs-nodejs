import Loading from "@/components/loading/loading";
import PAYMENTS from "@/constants/payment";
import ICart from "@/interfaces/cart/cart.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";
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
} from "@/hooks/location";
import { usePayment } from "@/hooks/payment";
import { useGetOne } from "@/hooks/useGet";
import IOrder from "@/interfaces/order/order.interface";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IPaymentRequest>();
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOne<IOrder>(
    "/checkouts",
    ["checkouts", orderId!],
    true,
    orderId!,
    {
      enabled: !!orderId,
    }
  );
  const { mutate: confirmedPayment, isPending } = usePayment();
  const provinceId = watch("province");
  const districtId = watch("district");
  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    error: errorProvinces,
  } = useGetProvinces(data);
  const {
    data: districts,
    isLoading: isLoadingDistricts,
    error: errorDistricts,
  } = useGetDistricts(provinceId);
  const {
    data: wards,
    isLoading: isLoadingWards,
    error: errorWards,
  } = useGetWards(districtId);
  const handleCheckout = async (payload: IPaymentRequest) => {
    const province = provinces.find(
      (p: IProvince) => p.id === payload.province
    );
    const district = districts.find(
      (d: IDistrict) => d.id === payload.district
    );
    const ward = wards.find((w: IWard) => w.id === payload.ward);
    const res: IPaymentRequest = {
      ...payload,
      province: province.name,
      orderId: orderId!,
      district: district.name,
      ward: ward.name,
      total: data!.totalPrice,
    };
    confirmedPayment(res, {
      onSuccess: (res) => {
        if (res.status === 200) {
          window.location.href = res.data.payUrl;
        }
      },
      onError: (error) => alert(error.message),
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    navigate("/cart");
  }

  return (
    <div className="bg-white min-h-screen">
      <div className=" max-w-[85%]  flex  p-[5%]  mx-auto ">
        <div className="pt-4 flex-[0_0_60%] max-w-[60%] pr-8">
          <div className="flex items-center">Giỏ hàng</div>
          <h3 className="text-xl font-bold">Thông tin giao hàng</h3>
          <p className="mt-4 text-md font-medium text-gray-500">
            Bạn đã có tài khoản?{" "}
            <span className="font-semibold text-black">Đăng nhập</span>
          </p>
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
                className="outline-none px-2 py-1.5 border border-gray-300 rounded-md transition-all duration-500 focus:border-blue-500"
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
                  className="outline-none px-2 py-1.5 border border-gray-300 rounded-md transition-all duration-500 focus:border-blue-500"
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
                  className="outline-none px-2 py-1.5 border border-gray-300 rounded-md transition-all duration-500 focus:border-blue-500"
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
                      value={field.value}
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
                      value={field.value}
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
                      value={field.value}
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
                className="outline-none px-2 py-1.5 border border-gray-300 rounded-md transition-all duration-500 focus:border-blue-500"
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
            <div className="flex items-center justify-between mt-10">
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
        <div className="flex-[0_0_40%] max-w-[40%] pl-8 border-l border-gray-300 ">
          <div className="flex flex-col sticky top-7 ">
            {data?.products.length > 0
              ? data.products.map((product: ICart, index: number) => {
                  return (
                    <div
                      key={`${product.productId}-${index}`}
                      className="flex items-center border-b border-gray-200 py-4"
                    >
                      <div className="relative border border-gray-300 rounded-md p-2">
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
                        {product.attributes.length > 0 && (
                          <p className="text-sm font-normal opacity-80 flex items-center gap-1">
                            {product.attributes.map((att) => {
                              return <span key={att}>{att} </span>;
                            })}
                          </p>
                        )}
                      </div>
                      <h4 className="ml-auto font-semibold">
                        {formatPriceToVND(product.price * product.quantity)}
                      </h4>
                    </div>
                  );
                })
              : "Lỗi"}
            <div className="flex flex-col gap-2 pt-6">
              <div className="flex items-center justify-between text-md font-medium">
                <span>Tạm tính</span>
                <span>{formatPriceToVND(data.total_price)}</span>
              </div>
              <div className="flex items-center justify-between text-md font-medium pb-4">
                <span>Giảm giá</span>
                <span>-0</span>
              </div>
              <div className="flex items-center justify-between text-lg font-medium border-t border-gray-300 pt-4">
                <span>Tổng cộng</span>
                <span className=" font-semibold text-xl">
                  {formatPriceToVND(data.total_price)}
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
