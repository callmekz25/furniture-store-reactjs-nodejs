import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <ul className="flex items-center font-semibold text-[15px] justify-center bg-white gap-14 py-5 border-b border-gray-200 shadow-sm">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/products">Sản phẩm</Link>
        </li>

        <li>Khách hàng</li>
      </ul>
    </>
  );
};

export default Header;
