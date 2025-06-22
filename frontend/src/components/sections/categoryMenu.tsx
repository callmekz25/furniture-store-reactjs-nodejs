import { Link } from "react-router-dom";
import CategoriesMenu from "@/constants/categories-menu";
import { ChevronDown } from "lucide-react";
const CategoryMenu = () => {
  return (
    <div>
      <ul className="flex items-center bg-[#f2f2f2] justify-center flex-wrap">
        {CategoriesMenu.map((menu) => {
          return (
            <li key={menu.label} className="mx-4 relative menu">
              <Link
                to={`/collections/${menu.slug}`}
                className="text-[#c4123f] flex gap-1 items-center text-sm  uppercase  py-4 px-1  font-medium"
              >
                {menu.label}
                <ChevronDown className="size-3.5 chev-down" />
              </Link>
              <ul className="bg-white  sub-menu  w-full  min-w-[210px] z-50 absolute left-0 top-12">
                {menu.child.map((submenu, index) => {
                  return (
                    <li key={submenu.label}>
                      <Link
                        to={`/collections/${submenu.slug}`}
                        className={`text-sm  block py-3 px-4 text-[16px] opacity-70  font-medium ${
                          index !== 0 ||
                          index !== Array.from(submenu).length - 1
                            ? "border-t border-gray-200"
                            : ""
                        }`}
                      >
                        {submenu.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryMenu;
