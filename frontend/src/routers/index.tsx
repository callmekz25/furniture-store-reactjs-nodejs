import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/SignUp"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const ShoppingCart = lazy(() => import("@/pages/ShoppingCart"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="product/:slug" element={<ProductDetail />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
