import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./components/loading/loading";
import { useGetAll } from "./hooks/useGet";

const App = () => {
  const { isLoading } = useGetAll("/get-user", ["user"], true);
  const { isLoading: isCartLoading } = useGetAll("/cart", ["cart"], true);

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
