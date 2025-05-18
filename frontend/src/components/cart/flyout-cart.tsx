import useHiddenScroll from "@/hooks/shared/useHiddenSscroll";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import formatPriceToVND from "@/utils/formatPriceToVND";
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import useCart from "@/hooks/cart/useCart";
import { closeFlyoutCart } from "@/redux/slices/flyout-cart.slice";
import ICart from "@/interfaces/cart.interface";
import { Link } from "react-router-dom";
const FlyoutCart = () => {
  const { cartData, isLoading, error, removeFromCart, updateQuantityToCart } =
    useCart();
  const dispatch = useAppDispatch();
  const isFlyoutCartOpen = useAppSelector((state) => state.cart.isOpen);
  useHiddenScroll(isFlyoutCartOpen);
  const handleUpdateQuantity = async (
    productId: string,
    attributes: string[],
    quantity: number
  ) => {
    await updateQuantityToCart({ productId, attributes, quantity });
  };
  const handleRemoveFromCart = async (
    productId: string,
    attributes: string[]
  ) => {
    await removeFromCart({ productId, attributes });
  };
  return (
    <div
      className={`overlay z-[200] justify-end ${
        isFlyoutCartOpen ? "active" : ""
      }`}
    >
      <div
        className={`bg-white text-black  max-h-screen  w-[85%] lg:w-[30%] md:w-[60%]  h-full flex flex-col  box-border  transition-all duration-300  pt-6 pb-4  ${
          isFlyoutCartOpen ? " translate-x-0" : "  translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5">
          <h3 className="font-bold text-xl">Giỏ hàng</h3>
          <button onClick={() => dispatch(closeFlyoutCart())}>
            <XMarkIcon className="size-6" />
          </button>
        </div>
        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <div className="flex flex-col justify-between flex-1 min-h-0">
            <div className="mt-4 flex flex-col gap-4  flex-1 overflow-y-auto px-5">
              {cartData && cartData?.items.length > 0 ? (
                cartData.items.map((item: ICart, index: number) => {
                  return (
                    <div
                      className="flex justify-between  py-4 border-b border-gray-300 "
                      key={`${item.productId}-${index}`}
                    >
                      <div className="flex gap-2 ">
                        <Link
                          to={`/products/${item.slug}`}
                          className="flex relative items-center h-fit justify-center border border-gray-200 flex-shrink-0 flex-grow-0 basis-[75px] "
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            width={75}
                            height={75}
                            className="object-cover max-w-full aspect-[75/75] size-[75px]"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveFromCart(
                                item.productId,
                                item.attributes
                              );
                            }}
                            className="size-6 bg-gray-400 text-[10px] text-white rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-30"
                          >
                            Xóa
                          </button>
                        </Link>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-sm leading-[17.4px] line-clamp-2 pr-2">
                            {item.title}
                          </span>
                          <p className="font-medium line-clamp-2  text-[13px] text-gray-500">
                            {item.attributes && item.attributes.length > 0
                              ? item.attributes.map((at: string) => {
                                  return <span key={at}>{at}</span>;
                                })
                              : ""}
                          </p>
                          <div className="flex w-fit items-center  ">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateQuantity(
                                  item.productId,
                                  item.attributes,
                                  item.quantity - 1
                                );
                              }}
                              className="border border-gray-100 p-1.5  bg-[#f9f9f9]"
                            >
                              <MinusIcon className="size-4" />
                            </button>
                            <span className="border font-semibold border-gray-100 px-4 py-1 text-sm ">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateQuantity(
                                  item.productId,
                                  item.attributes,
                                  item.quantity + 1
                                );
                              }}
                              className="border border-gray-100 p-1.5  bg-[#f9f9f9]"
                            >
                              <PlusIcon className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col  items-end ">
                        <span className="font-semibold text-sm text-black leading-[26px]">
                          {formatPriceToVND(item.price)}
                        </span>
                        <span className="font-normal text-sm text-gray-500 line-through leading-[20.3px]">
                          {item.fakePrice > 0 && item.discount
                            ? formatPriceToVND(item.fakePrice)
                            : ""}
                        </span>
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
            <div className="flex flex-col flex-shrink-0 px-5">
              <div className="flex items-center border-t border-gray-200 justify-between font-bold text-lg py-3">
                <span>Tổng tiền</span>
                <span className="text-red-500">
                  {cartData?.total_price
                    ? formatPriceToVND(cartData.total_price)
                    : 0}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  to="/cart"
                  className="font-semibold  bg-red-600 text-white px-4 py-3 text-center text-md"
                  onClick={() => dispatch(closeFlyoutCart())}
                >
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlyoutCart;
