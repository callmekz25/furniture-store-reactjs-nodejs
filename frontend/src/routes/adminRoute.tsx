import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    // Chỉ xử lý chuyển hướng khi đã tải xong dữ liệu
    if (!loading) {
      if (!user) {
        navigate("/signin", { replace: true });
      } else if (user.role !== "admin") {
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Hiển thị loading hoặc null trong khi đang tải
  if (loading) {
    return <div>Loading...</div>;
  }

  return user?.role === "admin" ? <Outlet /> : null;
};

export default AdminRoute;
