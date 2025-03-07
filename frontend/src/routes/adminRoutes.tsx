import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("../pages/admin/dashboard"));
const AddProduct = lazy(() => import("../pages/admin/add-product"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
