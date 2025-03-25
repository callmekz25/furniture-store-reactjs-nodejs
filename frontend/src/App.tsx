import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { useEffect } from "react";

import { getUserThunk } from "./redux/actions/auth.action";
import Loading from "./components/user/loading";

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUserThunk());
    }
  }, [dispatch, isAuthenticated]);
  if (loading) {
    return <Loading />;
  }
  return <RouterProvider router={router} />;
};

export default App;
