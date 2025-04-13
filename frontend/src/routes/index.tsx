import { lazy, Suspense } from "react";
const Home = lazy(() => import("../pages/user/home"));
const SignUp = lazy(() => import("../pages/user/signUp"));
const SignIn = lazy(() => import("@/pages/user/signIn"));
const ShoppingCart = lazy(() => import("@/pages/user/shoppingCart"));
const ProductDetail = lazy(() => import("@/pages/user/productDetail"));
const Collection = lazy(() => import("@/pages/user/collection"));
const Account = lazy(() => import("@/pages/user/account"));
import Loading from "@/components/user/loading";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import AdminRoute from "./adminRoute";
const ListProducts = lazy(() => import("@/pages/admin/list-products"));
const Dashboard = lazy(() => import("@/pages/admin/dashboard"));
const AddProduct = lazy(() => import("@/pages/admin/add-product"));
const Blog = lazy(() => import("@/pages/user/blog"));
const Error = lazy(() => import("@/pages/shared/error"));
import PublicRoute from "./publicRoute";
import Layout from "@/layouts/userLayout";
import LayoutAdmin from "@/layouts/adminLayout";
import Checkout from "@/pages/user/checkout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            ),
            path: "/",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <SignIn />
              </Suspense>
            ),
            path: "/signin",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <SignUp />
              </Suspense>
            ),
            path: "/signup",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <ProductDetail />
              </Suspense>
            ),
            path: "/products/:slug",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <ShoppingCart />
              </Suspense>
            ),
            path: "/cart",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Collection />
              </Suspense>
            ),
            path: "/collections/:slug",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Blog />
              </Suspense>
            ),
            path: "/blogs/:category/:slug",
          },
        ],
      },
    ],
  },
  // Không cần layout
  {
    element: (
      <Suspense fallback={<Loading />}>
        <Checkout />
      </Suspense>
    ),
    path: "/checkouts/:orderId",
  },
  {
    element: (
      <Suspense fallback={<Loading />}>
        <Error />
      </Suspense>
    ),
    path: "*",
  },
  // Protected Route
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute />
              </Suspense>
            ),
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
        ],
      },
    ],
  },
  {
    element: <LayoutAdmin />, // Bọc các trang admin với layout riêng
    children: [
      {
        element: <AdminRoute />, // Check quyền admin
        children: [
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            ),
            path: "/dashboard",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <ListProducts />
              </Suspense>
            ),
            path: "/products",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <AddProduct />
              </Suspense>
            ),
            path: "/add-product",
          },
        ],
      },
    ],
  },
]);
export default router;
