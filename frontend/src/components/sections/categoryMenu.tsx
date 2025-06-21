import useCheckScreen from "@/hooks/useCheckScreen";
import { Link } from "react-router-dom";
import CategoriesMenu from "@/constants/categories-menu";
import { ChevronDown } from "lucide-react";
const CategoryMenu = () => {
  const isMobile = useCheckScreen();

  if (isMobile) {
    return null;
  }

  return (
    <div>
      <ul className="flex items-center justify-center flex-wrap">
        {CategoriesMenu.map((ct) => {
          return (
            <li className="mx-4 relative">
              <Link
                to={`/collections/${ct.slug}`}
                className="text-[#c4123f] flex gap-1 items-center text-sm  uppercase  py-4 px-1  font-medium"
              >
                {ct.label}
                <ChevronDown className="size-3" />
              </Link>
              <ul className="bg-white shadow-sm absolute left-0 flex flex-col  bottom-[-30px]">
                {ct.child.map((submenu) => {
                  return ()
                })}
                <li>
                  <Link
                    to={`/collections/${ct.slug}`}
                    className=" text-sm   py-4 px-1  font-medium"
                  >
                    {ct.label}
                  </Link>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryMenu;
