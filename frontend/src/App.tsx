import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { useEffect } from "react";

import { getUserThunk } from "./redux/actions/auth.action";
const App = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);
  if (loading) {
    return <p>Loading User....</p>;
  }
  return <RouterProvider router={router} />;
};

export default App;
