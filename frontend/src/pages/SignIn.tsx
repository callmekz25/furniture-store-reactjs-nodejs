import Layout from "@/layouts";
import { Link } from "react-router-dom";
import Image from "../assets/sale.jpg";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Layout>
      <div className="flex lg:grid lg:grid-cols-2 flex-col">
        <div className="flex items-center justify-center">
          <img src={Image} alt="" className=" object-contain w-full h-full" />
        </div>
        <div className="flex flex-col lg:justify-center lg:items-start pb-24 lg:pb-0 lg:pl-20 lg:pr-44 px-6 py-8 w-full">
          <span className="font-semibold text-[40px] leading-[44px]">
            Đăng nhập
          </span>
          <p className="mt-6 flex items-center gap-2 font-medium text-[#6C7275] text-[16px] leading-[26px]">
            Chưa có tài khoản?
            <Link className="text-[#38CB89] font-semibold" to="/signup">
              Đăng ký
            </Link>
          </p>
          <div className="flex flex-col gap-10 mt-8 font-medium w-full">
            <div className="relative form-input">
              <input
                type="email"
                className="outline-none transition-all duration-300 hover:border-black focus:border-black bg-transparent px-1 py-1 border-b border-gray-300 w-full"
              />
              <label
                htmlFor=""
                className="absolute font-medium text-[#6C7275] left-0 top-0 transition-all duration-300 "
              >
                Email
              </label>
            </div>
            <div className="relative form-input">
              <input
                type={showPassword ? "text" : "password"}
                className="outline-none transition-all duration-300 hover:border-black focus:border-black bg-transparent px-1 py-1 border-b border-gray-300 w-full"
              />
              <label
                htmlFor=""
                className="absolute font-medium text-[#6C7275] left-0 top-0 transition-all duration-300 "
              >
                Mật khẩu
              </label>
              <button
                className="flex items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="size-5 absolute right-0 top-1/2 -translate-y-1/2 text-[#6C7275]" />
                ) : (
                  <EyeSlashIcon className="size-5 absolute right-0 top-1/2 -translate-y-1/2 text-[#6C7275]" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="size-4 rounded-lg"
                />
                <label
                  htmlFor="remember"
                  className="text-[#6C7275] text-[16px] font-medium"
                >
                  Nhớ tài khoản
                </label>
              </div>
              <button className="underline text-[16px font-medium">
                Quên mật khẩu?
              </button>
            </div>
            <button className="bg-black rounded-lg mt-8 leading-[28px] text-white font-medium py-2.5 px-4 flex items-center justify-center">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
