import Header from "../components/admin/Header";
import { Outlet } from "react-router-dom";
const LayoutAdmin = () => {
  return (
    <div className=" bg-white">
      <Header />
      <main className="py-10 max-w-[1200px] min-h-screen mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
