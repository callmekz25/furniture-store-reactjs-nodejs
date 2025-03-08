import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("account-basic-info");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
