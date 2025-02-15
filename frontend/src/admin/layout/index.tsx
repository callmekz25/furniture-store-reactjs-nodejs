import {
  RectangleGroupIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

interface LayoutProps {
  children: React.ReactNode;
}
const LayoutAdmin: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="bg-white px-8 py-4 min-h-screen w-[15%]">
        <div className="flex items-center gap-2 justify-center font-semibold text-[25px]">
          Admin
        </div>
        <ul className="flex flex-col gap-3 font-medium mt-10 text-[15px]">
          <li className="flex items-center gap-3 py-2 px-3">
            <RectangleGroupIcon className="size-5" />
            Trang chủ
          </li>
          <li className="flex items-center gap-3 py-2.5 px-4 bg-gray-200 rounded-md">
            <ArchiveBoxIcon className="size-5" />
            Sản phẩm
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default LayoutAdmin;
