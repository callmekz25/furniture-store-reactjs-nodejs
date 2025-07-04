import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "@/components/loading/loading";
import { useGetUser } from "@/hooks/account";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { data: user, isLoading, error } = useGetUser();
  if (isLoading) {
    return <Loading />;
  }
  if (!user || error) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
