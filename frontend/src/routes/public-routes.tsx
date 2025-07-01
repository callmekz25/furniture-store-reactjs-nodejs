import { Outlet } from "react-router-dom";
import ScrollToTop from "@/helpers/scroll-to-top";
const PublicRoute = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default PublicRoute;
