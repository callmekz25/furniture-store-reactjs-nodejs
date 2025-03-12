import React from "react";
import Header from "../components/admin/Header";
const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="  bg-gray-100">
      <div className="">
        <Header />
        <main className="py-10 max-w-[1200px] mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
