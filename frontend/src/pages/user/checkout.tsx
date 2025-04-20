import { createMomoPayment } from "@/api/paymentService";
import TransparentLoading from "@/components/loading/transparantLoading";
import Loading from "@/components/loading/loading";
import PAYMENTS from "@/constants/payment";
import useCheckoutOrder from "@/hooks/checkout/useCheckoutOrder";
import useDistricts from "@/hooks/location/useDistricts";
import useProvinces from "@/hooks/location/useProvinces";
import useWards from "@/hooks/location/useWards";
import ICart from "@/interfaces/cart.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { orderId } = useParams();
  const { data, isLoading, error } = useCheckoutOrder(orderId);
  const provinceId = watch("province");
  const districtId = watch("district");
  const wardId = watch("ward");
  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    error: errorProvinces,
  } = useProvinces();
  const {
    data: districts,
    isLoading: isLoadingDistricts,
    error: errorDistricts,
  } = useDistricts(provinceId);
  const {
    data: wards,
    isLoading: isLoadingWards,
    error: errorWards,
  } = useWards(districtId);
  const handleCheckout = async (payload) => {
    const totalPrice = data.total_price;

    const res = await createMomoPayment({
      orderId,
      total_price: totalPrice,
      ...payload,
    });
    if (res && res.resultCode === 0 && res.payUrl) {
      window.location.href = res.payUrl;
    }
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
            {(isLoadingProvinces || isLoadingDistricts || isLoadingWards) && (
              <TransparentLoading />
            )}
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
            <div className=" flex items-center gap-2 flex-wrap">
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
                {PAYMENTS.map((payment, index) => {
                  return (
                    <label
                      key={payment.label}
                      htmlFor={payment.label}
                      className={`flex items-center hover:cursor-pointer gap-4 px-4 py-6 ${
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
                className="px-3 py-4 rounded bg-red-700 text-white font-sembibold"
              >
                Hoàn tất đơn hàng
              </button>
            </div>
          </form>
        </div>
        <div className="flex-[0_0_40%] max-w-[40%] pl-8 border-l border-gray-300">
          <div className="flex flex-col">
            {data?.products.length > 0
              ? data.products.map((product: ICart) => {
                  return (
                    <div
                      key={product.productId}
                      className="flex items-center border-b border-gray-300 py-4"
                    >
                      <div className="relative border border-gray-300 rounded-md p-2">
                        <img
                          width={60}
                          height={60}
                          src={product.image}
                          alt={product.title}
                          className="size-[60px] max-w-[60px] object-contain"
                        />
                        <span className="absolute top-[-10px] right-[-10px] size-7 text-center text-white bg-[#a3a3a3]">
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
