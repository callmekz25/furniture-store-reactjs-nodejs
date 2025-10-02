import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useGetMenu } from '@/hooks/use-menu';
import { IMenu } from '@/interfaces/menu/menu.interface';
import { ISubMenu } from '@/interfaces/menu/sub-menu.interface';
const CategoryMenu = () => {
  const { data } = useGetMenu();
  const menus = data?.data;
  console.log(menus);
  return (
    <div>
      <ul className="flex items-center bg-[#f2f2f2] justify-center flex-wrap">
        {menus &&
          menus.length > 0 &&
          menus.map((menu: IMenu, index: number) => {
            return (
              <li key={menu._id} className="mx-4 relative menu">
                <Link
                  to={`/collections/${menu.slug}`}
                  className="text-[#c4123f] flex gap-1 items-center text-sm  uppercase  py-4 px-1  font-medium"
                >
                  {menu.name}
                  <ChevronDown className="size-3.5 chev-down" />
                </Link>
                <ul
                  className={`bg-white  sub-menu   min-w-[210px]  absolute  top-12 ${
                    index === menus.length - 1 ? 'right-0' : 'left-0'
                  }`}
                >
                  {menu.subMenu.map((submenu: ISubMenu, index) => {
                    return (
                      <li key={submenu.name}>
                        <Link
                          to={`/collections/${submenu.slug}`}
                          className={`text-sm  block py-3 px-4 text-[16px] opacity-70  font-medium ${
                            index !== 0 || index !== menu.subMenu.length - 1
                              ? 'border-t border-gray-200'
                              : ''
                          }`}
                        >
                          {submenu.name}
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
