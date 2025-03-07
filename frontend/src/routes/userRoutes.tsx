import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Collection from "@/pages/user/collection";

const Home = lazy(() => import("../pages/user/home"));
const SignUp = lazy(() => import("../pages/user/signUp"));
const SignIn = lazy(() => import("@/pages/user/signIn"));
const ShoppingCart = lazy(() => import("@/pages/user/shoppingCart"));
const ProductDetail = lazy(() => import("@/pages/user/productDetail"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="collections/:slug" element={<Collection />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
