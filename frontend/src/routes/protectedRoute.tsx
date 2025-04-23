import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser from "@/hooks/auth/useAuth";
import Loading from "@/components/loading/loading";
const ProtectedRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { data: user, isLoading, error } = useUser();
  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
