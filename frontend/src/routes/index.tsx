import { lazy, Suspense } from "react";
const Home = lazy(() => import("../pages/user/home"));
const SignUp = lazy(() => import("../pages/user/signUp"));
const SignIn = lazy(() => import("@/pages/user/signIn"));
const ShoppingCart = lazy(() => import("@/pages/user/shoppingCart"));
const ProductDetail = lazy(() => import("@/pages/user/productDetail"));
const Collection = lazy(() => import("@/pages/user/collection"));
const Account = lazy(() => import("@/pages/user/account"));
import Loading from "@/components/user/loading";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import AdminRoute from "./adminRoute";
import Dashboard from "@/pages/admin/dashboard";
import AddProduct from "@/pages/admin/add-product";
import ListProducts from "@/pages/admin/list-products";
import AddBlog from "@/pages/admin/add-blog";
import Blog from "@/pages/user/blog";
const PublicRoute = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute />
      </Suspense>
    ),
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <SignIn />,
        path: "/signin",
      },
      {
        element: <SignUp />,
        path: "/signup",
      },
      {
        element: <ProductDetail />,
        path: "/products/:slug",
      },
      {
        element: <ShoppingCart />,
        path: "/cart",
      },
      {
        element: <Collection />,
        path: "/collections/:slug",
      },
      {
        element: <Blog />,
        path: "/blogs/:category/:slug",
      },

      // Protected Route
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <Suspense>
                <Account />
              </Suspense>
            ),
            path: "/account",
          },
        ],
      },

      // Admin Route
      {
        element: <AdminRoute />,
        children: [
          {
            element: (
              <Suspense>
                <Dashboard />
              </Suspense>
            ),
            path: "/dashboard",
          },
          {
            element: (
              <Suspense>
                <AddProduct />
              </Suspense>
            ),
            path: "/add-product",
          },
          {
            element: (
              <Suspense>
                <ListProducts />
              </Suspense>
            ),
            path: "/products",
          },
          {
            element: (
              <Suspense>
                <AddBlog />
              </Suspense>
            ),
            path: "/add-blog",
          },
        ],
      },
    ],
  },
]);
export default router;
