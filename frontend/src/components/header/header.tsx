import {
  ShoppingBagIcon,
  Bars3Icon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useHiddenScroll from "@/hooks/use-hidden-scroll";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { openFlyoutCart } from "@/redux/slices/flyout-cart.slice";
import SearchBox from "@/components/search/search-box";
import CONTACTS from "@/constants/contacts";
import FlyoutCart from "../carts/flyout-cart";
import CategoriesMenu from "@/constants/categories-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryMenu from "../sections/category/category-menu";
import { useGetUser } from "@/hooks/use-account";
import { useGetCart } from "@/hooks/use-cart";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);
  const [selectIndexMenu, setSelectIndexMenu] = useState<number | null>(null);
  const { data: user } = useGetUser();
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.cart);
  const { pathname } = useLocation();
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const { data: cart, error } = useGetCart();

  const navigate = useNavigate();

  useHiddenScroll(isOpenMenu);
  useHiddenScroll(isOpen);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  if (error) {
    alert(error);
  }

  return (
    <>
      <div className="w-full top-0 left-0 sticky  z-50 transition-all duration-500">
        <div className="bg-[#c4123f]  shadow-lg  text-white pt-4 pb-3">
          <div className="flex flex-col xl:max-w-[1400px] lg:max-w-full md:max-w-full sm:max-w-full ml-auto mr-auto relative ">
            <div className=" flex items-center px-2 ">
              <div className="flex items-center gap-3 min-w-[150px]">
                <button
                  className=""
                  onClick={() => setIsOpenMenu((prev) => !prev)}
                >
                  {isOpenMenu ? (
                    <XMarkIcon className="size-8 lg:hidden block" />
                  ) : (
                    <Bars3Icon className="size-8 lg:hidden block" />
                  )}
                </button>
                <Link to="/" className="font-bold text-2xl">
                  VNest
                </Link>
              </div>
              <div className="flex items-center   flex-1  flex-wrap justify-between">
                <div className="lg:opacity-100 opacity-0 pointer-events-none lg:pointer-events-auto w-[60%] mx-auto">
                  <SearchBox />
                </div>
                <div className=" flex items-center lg:gap-6 gap-3">
                  <button
                    className="flex  items-center gap-1.5  text-[13px] font-normal"
                    onClick={() => {
                      if (pathname === "/signin") {
                        return;
                      }
                      navigate("/account");
                    }}
                  >
                    <UserIcon className="size-6" />
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
                  </button>
                  <div className="relative">
                    <button
                      className=" flex items-center relative gap-2 lg:pr-0 pr-2"
                      onClick={() => {
                        if (pathname === "/cart") {
                          return;
                        }
                        setIsOpenMenu(false);
                        dispatch(openFlyoutCart());
                      }}
                    >
                      <div className="relative">
                        <ShoppingBagIcon className="size-6 " />
                        {cart && cart.items && cart.items.length > 0 && (
                          <span className=" absolute flex items-center justify-center top-[-6px] right-[-10px] bg-red-600 size-5 text-[11px] font-semibold text-white rounded-full">
                            {cart.totalItems}
                          </span>
                        )}
                      </div>
                      <span className="text-[13px] font-normal lg:block hidden">
                        Giỏ hàng
                      </span>
                    </button>
                    {/* Flyout Cart */}
                    <FlyoutCart />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden lg:mt-0 mt-2 block lg:pointer-events-none w-full px-2">
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
          </div>
          {/* Menu mobile */}
          <div
            className={`top-20 left-0 w-full  h-[100vh] z-50  bg-white transition-all  duration-200 ease-linear rounded overflow-hidden absolute ${
              isOpenMenu
                ? "opacity-100 scale-100"
                : " scale-90  pointer-events-none opacity-0 "
            }`}
          >
            <div className="w-full h-full relative">
              <div
                className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ${
                  selectIndexMenu !== null
                    ? "-translate-x-full"
                    : "translate-x-0"
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

              <div
                className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${
                  selectIndexMenu !== null
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              >
                <div className="h-full overflow-y-auto pb-[120px] px-4">
                  <button
                    className="flex items-center gap-1 text-black py-3 text-[15px] opacity-70 uppercase font-medium"
                    onClick={() => setSelectIndexMenu(null)}
                  >
                    <ChevronLeft className="size-5" />
                    Quay về
                  </button>
                  <ul>
                    {selectIndexMenu !== null && (
                      <>
                        <li>
                          <Link
                            to={`/collections/${CategoriesMenu[selectIndexMenu].slug}`}
                            className="py-3 pl-2 border-t block border-gray-200 text-[15px] font-semibold text-black cursor-pointer"
                            onClick={() => {
                              setIsOpenMenu(false);
                              setSelectIndexMenu(null);
                            }}
                          >
                            Xem tất cả "{CategoriesMenu[selectIndexMenu].label}"
                          </Link>
                        </li>
                        {CategoriesMenu[selectIndexMenu].child.map(
                          (sub, index) => (
                            <li key={sub.label}>
                              <Link
                                onClick={() => {
                                  setIsOpenMenu(false);
                                  setSelectIndexMenu(null);
                                }}
                                to={`/collections/${sub.slug}`}
                                className={`py-3 pl-2 block text-sm font-normal opacity-70 text-black cursor-pointer ${
                                  index !== 0 ||
                                  index !==
                                    CategoriesMenu[selectIndexMenu].child
                                      .length -
                                      1
                                    ? "border-t border-gray-200"
                                    : ""
                                }`}
                              >
                                - {sub.label}
                              </Link>
                            </li>
                          )
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:block hidden  ">
          <CategoryMenu />
        </div>
      </div>
    </>
  );
};
export default memo(Header);
