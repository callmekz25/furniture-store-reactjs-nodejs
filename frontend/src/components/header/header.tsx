import {
  ShoppingBagIcon,
  Bars3Icon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useHiddenScroll from "@/hooks/useHiddenSscroll";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { openFlyoutCart } from "@/redux/slices/flyout-cart.slice";
import SearchBox from "@/components/search/searchBox";
import CONTACTS from "@/constants/contacts";
import FlyoutCart from "../cart/flyout-cart";
import { useGetOne } from "@/hooks/useGet";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);
  const ticking = useRef(false);

  const { data: user } = useGetOne("/get-user", ["user"], true);
  const dispatch = useAppDispatch();
  const { isOpen, isCartPage } = useAppSelector((state) => state.cart);
  const { pathname } = useLocation();

  const { data: cart, error } = useGetOne("/cart", ["cart"], true);

  const navigate = useNavigate();

  useHiddenScroll(isOpenMenu);
  useHiddenScroll(isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const header = headerRef.current;

          if (header) {
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
              header.style.top = "-112px";
            } else {
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
                  <p className="lg:block hidden ">
                    Tài khoản của <br />
                    <span className="font-medium">{user.name}</span>
                  </p>
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
                  {cart && cart.items && cart.items.length > 0 && (
                    <span className=" absolute flex items-center justify-center top-[-6px] right-[-10px] bg-red-500 size-5 text-[11px] text-white rounded-full">
                      {cart.total_items}
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
          <FlyoutCart />
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
