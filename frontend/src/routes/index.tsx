import { lazy, Suspense, useEffect } from "react";
const Home = lazy(() => import("../pages/user/home"));
const SignUp = lazy(() => import("../pages/user/signUp"));
const SignIn = lazy(() => import("@/pages/user/signIn"));
const ShoppingCart = lazy(() => import("@/pages/user/shoppingCart"));
const ProductDetail = lazy(() => import("@/pages/user/productDetail"));
const Collection = lazy(() => import("@/pages/user/collection"));
const Account = lazy(() => import("@/pages/user/account"));
import Loading from "@/components/user/loading";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import AdminRoute from "./adminRoute";
const Dashboard = lazy(() => import("@/pages/admin/dashboard"));
const AddProduct = lazy(() => import("@/pages/admin/add-product"));
const ListProducts = lazy(() => import("@/pages/admin/list-products"));
const AddBlog = lazy(() => import("@/pages/admin/add-blog"));
const Blog = lazy(() => import("@/pages/user/blog"));

const PublicRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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

      // Admin Route
      {
        element: (
          <Suspense fallback={<Loading />}>
            <AdminRoute />
          </Suspense>
        ),
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
