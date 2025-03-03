import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Collection from "@/pages/collection";

const Home = lazy(() => import("../pages/home"));
const SignUp = lazy(() => import("../pages/signUp"));
const SignIn = lazy(() => import("@/pages/signIn"));
const ShoppingCart = lazy(() => import("@/pages/shoppingCart"));
const ProductDetail = lazy(() => import("@/pages/productDetail"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="product/:slug" element={<ProductDetail />} />
        <Route path="collections/:slug" element={<Collection />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
