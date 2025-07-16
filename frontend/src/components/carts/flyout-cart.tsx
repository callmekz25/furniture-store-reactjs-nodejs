import useHiddenScroll from "@/hooks/use-hidden-scroll";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import formatPriceToVND from "@/utils/format-price";
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { closeFlyoutCart } from "@/redux/slices/flyout-cart.slice";
import { Link } from "react-router-dom";
import {
  useDeleteProductCart,
  useGetCart,
  useUpdateQuantity,
} from "@/hooks/use-cart";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../loading/loading";
import ICartItems from "@/interfaces/cart/cart-items.interface";
import useCheckScreen from "@/hooks/use-check-screen";
import { useEffect, useRef } from "react";
import getFinalPrice from "@/utils/get-final-price";
import getPrice from "@/utils/get-price";
const FlyoutCart = () => {
  const queryClient = useQueryClient();
  const isSreenMobile = useCheckScreen();
  const cartRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, error } = useGetCart();
  const { isPending: isUpdatePending, mutate: updateProductCart } =
    useUpdateQuantity();
  const { isPending: isDeletePeding, mutate: deleteProductCart } =
    useDeleteProductCart();
  const dispatch = useAppDispatch();
  const isFlyoutCartOpen = useAppSelector((state) => state.cart.isOpen);
  useHiddenScroll(isFlyoutCartOpen);
  const handleUpdateQuantity = async (
    productId: string,
    attributes: {
      [key: string]: string;
    },
    quantity: number
  ) => {
    const request = {
      productId,
      attributes,
      quantity,
    };

    updateProductCart(request, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },
    });
  };
  const handleRemoveFromCart = async (
    productId: string,
    attributes: {
      [key: string]: string;
    }
  ) => {
    const request = {
      productId,
      attributes,
    };

    deleteProductCart(request, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },
    });
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        isFlyoutCartOpen
      ) {
        dispatch(closeFlyoutCart());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlyoutCartOpen, dispatch]);
  return (
    <>
      {isFlyoutCartOpen && isSreenMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[998]"></div>
      )}
      <div
        ref={cartRef}
        className={`bg-white z-[999] flex flex-col rounded text-black
      fixed lg:absolute
      bottom-0 lg:bottom-auto
      left-0 lg:left-auto
      w-full lg:w-[420px]
      lg:h-auto
      max-h-[calc(100vh-70px)]
      lg:right-0 lg:top-[45px]
    px-5 py-[15px]
      ${
        isFlyoutCartOpen
          ? "opacity-100 lg:scale-100 pointer-events-auto  translate-y-0"
          : "opacity-0 lg:scale-90 pointer-events-none lg:translate-y-0 translate-y-full"
      }`}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 5px 2px",
          transition: "transform 0.35s ease, opacity 0.35s ease",
        }}
      >
        {/* Header */}
        <div className="lg:flex hidden items-center border-b border-gray-300 justify-center pb-2">
          <h3 className="font-semibold  uppercase text-lg text-center text-red-600">
            Giỏ hàng
          </h3>
        </div>
        <div className=" lg:hidden flex font-semibold  pb-4  items-center justify-between">
          <span>{data?.totalItems} sản phẩm</span>
          <button onClick={() => dispatch(closeFlyoutCart())}>Đóng</button>
        </div>
        {error && <span>Lỗi xảy ra</span>}
        {isLoading ? (
          <Loading />
        ) : (
          // Scroll items
          <div className="flex flex-col min-h-0  lg:max-h-[320px] mr-[-20px] pr-5  flex-1 overflow-y-auto">
            {data && data.items.length > 0 ? (
              data.items.map((item: ICartItems, index: number) => {
                return (
                  <div
                    className="flex justify-between  py-4 border-b border-gray-200 "
                    key={`${item.productId}-${index}`}
                  >
                    <div className="flex gap-2 w-full">
                      <div className="pr-[14px]">
                        <Link
                          onClick={() => dispatch(closeFlyoutCart())}
                          to={`/products/${item.slug}`}
                          className="flex  items-center h-fit justify-center border border-gray-200 flex-shrink-0 flex-grow-0 basis-[75px] "
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            width={75}
                            height={75}
                            className="object-cover max-w-full aspect-[75/75] size-[75px]"
                          />
                        </Link>
                      </div>

                      <div className="flex flex-col relative  flex-1">
                        <Link
                          onClick={() => dispatch(closeFlyoutCart())}
                          to={`/products/${item.slug}`}
                          className="font-bold  block uppercase pr-[40px] text-wrap text-start text-[12px] line-clamp-2 "
                        >
                          {item.title}
                        </Link>
                        {item.attributes && (
                          <p className="font-medium mb-[7px] line-clamp-2  text-[13px] text-gray-500 flex items-center gap-1">
                            {Object.entries(item.attributes).map(
                              ([key, value]) => {
                                return <span key={key}>{value}</span>;
                              }
                            )}
                          </p>
                        )}
                        <div className="flex items-center mt-auto justify-between">
                          <div className="flex w-fit items-center  ">
                            <button
                              disabled={isDeletePeding || isUpdatePending}
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateQuantity(
                                  item.productId,
                                  item.attributes!,
                                  item.quantity - 1
                                );
                              }}
                              className="border border-gray-100 p-1.5  bg-[#f3f4f4]"
                            >
                              <MinusIcon className="size-4" />
                            </button>
                            <span className="border font-semibold border-gray-100 px-4 py-1 text-sm ">
                              {item.quantity}
                            </span>
                            <button
                              disabled={isDeletePeding || isUpdatePending}
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateQuantity(
                                  item.productId,
                                  item.attributes!,
                                  item.quantity + 1
                                );
                              }}
                              className="border border-gray-100 p-1.5  bg-[#f3f4f4]"
                            >
                              <PlusIcon className="size-4" />
                            </button>
                          </div>
                          <div className="">
                            <span className="font-semibold text-sm text-black leading-[26px]">
                              {item.promotion
                                ? formatPriceToVND(getFinalPrice(item))
                                : formatPriceToVND(getPrice(item))}
                            </span>
                          </div>
                        </div>
                        <button
                          disabled={isDeletePeding || isUpdatePending}
                          onClick={() =>
                            handleRemoveFromCart(
                              item.productId,
                              item.attributes
                            )
                          }
                          className=" absolute right-0 top-0"
                        >
                          <XMarkIcon className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col justify-center gap-2 items-center mt-10">
                <ShoppingCartIcon className="size-14 color-red" />
                <span className="text-gray-500">Hiện chưa có sản phẩm</span>
              </div>
            )}
          </div>
        )}
        {/* Total  */}
        <div className="flex flex-col mt-auto flex-shrink-0  border-t border-gray-200">
          <div className="flex items-center  justify-between font-bold  py-3">
            <span className="font-medium text-sm uppercase">Tổng tiền</span>
            <span className="text-red-500 text-[16px] font-bold">
              {formatPriceToVND(data?.totalPrice ?? 0)}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              to="/cart"
              className="font-medium rounded-full  bg-[#fc0000] text-white px-4 py-2 text-center text-sm"
              onClick={() => dispatch(closeFlyoutCart())}
            >
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlyoutCart;
