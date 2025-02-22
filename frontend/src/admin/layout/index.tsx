import {
  RectangleGroupIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Header from "../components/Header";
const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className=" bg-[#f4f5f0]">
      <Header />
      <main className="px-[100px] py-20">{children}</main>
    </div>
  );
};

export default LayoutAdmin;
