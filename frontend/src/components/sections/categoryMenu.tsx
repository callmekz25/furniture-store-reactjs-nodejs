import useCheckScreen from "@/hooks/shared/useCheckScreen";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categoryService";
import Loading from "@/components/loading/loading";
import { Link } from "react-router-dom";
const CategoryMenu = () => {
  const isMobile = useCheckScreen();
  const {
    data: categories,
    isLoading,
    errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isMobile) {
    return null;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <ul className="flex items-center  flex-wrap justify-center">
        {categories.map((ctg) => {
          return (
            <li
              key={ctg.slug}
              className=" text-[13px] mx-4  font-medium uppercase "
            >
              <Link
                to={`/collections/${ctg.slug}`}
                className="py-4 px-2 color-red block"
              >
                {ctg.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryMenu;
