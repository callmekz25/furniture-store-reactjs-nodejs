import Header from "../components/user/header";
import Footer from "../components/user/footer";
import { Toaster } from "@/components/ui/sonner";
import Newsletter from "@/components/user/newsLetter";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7]">{children}</main>
      <Toaster />
      <Newsletter />
      <Footer />
    </>
  );
};
export default Layout;
