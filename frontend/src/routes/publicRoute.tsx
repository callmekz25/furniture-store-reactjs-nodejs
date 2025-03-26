import { Outlet } from "react-router-dom";
import ScrollToTop from "@/helpers/scrollToTop";
const PublicRoute = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default PublicRoute;
