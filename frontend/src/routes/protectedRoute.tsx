import Loading from "@/components/user/loading";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);

  if (loading) {
    return <Loading />;
  }
  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
