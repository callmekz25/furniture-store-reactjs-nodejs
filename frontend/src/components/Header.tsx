import {
  ShoppingBagIcon,
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  return (
    <div className="lg:px-[100px] px-6 py-3 flex items-center justify-between lg:py-3">
      <div className="flex items-center gap-3">
        <button onClick={() => setIsOpenMenu(true)}>
          <Bars3Icon className="size-7 lg:hidden block" />
        </button>
        <h3 className="font-bold text-2xl">3legant</h3>
      </div>
      <ul className="lg:flex hidden items-center gap-14 font-medium opacity-70">
        <li>Trang chủ</li>
        <li>Mua sắm</li>
        <li>Sản phẩm</li>
        <li>Liên hệ</li>
      </ul>
      {/* Menu mobile */}
      <div className=" flex items-center gap-6">
        <div className="lg:flex items-center hidden gap-1 font-medium text-[15px] opacity-70">
          <UserCircleIcon className="size-7" />
          <Link to="/signup">Đăng nhập</Link>
          <span>/</span>
          <Link to="/">Đăng ký</Link>
        </div>
        <ShoppingBagIcon className="size-6" />
      </div>

      <div className={`overlay ${isOpenMenu ? "active" : ""}`}>
        <div
          className={`bg-white w-[95%] h-full  transition-all duration-300 p-6  ${
            isOpenMenu
              ? "opacity-100  translate-x-0"
              : "opacity-0  translate-x-[-100%]"
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
    </div>
  );
};
export default Header;
