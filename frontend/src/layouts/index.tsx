import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
