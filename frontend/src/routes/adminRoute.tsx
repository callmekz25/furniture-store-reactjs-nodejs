import { Outlet, Navigate } from "react-router-dom";
import useUser from "@/hooks/auth/useAuth";
import Loading from "@/components/loading/loading";
const AdminRoute = () => {
  const { data: user, isLoading, error } = useUser();
  if (isLoading) {
    return <Loading />;
  }
  if (!user || user.role !== "admin") {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default AdminRoute;
