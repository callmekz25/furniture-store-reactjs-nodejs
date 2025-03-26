import Header from "../components/admin/Header";
import { Outlet } from "react-router-dom";
const LayoutAdmin = () => {
  return (
    <div className=" bg-white">
      <div className="">
        <Header />
        <main className="py-10 max-w-[1200px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
