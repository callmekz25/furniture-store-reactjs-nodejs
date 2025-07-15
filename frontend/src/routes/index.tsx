import { lazy, Suspense } from "react";
const Home = lazy(() => import("../pages/home/home"));
const SignUp = lazy(() => import("../pages/auth/register"));
const SignIn = lazy(() => import("@/pages/auth/login"));
const ShoppingCart = lazy(() => import("@/pages/cart/shopping-cart"));
const ProductDetail = lazy(() => import("@/pages/product/product-detail"));
const Collection = lazy(() => import("@/pages/collection/collection"));
const Account = lazy(() => import("@/pages/account/account"));
const OrderStatusResult = lazy(
  () => import("@/pages/checkout/order-status-result")
);
import Loading from "@/components/loading/loading";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protected-routes";
import AdminRoute from "./admin-routes";
const ListProducts = lazy(() => import("@/pages/admin/product/list-products"));
const Dashboard = lazy(() => import("@/pages/admin/dashboard/dashboard"));
const AddProduct = lazy(() => import("@/pages/admin/product/add-product"));
const Blog = lazy(() => import("@/pages/blog/blog"));
const Error = lazy(() => import("@/pages/shared/error"));
const Search = lazy(() => import("@/pages/search/search"));
const AddPromotion = lazy(
  () => import("@/pages/admin/promotion/add-promotion")
);
import PublicRoute from "./public-routes";
import MainLayout from "@/layouts/main-layout";
import LayoutAdmin from "@/layouts/admin-layout";
import Checkout from "@/pages/checkout/checkout";
import EditProduct from "@/pages/admin/product/edit-product";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
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
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Search />
              </Suspense>
            ),
            path: "/search",
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
        <OrderStatusResult />
      </Suspense>
    ),
    path: "/orders/:orderId/status",
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
    element: <MainLayout />,
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
    element: <LayoutAdmin />,
    path: "/admin",
    children: [
      {
        element: <AdminRoute />,
        children: [
          {
            element: (
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            ),
            path: "dashboard",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <ListProducts />
              </Suspense>
            ),
            path: "products",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <AddProduct />
              </Suspense>
            ),
            path: "add-product",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <EditProduct />
              </Suspense>
            ),
            path: "products/:productId",
          },
          {
            element: (
              <Suspense fallback={<Loading />}>
                <AddPromotion />
              </Suspense>
            ),
            path: "promotions",
          },
        ],
      },
    ],
  },
]);
export default router;
