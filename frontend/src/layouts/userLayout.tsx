import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import Newsletter from "@/components/sections/newsLetter";
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
