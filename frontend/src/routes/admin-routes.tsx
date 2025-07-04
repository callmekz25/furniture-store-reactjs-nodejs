import { Outlet, Navigate } from "react-router-dom";
import Loading from "@/components/loading/loading";
import { useGetUser } from "@/hooks/use-account";
const AdminRoute = () => {
  const { data: user, isLoading, error } = useGetUser();
  if (isLoading) {
    return <Loading />;
  }
  if (!user || user.role !== "admin" || error) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default AdminRoute;
