import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListProduct from "./pages/products";
import AddProduct from "./pages/add-product";
const AdminRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/products" element={<ListProduct />}></Route>
        <Route path="/admin/products/add" element={<AddProduct />}></Route>
      </Routes>
    </Router>
  );
};

export default AdminRoutes;
