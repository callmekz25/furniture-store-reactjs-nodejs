import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="px-4">{children}</main>
      <Toaster />
      <Footer />
    </>
  );
};
export default Layout;
