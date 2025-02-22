import {
  ShoppingBagIcon,
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../assets/bedRoom.png";
import useHiddenScroll from "@/hooks/useHiddenSscroll";
import { PageContext } from "@/context/PageContext";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const [user, setUser] = useState<{ userId: string; name: string } | null>(
    null
  );
  // Ẩn thanh sroll khi mở modal
  useHiddenScroll(isOpenMenu);
  useHiddenScroll(isOpenCart);

  const { isCartPage } = useContext(PageContext);
  // Lấy ra thông tin của user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="lg:px-[100px] px-6 py-3 flex items-center justify-between lg:py-3">
      <div className="flex items-center gap-3">
        <button onClick={() => setIsOpenMenu(true)}>
          <Bars3Icon className="size-8 lg:hidden block" />
        </button>
        <h3 className="font-bold text-2xl">3legant</h3>
      </div>
      <ul className="lg:flex hidden items-center gap-14 font-semibold opacity-70">
        <li>Trang chủ</li>
        <li>Mua sắm</li>
        <li>Sản phẩm</li>
        <li>Liên hệ</li>
      </ul>
      <div className=" flex items-center gap-6">
        <div className="lg:flex items-center hidden gap-1 font-medium text-[15px] opacity-70">
          <UserCircleIcon className="size-7" />
          {user ? (
            <span>{user.name}</span>
          ) : (
            <>
              <Link to="/signin">Đăng nhập</Link>
              <span>/</span>
              <Link to="/signup">Đăng ký</Link>
            </>
          )}
        </div>
        <button
          onClick={() => {
            if (isCartPage) {
              return;
            }
            setIsOpenCart(true);
          }}
        >
          <ShoppingBagIcon className="size-6" />
        </button>
      </div>
      {/* Menu mobile */}
      <div className={`overlay justify-start ${isOpenMenu ? "active" : ""}`}>
        <div
          className={`bg-white w-[95%] h-full  transition-all duration-300 p-6  ${
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
            <li className="py-3 border-b border-gray-300">Trang chủ</li>
            <li className="py-3 border-b border-gray-300">Sản phẩm</li>
            <li className="py-3 border-b border-gray-300">Bài viết</li>
            <li className="py-3 border-b border-gray-300">Liên hệ</li>
            <li className="py-3 border-b border-gray-300">Đăng nhập</li>
            <li className="py-3 border-b border-gray-300">Đăng ký</li>
            <li className="py-3 border-b border-gray-300">Giỏ hàng</li>
            <li className="py-3 border-b border-gray-300">Tài khoản</li>
          </ul>
        </div>
      </div>
      {/* Flyout Cart */}
      <div className={`overlay justify-end ${isOpenCart ? "active" : ""}`}>
        <div
          className={`bg-white lg:min-w-[400px] lg:w-auto w-[90%] h-full flex flex-col  box-border  transition-all duration-300 px-5 pt-6 pb-8  ${
            isOpenCart ? " translate-x-0" : "  translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-2xl">Giỏ hàng</h3>
            <button onClick={() => setIsOpenCart(false)}>
              <XMarkIcon className="size-8" />
            </button>
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="mt-4 flex flex-col gap-6">
              <div className="flex justify-between py-6 border-b border-gray-300">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center bg-[#f3f5f7]">
                    <img
                      src={Image}
                      alt=""
                      className="object-contain w-[90px] h-[100px]"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <span className="font-bold text-[16px] leading-[22px]">
                      Tray Table
                    </span>
                    <span className="font-medium text-[14px] text-gray-500">
                      Màu sắc: Đỏ
                    </span>
                    <div className="flex items-center justify-between border-2 border-gray-500 rounded px-2 py-1">
                      <button>
                        <MinusIcon className="size-4" />
                      </button>
                      <span>2</span>
                      <button>
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-end ">
                  <span className="font-bold text-[16px] leading-[22px]">
                    900.000 đ
                  </span>
                  <button>
                    <XMarkIcon className="size-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center border-t border-gray-300 justify-between font-bold text-[20px] py-4">
                <span>Tổng tiền</span>
                <span>9.861.000 đ</span>
              </div>
              <div className="flex flex-col gap-4">
                <button className="bg-black w-full rounded text-white font-semibold py-3">
                  Thanh toán
                </button>
                <button className="font-semibold underline text-[14px]">
                  Xem giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
