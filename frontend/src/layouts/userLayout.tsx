import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7]">{children}</main>
      <Toaster />
      <Footer />
    </>
  );
};
export default Layout;
