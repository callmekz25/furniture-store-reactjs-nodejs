import {
  ShoppingBagIcon,
  Bars3Icon,
  UserIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { memo, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useHiddenScroll from "@/hooks/useHiddenSscroll";
import { PageContext } from "@/context/cartPageContext";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import formatPriceToVND from "@/utils/formatPriceToVND";
import useCart from "@/hooks/useCart";
import {
  closeFlyoutCart,
  openFlyoutCart,
} from "@/redux/slices/flyout-cart.slice";
const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isFlyoutCartOpen = useAppSelector((state) => state.cart.isOpen);

  const { cartData, isLoading, error, removeFromCart } = useCart();

  // Ẩn thanh sroll khi mở modal
  useHiddenScroll(isOpenMenu);
  useHiddenScroll(isFlyoutCartOpen);

  const { isCartPage } = useContext(PageContext);

  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
  };
  return (
    <div className="break-point py-3 flex items-center justify-between px-4 ">
      <div className="flex items-center gap-3">
        <button onClick={() => setIsOpenMenu(true)}>
          <Bars3Icon className="size-8 lg:hidden block" />
        </button>
        <h3 className="font-bold text-2xl">3legant</h3>
      </div>
      <ul className="lg:flex hidden items-center gap-14 font-semibold opacity-70">
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li>Mua sắm</li>
        <li>Sản phẩm</li>
        <li>Liên hệ</li>
      </ul>
      <div className=" flex items-center lg:gap-6 gap-3">
        <Link
          to="/account"
          className="flex items-center gap-1.5 font-medium text-[15px]"
        >
          <UserIcon className="size-6" />
          {user ? (
            <span className="lg:block hidden opacity-70">{user.name}</span>
          ) : (
            <>
              <Link to="/signin">Đăng nhập</Link>
              <span>/</span>
              <Link to="/signup">Đăng ký</Link>
            </>
          )}
        </Link>
        <button
          onClick={() => {
            if (isCartPage) {
              return;
            }
            dispatch(openFlyoutCart());
          }}
        >
          <ShoppingBagIcon className="size-6" />
        </button>
      </div>
      {/* Menu mobile */}
      <div className={`overlay justify-start ${isOpenMenu ? "active" : ""}`}>
        <div
          className={`bg-white w-[85%] h-full  transition-all duration-300 p-6  ${
            isOpenMenu ? "  translate-x-0" : "  translate-x-[-100%]"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-2xl">3legant</h3>
            <button onClick={() => setIsOpenMenu(false)}>
              <XMarkIcon className="size-8" />
            </button>
          </div>
          <ul className="mt-8 flex flex-col gap-4 text-[16px] font-semibold ">
            <li className="py-3 border-b border-gray-300">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="py-3 border-b border-gray-300">Sản phẩm</li>
            <li className="py-3 border-b border-gray-300">Bài viết</li>
            <li className="py-3 border-b border-gray-300">Liên hệ</li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/sigin">Đăng nhập</Link>
            </li>
            <li className="py-3 border-b border-gray-300">
              <Link to="/signup">Đăng ký</Link>
            </li>
            <li className="py-3 border-b border-gray-300">Giỏ hàng</li>
            <li className="py-3 border-b border-gray-300">Tài khoản</li>
          </ul>
        </div>
      </div>
      {/* Flyout Cart */}
      <div
        className={`overlay justify-end ${isFlyoutCartOpen ? "active" : ""}`}
      >
        <div
          className={`bg-white lg:max-w-[400px] lg:min-w-[400px] lg:w-auto w-[85%] md:max-w-[500px] md:min-w-[500px] md:w-auto h-full flex flex-col  box-border  transition-all duration-300 px-5 pt-6 pb-8  ${
            isFlyoutCartOpen ? " translate-x-0" : "  translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl">Giỏ hàng</h3>
            <button onClick={() => dispatch(closeFlyoutCart())}>
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <div className="flex flex-col justify-between flex-1 ">
            <div className="mt-4 flex flex-col gap-6">
              {isLoading ? (
                <span>Loading...</span>
              ) : cartData?.items.length > 0 ? (
                cartData.items.map((item) => {
                  return (
                    <div
                      className="flex justify-between py-6 border-b border-gray-300"
                      key={item.product._id}
                    >
                      <div className="flex gap-4">
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="flex relative items-center h-fit justify-center border border-gray-200 flex-shrink-0 flex-grow-0 md:basis-[75px] basis-[65px]"
                        >
                          <img
                            src={item.product.images[0]}
                            alt="image product"
                            className="object-contain max-w-full"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveFromCart(item.product._id);
                            }}
                            className="size-5 bg-gray-400 text-[8px] text-white rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                          >
                            Xóa
                          </button>
                        </Link>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-[16px] leading-[22px] line-clamp-1 pr-4">
                            {item.product.title}
                          </span>
                          <span className="font-medium text-sm text-gray-500">
                            Màu sắc: Đỏ
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end ">
                        <span className="font-bold text-[16px] text-red-600 leading-[22px]">
                          {formatPriceToVND(item.product.price)}
                        </span>
                        <div className="flex w-fit items-center  gap-3 mt-2 justify-between border border-gray-200 rounded px-2 py-1">
                          <button>
                            <MinusIcon className="size-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button>
                            <PlusIcon className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                "No data"
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center border-t border-gray-200 justify-between font-bold text-lg py-4">
                <span>Tổng tiền</span>
                <span>9.861.000 đ</span>
              </div>
              <div className="flex flex-col gap-4">
                <button className="bg-[#ff0000] w-full rounded text-white font-medium py-3">
                  Thanh toán
                </button>
                <Link
                  to="/cart"
                  className="font-semibold underline text-center text-sm"
                  onClick={() => dispatch(closeFlyoutCart())}
                >
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Header);
