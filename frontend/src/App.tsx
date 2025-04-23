import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./components/loading/loading";
import useUser from "./hooks/auth/useUser";

const App = () => {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
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
