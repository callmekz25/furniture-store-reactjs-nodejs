import Loading from "@/components/loading/loading";
import { useLogout } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AccountLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useLogout();
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/");
        queryClient.removeQueries({
          queryKey: ["user"],
        });
        queryClient.removeQueries({
          queryKey: ["cart"],
        });
      },
    });
  };
  return (
    <div className="break-point">
      {isPending && <Loading />}
      <div className=" p-10 ">
        <h3 className="text-[25px] font-bold color-red text-center tracking-[1px]">
          {/* {activeSection === "info" ? "Tài khoản của bạn" : "Thông tin địa chỉ"} */}
        </h3>
        <div className="flex flex-wrap mt-[30px]">
          <div className="lg:flex-[0_0_25%] mb-[30px] lg:max-w-[25%] flex-[0_0_100%] max-w-[100%] px-[15px]">
            <h3 className="color-red text-[15px] uppercase font-bold mb-2.5">
              Tài khoản
            </h3>
            <ul className="flex flex-col gap-2 font-normal text-sm list-disc ml-4">
              <li>
                <Link
                  to="/account"
                  className=" transition-all duration-200 hover:color-red"
                >
                  Thông tin tài khoản
                </Link>
              </li>
              <li>
                <Link
                  to="/account/addresses"
                  className=" transition-all duration-200 hover:color-red"
                >
                  Danh sách địa chỉ
                </Link>
              </li>
              <li>
                <button
                  className=" transition-all duration-200 hover:color-red"
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
          <div className="lg:flex-[0_0_75%] mb-[50px] lg:max-w-[75%] flex-[0_0_100%] max-w-[100%] px-[15px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
