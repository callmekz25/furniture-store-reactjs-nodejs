import Loading from "@/components/user/loading";
import Layout from "@/layouts/userLayout";
import { LogoutThunk } from "@/redux/actions/auth.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useQueryClient } from "@tanstack/react-query";

const Account = () => {
  const { user, loading, success, error } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      // unwrap dùng để bắt lỗi
      await dispatch(LogoutThunk()).unwrap();

      if (success) {
        queryClient.removeQueries(["cart"]);
        queryClient.invalidateQueries(["cart"]);
      }
    } catch (error) {
      alert(error.mess);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="break-point min-h-[80vh]">
        <div className="mb-[50px] p-10 ">
          <h3 className="text-[25px] font-bold color-red text-center tracking-[1px]">
            Tài khoản của bạn
          </h3>
          <div className="flex flex-wrap mt-[30px]">
            <div className="lg:flex-[0_0_25%] mb-[30px] lg:max-w-[25%] flex-[0_0_100%] max-w-[100%] px-[15px]">
              <h3 className="color-red text-[15px] uppercase font-bold mb-2.5">
                Tài khoản
              </h3>
              <ul className="flex flex-col gap-2 font-normal text-sm list-disc ml-4">
                <li>Thông tin tài khoản</li>
                <li>Danh sách địa chỉ</li>
                <li>
                  <button onClick={() => handleLogout()}>Đăng xuất</button>
                </li>
              </ul>
            </div>
            <div className="lg:flex-[0_0_75%] mb-[50px] lg:max-w-[75%] flex-[0_0_100%] max-w-[100%] px-[15px]">
              <h3 className=" text-[15px] uppercase font-bold mb-2.5 tracking-[1px] py-3 border-b border-gray-200">
                Thông tin tài khoản
              </h3>
              <ul className="flex flex-col gap-2 font-normal text-sm">
                <li className="color-red font-medium text-[16px]">
                  {user?.name}
                </li>
                <li className=" font-normal text-sm"> {user?.email}</li>
                <li>Xem địa chỉ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
