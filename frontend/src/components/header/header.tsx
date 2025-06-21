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
import CategoriesMenu from "@/constants/categories-menu";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);
  const ticking = useRef(false);
  const [selectIndexMenu, setSelectIndexMenu] = useState<number | null>(null);
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
      className="  shadow-lg  text-white pt-4 pb-3    sticky w-full top-0 left-0 bg-[#c4123f] z-50 transition-all duration-500"
    >
      <div className="flex flex-col break-point relative ">
        <div className=" flex items-center px-2 ">
          <div className="flex items-center gap-3 min-w-[150px]">
            <button className="" onClick={() => setIsOpenMenu(true)}>
              <Bars3Icon className="size-8 lg:hidden block" />
            </button>
            <Link to="/" className="font-bold text-2xl">
              3legant
            </Link>
          </div>
          <div className="flex items-center   flex-1  flex-wrap justify-between">
            <div className="lg:opacity-100 opacity-0 pointer-events-none w-[60%] mx-auto">
              <SearchBox />
            </div>
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
                className=" flex items-center gap-2 lg:pr-0 pr-2"
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
                <span className="text-[13px] font-normal lg:block hidden">
                  Giỏ hàng
                </span>
              </button>
            </div>
          </div>

          {/* Flyout Cart */}
          <FlyoutCart />
        </div>
        <div className="lg:opacity-0 lg:mt-0 mt-6 opacity-100 lg:pointer-events-none w-full px-2">
          <SearchBox />
        </div>
        <div className="lg:flex hidden items-center justify-center gap-8 mt-3">
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
        {/* Menu mobile */}
        <div className=" top-[-40px] left-0 w-full h-[100vh] bg-white rounded overflow-hidden relative">
          <div className="w-full h-full relative">
            {/* Menu chính */}
            <div
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ${
                selectIndexMenu !== null ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <div className="overflow-y-auto h-full pb-[120px] px-4">
                <ul>
                  {CategoriesMenu.map((menu, index) => (
                    <li
                      key={menu.label}
                      className="flex justify-between items-center py-4 cursor-pointer border-t border-gray-200"
                      onClick={() => setSelectIndexMenu(index)}
                    >
                      <span className="text-black font-bold uppercase text-sm opacity-80 ml-2">
                        {menu.label}
                      </span>
                      <ChevronRight className="size-5 mr-2 text-black" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submenu */}
            <div
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ${
                selectIndexMenu !== null ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="h-full overflow-y-auto pb-[120px] px-4">
                <button
                  className="flex items-center gap-1 py-4 text-sm font-semibold"
                  onClick={() => setSelectIndexMenu(null)}
                >
                  <ChevronLeft className="size-4" />
                  Quay lại
                </button>
                <ul>
                  {selectIndexMenu !== null &&
                    CategoriesMenu[selectIndexMenu].children.map((sub, idx) => (
                      <li
                        key={idx}
                        className="py-3 pl-2 border-t border-gray-200 text-[15px] font-medium text-black cursor-pointer"
                      >
                        {sub}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Header);
