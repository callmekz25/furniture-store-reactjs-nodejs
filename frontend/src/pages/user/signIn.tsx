import { Link, useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import TransparentLoading from "@/components/loading/transparantLoading";
import { useLogin } from "@/hooks/auth";

type Inputs = {
  email: string;
  password: string;
};
const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isPending, mutate: login } = useLogin();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    login(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
        navigate("/");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen break-point">
        {isPending && <TransparentLoading />}
        <div className="flex flex-col bg-white rounded-lg py-10 px-12 min-w-[500px] border border-gray-100">
          <h3 className="font-semibold text-[25px] text-center">Đăng nhập</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-8 font-medium w-full"
          >
            <div className=" flex flex-col gap-1">
              <label htmlFor="email" className=" font-semibold text-md">
                Email
              </label>
              <input
                type="text"
                placeholder="example@gmail.com"
                id="email"
                className="outline-none border bg-[#f9fbfc] border-gray-200 rounded-md px-2 py-1.5 font-normal text-md "
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
            <div className=" flex flex-col gap-1">
              <label htmlFor="password" className=" font-semibold text-md">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="outline-none border border-gray-200 bg-[#f9fbfc] rounded-md px-2 py-1.5 w-full"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
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
              <button className=" text-sm font-semibold text-blue-500">
                Quên mật khẩu?
              </button>
            </div>
            <button
              disabled={isPending}
              type="submit"
              className={`bg-red-700 uppercase rounded mt-8 leading-[28px] text-white font-medium py-1.5 px-4 flex items-center justify-center ${
                isPending ? "opacity-80" : ""
              }`}
            >
              Đăng nhập
            </button>
            <p className="mt-2 justify-center flex items-center gap-2 font-medium text-sm leading-[26px]">
              Chưa có tài khoản?
              <Link className="text-blue-500 font-semibold" to="/signup">
                Đăng ký
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
