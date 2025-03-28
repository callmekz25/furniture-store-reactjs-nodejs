import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getUserThunk } from "./redux/actions/auth.action";
import Loading from "./components/user/loading";

const App = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  // Cần state để đợi redux cập nhật xong tránh navigate
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUserThunk()).unwrap();
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
      } finally {
        setIsInit(true);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setIsInit(true);
    }
  }, [dispatch, user]);

  if (!isInit || loading) {
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
