import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "@/pages/SignIn";
import ShoppingCart from "@/pages/ShoppingCart";
import ProductDetail from "@/pages/ProductDetail";

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home></Home>}></Route>
      <Route path="signup" element={<SignUp></SignUp>}></Route>
      <Route path="signin" element={<SignIn></SignIn>}></Route>
      <Route path="cart" element={<ShoppingCart />}></Route>
      <Route path="product-detail" element={<ProductDetail />}></Route>
    </Routes>
  );
};
export default UserRoutes;
