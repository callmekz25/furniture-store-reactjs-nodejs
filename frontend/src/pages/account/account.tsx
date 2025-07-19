import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/use-auth";
import Error from "../shared/error";
import Loading from "@/components/loading/loading";
import { useGetUser } from "@/hooks/use-account";
import { useGetOrderByUserId } from "@/hooks/use-order";
import OrdersUser from "@/components/account/orders-user";
import { useState } from "react";
import AddressesList from "@/components/account/addresses-list";
const Account = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"info" | "addresses">(
    "addresses"
  );
  const { mutate, isPending } = useLogout();
  const {
    data: orders,
    isLoading: ilo,
    error: errOrders,
  } = useGetOrderByUserId();
  const { data: user, isLoading, error } = useGetUser();
  const queryClient = useQueryClient();
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

  if (isLoading || ilo) {
    return <Loading />;
  }
  if (error || errOrders) {
    return <Error />;
  }
  return (
    <div className="break-point">
      {isPending && <Loading />}
      <div className=" p-10 ">
        <h3 className="text-[25px] font-bold color-red text-center tracking-[1px]">
          Tài khoản của bạn
        </h3>
        <div className="flex flex-wrap mt-[30px]">
          <div className="lg:flex-[0_0_25%] mb-[30px] lg:max-w-[25%] flex-[0_0_100%] max-w-[100%] px-[15px]">
            <h3 className="color-red text-[15px] uppercase font-bold mb-2.5">
              Tài khoản
            </h3>
            <ul className="flex flex-col gap-2 font-normal text-sm list-disc ml-4">
              <li>
                <button onClick={() => setActiveSection("info")}>
                  Thông tin tài khoản
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection("addresses")}>
                  Danh sách địa chỉ
                </button>
              </li>
              <li>
                <button onClick={() => handleLogout()}>Đăng xuất</button>
              </li>
            </ul>
          </div>
          <div className="lg:flex-[0_0_75%] mb-[50px] lg:max-w-[75%] flex-[0_0_100%] max-w-[100%] px-[15px]">
            {activeSection === "info" && (
              <OrdersUser user={user} orders={orders} />
            )}
            {activeSection === "addresses" && <AddressesList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
