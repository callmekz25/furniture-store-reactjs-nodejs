import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddProduct from "../pages/AddProduct";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default AdminRoutes;
