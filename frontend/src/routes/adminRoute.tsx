import { useAppSelector } from "@/redux/hook";

import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!user || !isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
