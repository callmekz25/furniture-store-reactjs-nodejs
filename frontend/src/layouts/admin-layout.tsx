import Header from "../components/admin/Header";
import { Outlet } from "react-router-dom";
const LayoutAdmin = () => {
  return (
    <div className="bg-white ">
      <Header />
      <main className=" py-10  min-h-screen max-w-[1300px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
