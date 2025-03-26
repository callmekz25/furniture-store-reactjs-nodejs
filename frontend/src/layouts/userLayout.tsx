import Header from "../components/user/header";
import Footer from "../components/user/footer";
import { Toaster } from "@/components/ui/sonner";
import Newsletter from "@/components/user/newsLetter";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7] min-h-screen">
        <Outlet />
      </main>
      <Toaster />
      <Newsletter />
      <Footer />
    </>
  );
};
export default Layout;
