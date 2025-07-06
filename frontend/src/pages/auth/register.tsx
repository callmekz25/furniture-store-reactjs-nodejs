import { Link, useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/use-auth";
import Loading from "@/components/loading/loading";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate: registerAccount, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // Hàm xử lý submit đăng ký
  const onSubmit = async (data: Inputs) => {
    registerAccount(data, {
      onSuccess: () => {
        navigate("/signin");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center px-5 py-20 break-point">
        {isPending && <Loading />}
        <div className="flex flex-col bg-white rounded-lg py-8  px-4 lg:px-6 w-full lg:max-w-[600px]  border border-gray-100">
          <h3 className="font-semibold text-[25px] text-center">Đăng ký</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-8 font-medium w-full"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className=" font-semibold text-md">
                Họ tên
              </label>
              <input
                type="text"
                id="name"
                className="outline-none border bg-[#f9fbfc] border-gray-200 rounded-md px-2 py-2 font-normal text-md"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-[13px] text-red-500 font-medium">
                  Họ tên không được trống
                </span>
              )}
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="email" className=" font-semibold text-md">
                Email
              </label>
              <input
                type="text"
                placeholder="example@gmail.com"
                id="email"
                className="outline-none border bg-[#f9fbfc] border-gray-200 rounded-md px-2 py-2 font-normal text-md "
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
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
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className=" font-semibold text-md">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="outline-none border border-gray-200 bg-[#f9fbfc] rounded-md px-2 py-2 w-full"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
                  data-testid="toggle-password"
                  className="flex items-center justify-center"
                  onClick={(e) => {
                    setShowPassword(!showPassword);
                    e.preventDefault();
                  }}
                >
                  {showPassword ? (
                    <EyeIcon className="size-4 absolute right-2 top-1/2 -translate-y-1/2 text-[#6C7275]" />
                  ) : (
                    <EyeSlashIcon className="size-4 absolute right-2 top-1/2 -translate-y-1/2 text-[#6C7275]" />
                  )}
                </button>
              </div>
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
              disabled={isPending}
              type="submit"
              className={`bg-red-700 uppercase rounded mt-4 leading-[28px] text-white font-medium py-2 px-4 flex items-center justify-center ${
                isPending ? "opacity-80" : ""
              }`}
            >
              Đăng ký
            </button>
            <p className="mt-2 justify-center flex items-center gap-2 font-medium text-sm leading-[26px]">
              Đã có tài khoản?
              <Link className="text-blue-500 font-semibold" to="/signin">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
