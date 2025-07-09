import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import formatPriceToVND from "@/utils/format-price";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/components/loading/loading";
import { useForm } from "react-hook-form";
import Error from "../shared/error";
import { useCreateOrderTemp } from "@/hooks/use-order";
import { ToastifyError } from "@/helpers/custom-toastify";
import {
  useDeleteProductCart,
  useGetCart,
  useUpdateQuantity,
} from "@/hooks/use-cart";
import ICartItems from "@/interfaces/cart/cart-items.interface";
const ShoppingCart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { register, watch } = useForm();
  const { isPending: isUpdatePending, mutate: updateProductCart } =
    useUpdateQuantity();
  const { isPending: isDeletePeding, mutate: deleteProductCart } =
    useDeleteProductCart();
  const { data: cartData, isLoading, error } = useGetCart();
  const { isPending, mutate: createOrderTemp } = useCreateOrderTemp();
  const handleUpdateQuantity = async (
    productId: string,
    attributes: {
      [key: string]: string;
    } | null,
    quantity: number
  ) => {
    const request = {
      productId,
      attributes,
      quantity,
    };
    updateProductCart(request, {
      onSuccess: (data) => {
        queryClient.setQueryData(["cart"], data);
      },
    });
  };
  const handleRemoveFromCart = async (
    productId: string,
    attributes: {
      [key: string]: string;
    } | null
  ) => {
    const request = {
      productId,
      attributes,
    };
    deleteProductCart(request, {
      onSuccess: (data) => {
        queryClient.setQueryData(["cart"], data);
      },
    });
  };

  // Handle create order temp before navigate
  const handleProceedToCheckout = () => {
    const request = {
      note: watch("note"),
      products: cartData!.items,
      totalPrice: cartData!.totalPrice,
      totalItems: cartData!.totalItems,
    };
    createOrderTemp(request, {
      onSuccess: ({ orderId }) => {
        navigate(`/checkouts/${orderId}`);
      },
      onError: (error) => ToastifyError(error.message),
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <div className="break-point pb-[70px] pt-10">
        {(isPending || isUpdatePending || isDeletePeding) && <Loading />}
        <div className="flex flex-wrap">
          <div className="px-4 lg:flex-[0_0_65%] lg:max-w-[65%] flex-[0_0_100%] max-w-full h-fit ">
            <div
              style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.08)" }}
              className="flex flex-col bg-white  rounded "
            >
              <h3 className="font-bold text-xl py-2.5 px-4 color-red border-b border-gray-200">
                Giỏ hàng của bạn
              </h3>
              {/* Product */}
              <div className="py-3 px-4">
                <h3
                  className={`mb-4 text-[16px] font-normal ${
                    cartData && cartData?.totalItems > 0 ? "block" : "hidden"
                  }`}
                >
                  Bạn đang có{" "}
                  <span className="font-semibold">
                    {cartData?.totalItems ?? 0}
                  </span>{" "}
                  sản phẩm trong giỏ hàng
                </h3>
                <div
                  className={`border  border-gray-300 px-5 rounded-lg ${
                    cartData && cartData?.totalItems > 0 ? "" : "border-none"
                  }`}
                >
                  {cartData && cartData?.items.length > 0 ? (
                    cartData.items.map((item: ICartItems, index: number) => {
                      return (
                        <div
                          className={`flex items-start justify-between  py-5   ${
                            index !== cartData.items.length - 1
                              ? "border-b border-gray-200"
                              : ""
                          }`}
                          key={`${item.productId}-${index}`}
                        >
                          <div className="flex ">
                            <Link
                              to={`/products/${item.slug}`}
                              className="flex items-center relative justify-center h-fit  flex-shrink-0 flex-grow-0   border border-gray-200 "
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                className="object-cover max-w-full lg:size-[80px] size-[60px]"
                              />
                              <button
                                disabled={isDeletePeding || isUpdatePending}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemoveFromCart(
                                    item.productId,
                                    item.attributes
                                  );
                                }}
                                className="size-5 bg-gray-400 text-[8px] text-white rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                              >
                                Xóa
                              </button>
                            </Link>
                            <div className="flex flex-col  pl-2 lg:pl-4 pr-4">
                              <h3 className="font-medium lg:text-[15px] text-sm line-clamp-1">
                                {item.title}
                              </h3>
                              {item.attributes && (
                                <p className="text-[13px] font-medium text-gray-500 flex items-center pl-1 line-clamp-2 ">
                                  {Object.entries(item.attributes).map(
                                    ([key, value]) => {
                                      return <span key={key}>{value}</span>;
                                    }
                                  )}
                                </p>
                              )}

                              <div className="flex items-center  flex-wrap">
                                <span className="font-semibold text-[13px] text-[#8f9bb3]">
                                  {formatPriceToVND(item.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex lg:gap-6 justify-between items-start">
                            <div className="flex flex-col gap-2 items-end">
                              <span className="font-bold text-[15px] ">
                                {formatPriceToVND(item.price * item.quantity)}
                              </span>
                              <div className="flex items-center ">
                                <button
                                  disabled={isDeletePeding || isUpdatePending}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateQuantity(
                                      item.productId,
                                      item.attributes,
                                      item.quantity - 1
                                    );
                                  }}
                                  className="border border-gray-200 p-1.5 bg-[#f3f4f4]"
                                >
                                  <MinusIcon className="size-4" />
                                </button>
                                <span className="border font-semibold border-gray-200 px-4 py-1 text-sm ">
                                  {item.quantity}
                                </span>
                                <button
                                  disabled={isDeletePeding || isUpdatePending}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateQuantity(
                                      item.productId,
                                      item.attributes,
                                      item.quantity + 1
                                    );
                                  }}
                                  className="border border-gray-200 p-1.5  bg-[#f3f4f4]"
                                >
                                  <PlusIcon className="size-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span>Giỏ hàng của bạn đang trống</span>
                  )}
                </div>
                <div
                  className={`bg-[#f3f4f4] mt-7 p-4  flex-col ${
                    cartData && cartData?.totalItems > 0 ? "flex" : "hidden"
                  }`}
                >
                  <label id="note" className="mb-2.5 text-sm font-semibold">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    id="note"
                    className="border resize-none  leading-normal  border-gray-300 outline-none rounded py-2.5 px-3 min-h-[140px] max-h-[140px] overflow-y-auto"
                    {...register("note")}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          {/* Oder summary */}
          <div className="lg:flex-[0_0_35%] px-4 lg:max-w-[35%] mt-4 lg:mt-0  flex-[0_0_100%] max-w-full">
            <div
              className="p-4  bg-white  rounded   h-fit sticky top-10 "
              style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.08)" }}
            >
              <h3 className="font-bold color-red text-xl mb-4 mt-2.5">
                Thông tin đơn hàng
              </h3>
              <div className="flex items-center justify-between py-2.5 border-y border-gray-300 border-dotted">
                <span className="font-bold text-[16px]">Tổng tiền</span>
                <span className="font-bold text-2xl text-red-500">
                  {formatPriceToVND(cartData?.totalPrice)}
                </span>
              </div>
              <ul className="flex flex-col gap-2 text-sm list-disc px-4 pt-3 ">
                <li>Phí vận chuyển sẽ được tính ở trang Thanh toán</li>
                <li>Mã giảm giá được nhập ở trang Thanh toán</li>
              </ul>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleProceedToCheckout();
                }}
                disabled={isPending || cartData?.totalItems === 0}
                className={`py-2.5 px-4 flex mt-3 items-center text-[15px] justify-center uppercase font-bold text-white  w-full   ${
                  cartData && cartData?.totalItems > 0
                    ? "bg-[#ff0000]"
                    : "bg-[#5a5a5a] pointer-events-none"
                }`}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
