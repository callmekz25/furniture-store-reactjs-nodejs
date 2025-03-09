import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useAppDispatch } from "./redux/hook";
import { useEffect, useState } from "react";

import { getUserThunk } from "./redux/actions/auth.action";
import Loading from "./components/user/loading";
const App = () => {
  const dispatch = useAppDispatch();

  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(getUserThunk());
      setIsAuthChecked(true);
    };

    checkAuth();
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
};

export default App;
