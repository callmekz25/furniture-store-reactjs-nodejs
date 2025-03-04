import { getCategories } from "@/api/category";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SideBarFilter = () => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    suppliers: true,
    price: true,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const selectedCategories = searchParams.getAll("category");
  const handleFilterQuery = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("category");
    updatedCategories.forEach((cat) => newSearchParams.append("category", cat));

    setSearchParams(newSearchParams);
  };
  console.log(selectedCategories);

  return (
    <div className="lg:flex-[0_0_25%] lg:max-w-[25%] flex-[0_0_100%] max-w-full px-4  py-10">
      <div className="flex flex-col gap-4">
        {/* Danh mục */}
        <div
          className="bg-white rounded"
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center border-b border-gray-200 justify-between px-3.5 py-2.5 text-[16px] font-semibold">
            <h3>Danh mục sản phẩm</h3>
            <button onClick={() => toggleSection("categories")}>
              <ChevronDownIcon
                className={`size-4 transition-all duration-300 ${
                  openSections.categories ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={` p-2.5 flex flex-col gap-1 overflow-hidden  text-sm font-medium transition-all  duration-500 ${
              openSections.categories ? "max-h-[500px]" : "max-h-0 py-0"
            }`}
          >
            {categories && categories.length > 0
              ? categories.map((category) => {
                  return (
                    <li className="flex items-center gap-2" key={category.name}>
                      <input
                        type="checkbox"
                        name={category.name}
                        id={category.name}
                        value={category.slug}
                        className="size-4 hover:cursor-pointer"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={(e) => handleFilterQuery(e.target.value)}
                      />
                      <label
                        htmlFor={category.name}
                        className=" hover:cursor-pointer flex-1 uppercase"
                      >
                        {category.name}
                      </label>
                    </li>
                  );
                })
              : "No data"}
          </ul>
        </div>
        {/* Nhà cung cấp */}
        <div
          className="bg-white rounded"
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center border-b border-gray-200 justify-between px-3.5 py-2.5 text-[16px] font-semibold">
            <h3>Nhà cung cấp</h3>
            <button onClick={() => toggleSection("suppliers")}>
              <ChevronDownIcon
                className={`size-4 transition-all duration-300 ${
                  openSections.suppliers ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={` p-2.5 flex flex-col gap-1 overflow-hidden  text-sm font-medium transition-all  duration-500 ${
              openSections.suppliers ? "max-h-[500px]" : "max-h-0 py-0"
            }`}
          >
            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                name="c"
                id=""
                className="size-4 hover:cursor-pointer"
              />
              <label
                htmlFor=""
                className=" hover:cursor-pointer flex-1 uppercase"
              >
                DOMINIK
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                name="c"
                id=""
                className="size-4 hover:cursor-pointer"
              />
              <label
                htmlFor=""
                className=" hover:cursor-pointer flex-1 uppercase"
              >
                DOMINIK
              </label>
            </li>
          </ul>
        </div>
        {/* Giá tiền */}
        <div
          className="bg-white rounded"
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center border-b border-gray-200 justify-between px-3.5 py-2.5 text-[16px] font-semibold">
            <h3>Giá tiền</h3>
            <button>
              <ChevronDownIcon className="size-4" />
            </button>
          </div>
          <ul className=" p-2.5 flex flex-col gap-4 text-sm font-normal">
            <li className="flex items-center gap-2">
              <input
                type="checkbox"
                name="c"
                id=""
                className="size-4 hover:cursor-pointer"
              />
              <label
                htmlFor=""
                className=" hover:cursor-pointer flex-1 uppercase"
              >
                Dưới 1.000.000
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilter;
