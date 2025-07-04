import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./components/loading/loading";
import { useGetUser } from "./hooks/use-account";
import { useGetCart } from "./hooks/use-cart";

const App = () => {
  const { isLoading } = useGetUser();
  const { isLoading: isCartLoading } = useGetCart();

  if (isLoading || isCartLoading) {
    return <Loading />;
  }
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
