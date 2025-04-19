import {
  ShoppingBagIcon,
  Bars3Icon,
  UserIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useHiddenScroll from "@/hooks/shared/useHiddenSscroll";
import { PageContext } from "@/context/cartPageContext";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import formatPriceToVND from "@/utils/formatPriceToVND";
import useCart from "@/hooks/cart/useCart";
import {
  closeFlyoutCart,
  openFlyoutCart,
} from "@/redux/slices/flyout-cart.slice";
import ICart from "@/interfaces/cart.interface";
import { ShoppingCart } from "lucide-react";

import SearchBox from "./searchBox";
import CONTACTS from "@/constants/contacts";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);
  const ticking = useRef(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isFlyoutCartOpen = useAppSelector((state) => state.cart.isOpen);
  const { pathname } = useLocation();

  const { cartData, isLoading, error, removeFromCart, updateQuantityToCart } =
    useCart();

  const { isCartPage } = useContext(PageContext);
  const navigate = useNavigate();
  // Ẩn thanh sroll khi mở modal
  useHiddenScroll(isOpenMenu);
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

  // Ẩn hiện header khi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const header = headerRef.current;

          if (header) {
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
              // header.style.transform = "translateY(-100%)";
              header.style.top = "-112px";
            } else {
              // header.style.transform = "translateY(0)";
              header.style.top = "0";
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (error) {
    alert(error);
  }

  return (
    <div
      ref={headerRef}
      className="  shadow-lg  text-white pt-4 pb-3   sticky w-full top-0 left-0 bg-[#c4123f] z-50 transition-all duration-500"
    >
      <div className="flex flex-col break-point ">
        <div className=" flex items-center px-2 ">
          <div className="flex items-center gap-3 min-w-[150px]">
            <button onClick={() => setIsOpenMenu(true)}>
              <Bars3Icon className="size-8 lg:hidden block" />
            </button>
            <Link to="/" className="font-bold text-2xl">
              3legant
            </Link>
          </div>
          <div className="flex items-center   flex-1  flex-wrap justify-between">
            <SearchBox />
            <div className=" flex items-center lg:gap-6 gap-3">
              <div className="flex  items-center gap-1.5  text-[13px] font-normal">
                <button
                  onClick={() => {
                    if (pathname === "/signin") {
                      return;
                    }
                    navigate("/account");
                  }}
                >
                  <UserIcon className="size-6" />
                </button>
                {user ? (
                  <span className="lg:block hidden ">{user.name}</span>
                ) : (
                  <div className="lg:flex hidden  flex-col">
                    <div className="flex items-center">
                      <Link to="/signin">Đăng nhập</Link>
                      <span>/</span>
                      <Link to="/signup">Đăng ký</Link>
                    </div>
                  </div>
                )}
              </div>
              <button
                className=" flex items-center gap-2"
                onClick={() => {
                  if (isCartPage) {
                    return;
                  }
                  dispatch(openFlyoutCart());
                }}
              >
                <div className="relative">
                  <ShoppingBagIcon className="size-6 " />
                  {cartData && cartData.items && cartData.items.length > 0 && (
                    <span className=" absolute flex items-center justify-center top-[-6px] right-[-10px] bg-red-500 size-5 text-[11px] text-white rounded-full">
                      {cartData.total_items}
                    </span>
                  )}
                </div>
                <span className="text-[13px] font-normal">Giỏ hàng</span>
              </button>
            </div>
          </div>
          {/* Menu mobile */}
          <div
            className={`overlay justify-start ${isOpenMenu ? "active" : ""}`}
          >
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
                  <Link to="/signin">Đăng nhập</Link>
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
            className={`overlay z-[200] justify-end ${
              isFlyoutCartOpen ? "active" : ""
            }`}
          >
            <div
              className={`bg-white  max-h-screen  w-[85%] lg:w-[30%] md:w-[60%]  h-full flex flex-col  box-border  transition-all duration-300  pt-6 pb-4  ${
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
                    {cartData?.items.length > 0 ? (
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
                        <ShoppingCart className="size-14 color-red" />
                        <span className="text-gray-500">
                          Hiện chưa có sản phẩm
                        </span>
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
        </div>
        <div className="flex items-center justify-center gap-8 mt-3">
          {CONTACTS.map((ct) => {
            return (
              <div
                key={ct.label}
                className="flex items-center gap-1 text-[13px]"
              >
                {ct.icon} <span>{ct.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default memo(Header);
