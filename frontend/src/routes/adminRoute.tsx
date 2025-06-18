import { Outlet, Navigate } from "react-router-dom";
import Loading from "@/components/loading/loading";
import { useGetAll } from "@/hooks/useGet";
import IUser from "@/interfaces/user.interface";
const AdminRoute = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useGetAll<IUser>("/get-user", ["user"]);
  if (isLoading) {
    return <Loading />;
  }
  if (!user || user.role !== "admin" || error) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default AdminRoute;
