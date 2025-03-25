import Layout from "@/layouts/userLayout";
import { Link } from "react-router-dom";
import Image from "../../assets/sale.jpg";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { registerThunk } from "@/redux/actions/auth.action";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<Inputs>();
  // Hàm xử lý submit đăng ký
  const onSubmit = async (data: Inputs) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      if (success) {
        alert("Đăng ký thành công");
      }
    } catch (error) {
      alert(error.mess);
    }
  };

  // Lấy ra giá trị của các trường
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  console.log(errors.root);

  return (
    <Layout>
      <div className="flex lg:grid lg:grid-cols-2 flex-col">
        <div className="flex items-center justify-center">
          <img src={Image} alt="" className=" object-contain w-full h-full" />
        </div>
        <div className="flex flex-col pb-24 lg:pb-0 lg:justify-center lg:items-start lg:pl-20 lg:pr-44 px-6 py-8 w-full">
          <span className="font-semibold text-[40px] leading-[44px]">
            Đăng ký
          </span>
          <p className="mt-6 flex items-center gap-2 font-medium text-[#6C7275] text-[16px] leading-[26px]">
            Đã có tài khoản?
            <Link className="text-[#38CB89] font-semibold" to="/signin">
              Đăng nhập
            </Link>
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10 mt-8 font-medium w-full"
          >
            <div className="relative form-input">
              <input
                type="text"
                id="name"
                className="outline-none transition-all duration-300 hover:border-black focus:border-black bg-transparent px-1 py-1 border-b border-gray-300 w-full"
                {...register("name", { required: true })}
              />
              <label
                htmlFor="name"
                className={`absolute font-medium text-[#6C7275] left-0 top-0 transition-all duration-300 ${
                  name ? "translate-y-[-20px] text-black text-[14px]" : ""
                }`}
              >
                Họ tên
              </label>
              {errors.name && (
                <span className="text-[13px] text-red-500 font-medium">
                  Họ tên không được trống
                </span>
              )}
            </div>
            <div className="relative form-input">
              <input
                type="text"
                id="email"
                className="outline-none transition-all duration-300 hover:border-black focus:border-black bg-transparent px-1 py-1 border-b border-gray-300 w-full"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              <label
                htmlFor="email"
                className={`absolute font-medium text-[#6C7275] left-0 top-0 transition-all duration-300 ${
                  email ? "translate-y-[-20px] text-black text-[14px]" : ""
                }`}
              >
                Email
              </label>
              {errors.email?.type === "required" && (
                <span className="text-[13px] text-red-500 font-medium">
                  Email không được trống
                </span>
              )}

              {errors.email?.type === "pattern" && (
                <span className="text-[13px] text-red-500 font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="relative form-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="outline-none transition-all duration-300 hover:border-black focus:border-black bg-transparent px-1 py-1 border-b border-gray-300 w-full"
                {...register("password", { required: true, minLength: 6 })}
              />
              <label
                htmlFor="password"
                className={`absolute font-medium text-[#6C7275] left-0 top-0 transition-all duration-300 ${
                  password ? "translate-y-[-20px] text-black text-[14px]" : ""
                }`}
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
              {errors.password?.type === "required" && (
                <span className="text-[13px] text-red-500 font-medium">
                  Mật khẩu không được trống
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-[13px] text-red-500 font-medium">
                  Mật khẩu tối thiểu 6 kí tự
                </span>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-red-700 uppercase rounded mt-8 leading-[28px] text-white font-medium py-3 px-4 flex items-center justify-center ${
                loading ? "opacity-80" : ""
              }`}
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
