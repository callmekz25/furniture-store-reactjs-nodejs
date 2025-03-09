import React from "react";
import Header from "../components/admin/Header";
const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-[1024px] mx-auto">
      <Header />
      <main className="py-10">{children}</main>
    </div>
  );
};

export default LayoutAdmin;
