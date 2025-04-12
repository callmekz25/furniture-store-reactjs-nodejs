import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/cartPageContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/api/cartService";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { Link } from "react-router-dom";
import ICart from "@/interfaces/cart.interface";
import Loading from "@/components/user/loading";
import { useForm } from "react-hook-form";
import useCheckoutOrder from "@/hooks/checkout/useCheckoutOrder";
import TransparentLoading from "@/components/loading/transparantLoading";
const ShoppingCart = () => {
  const { setIsCartPage } = useContext(PageContext);

  const { register, watch } = useForm();
  const note = watch("note");
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 30,
  });
  const { isPending, submitOrderDraft } = useCheckoutOrder();
  // Kiểm tra nếu user đang ở trang cart
  useEffect(() => {
    setIsCartPage(true);
    return () => setIsCartPage(false);
  }, [setIsCartPage]);
  // Xử lý tạo order trước khi chuyển trang checkout
  const handleProceedToCheckout = () => {
    submitOrderDraft({
      note,
      products: cartData.items,
      total_price: cartData.total_price,
      total_items: cartData.total_items,
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="break-point pb-[70px] pt-10">
        {isPending && <TransparentLoading />}
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
                <h3 className="mb-4 text-[16px] font-normal">
                  Bạn đang có{" "}
                  <span className="font-semibold">{cartData.total_items}</span>{" "}
                  sản phẩm trong giỏ hàng
                </h3>
                <div className="border  border-gray-300 px-5 rounded-lg">
                  {cartData.items.length > 0 ? (
                    cartData.items.map((item: ICart, index: number) => {
                      return (
                        <div
                          className={`flex items-start justify-between  py-5   ${
                            index !== cartData.items.length - 1
                              ? "border-b border-gray-200"
                              : ""
                          }`}
                          key={item.productId}
                        >
                          <div className="flex  lg:gap-4 gap-2">
                            <Link
                              to={`/products/${item.slug}`}
                              className="flex items-center relative justify-center h-fit  flex-shrink-0 flex-grow-0   border border-gray-200 size-[80px]"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                width={80}
                                height={80}
                                loading="lazy"
                                className="object-cover max-w-full "
                              />
                              <button
                                onClick={(e) => e.preventDefault()}
                                className="size-5 bg-gray-400 text-[8px] text-white rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                              >
                                Xóa
                              </button>
                            </Link>
                            <div className="flex flex-col gap-1">
                              <h3 className="font-medium text-[15px] line-clamp-1 pr-4">
                                {item.title}
                              </h3>
                              {item.attributes &&
                                item.attributes.length > 0 && (
                                  <p className="text-[13px] font-medium text-gray-500 line-clamp-2 ">
                                    {item.attributes.map((attr) => {
                                      return <span key={attr}>{attr}</span>;
                                    })}
                                  </p>
                                )}

                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-[15px] text-[#8f9bb3]">
                                  {formatPriceToVND(item.price)}
                                </span>
                                {item.discount > 0 && item.fakePrice > 0 && (
                                  <span className="font-medium line-through text-sm text-[#8f9bb3]">
                                    {formatPriceToVND(item.fakePrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex lg:gap-6 justify-between items-start">
                            <div className="flex flex-col gap-2 items-end">
                              <span className="font-bold text-[16px] ">
                                {formatPriceToVND(item.price * item.quantity)}
                              </span>
                              <div className="flex items-center ">
                                <button className="border border-gray-200 p-1.5 bg-[#f9f9f9]">
                                  <MinusIcon className="size-4" />
                                </button>
                                <span className="border font-semibold border-gray-200 px-4 py-1 text-sm ">
                                  1
                                </span>
                                <button className="border border-gray-200 p-1.5  bg-[#f9f9f9]">
                                  <PlusIcon className="size-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span>Chưa có sản phẩm trong giỏ hàng</span>
                  )}
                </div>
                <div className="bg-[#f3f4f4] mt-7 p-4 flex flex-col">
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
          <div className="lg:flex-[0_0_35%] px-4 lg:max-w-[35%]  flex-[0_0_100%] max-w-full">
            <div
              className="p-4  bg-white  rounded   h-fit sticky top-20 "
              style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.08)" }}
            >
              <h3 className="font-bold color-red text-xl mb-4 mt-2.5">
                Thông tin đơn hàng
              </h3>
              <div className="flex items-center justify-between py-2.5 border-y border-gray-300 border-dotted">
                <span className="font-bold text-[16px]">Tổng tiền</span>
                <span className="font-bold text-2xl text-red-500">
                  {formatPriceToVND(cartData.total_price)}
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
                disabled={isPending}
                className="py-2.5 px-4 flex mt-3 items-center text-[15px] justify-center bg-[#ff0000] uppercase font-bold text-white  w-full  "
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
