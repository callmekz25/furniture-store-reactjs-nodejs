import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, memo } from "react";
import { useSearchParams } from "react-router-dom";
import PRICES from "@/constants/prices";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { closeFilterMenu } from "@/redux/slices/filter-menu.slice";
import SORTS from "@/constants/sorts";
const SideBarFilter = ({ suppliers }: { suppliers: string[] | null }) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    suppliers: true,
    prices: true,
    sorts: true,
  });
  const { isOpenMenuFilter } = useAppSelector((state) => state.filterMenu);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  // Lấy ra các danh sách của search query params để kiểm tra checked của checkbox
  const selectedSuppliers = searchParams.getAll("supplier");
  const selectedPrices = searchParams.getAll("price");
  const selectedSorts = searchParams.get("sort");
  // Hàm xử lý search query params với nhà cung cấp và giá tiền dựa vào key và value
  const handleFilterQuery = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (key === "sort") {
      newSearchParams.set(key, value); // Chỉ có 1 giá trị cho sort
    } else {
      const selectedValues = new Set(newSearchParams.getAll(key));

      if (selectedValues.has(value)) {
        selectedValues.delete(value); // Nếu đã có thì xoá đi
      } else {
        selectedValues.add(value); // Nếu chưa có thì thêm vào
      }

      newSearchParams.delete(key);
      selectedValues.forEach((item) => newSearchParams.append(key, item));
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div
      className={` z-[9999] lg:z-10 w-[85%] lg:w-full transition-all duration-300  lg:block fixed lg:sticky lg:-top-8 top-0 left-0 lg:px-4 lg:py-10 ${
        isOpenMenuFilter
          ? " translate-x-0 opacity-100 "
          : " -translate-x-full opacity-0 lg:opacity-100 lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col lg:gap-4 gap-2 p-4 lg:p-0 overflow-y-scroll lg:overflow-hidden bg-white lg:bg-transparent lg:min-h-fit min-h-dvh  max-h-dvh lg:max-h-fit">
        <div className="flex lg:hidden items-center justify-end">
          <button onClick={() => dispatch(closeFilterMenu())}>
            <XMarkIcon className="size-6" />
          </button>
        </div>
        {/* Danh mục */}
        <div className="bg-white rounded lg:shadow-[0_0_3px_rgba(0,0,0,0.08)] ">
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
        {/* Sắp xếp */}
        <div className="bg-white rounded  lg:shadow-[0_0_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center border-b border-gray-200 justify-between px-3.5 py-2.5 text-[16px] font-semibold">
            <h3>Sắp xếp</h3>
            <button onClick={() => toggleSection("sorts")}>
              <ChevronDownIcon
                className={`size-4 transition-all duration-300 ${
                  openSections.sorts ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={` p-2.5 flex flex-col gap-3 overflow-hidden  text-sm font-normal transition-all  duration-500 ${
              openSections.sorts ? "max-h-[500px]" : "max-h-0 py-0"
            }`}
          >
            {SORTS.map((sort) => {
              return (
                <li className="flex items-center gap-2" key={sort.label}>
                  <input
                    type="radio"
                    name="sort"
                    id={sort.label}
                    className="size-4 hover:cursor-pointer outline-none hover:border-red-600 transition-all duration-300"
                    checked={selectedSorts === sort.type}
                    onChange={() => handleFilterQuery("sort", sort.type)}
                  />
                  <label
                    htmlFor={sort.label}
                    className=" hover:cursor-pointer flex-1"
                  >
                    {sort.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Nhà cung cấp */}
        <div className="bg-white rounded lg:shadow-[0_0_3px_rgba(0,0,0,0.08)]">
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
            className={` p-2.5 flex flex-col gap-3 overflow-y-auto  text-sm font-normal transition-all  duration-500 ${
              openSections.suppliers ? "max-h-[500px]" : "max-h-0 py-0"
            }`}
          >
            {suppliers && suppliers.length > 0
              ? suppliers.map((supplier) => {
                  return (
                    <li className="flex items-center gap-2" key={supplier}>
                      <input
                        type="checkbox"
                        name={supplier}
                        id={supplier}
                        value={supplier.toUpperCase()}
                        className="size-4 hover:cursor-pointer outline-none hover:border-red-600 transition-all duration-300"
                        checked={selectedSuppliers.includes(
                          supplier.toUpperCase()
                        )}
                        onChange={(e) =>
                          handleFilterQuery("supplier", e.target.value)
                        }
                      />
                      <label
                        htmlFor={supplier}
                        className=" hover:cursor-pointer flex-1 uppercase"
                      >
                        {supplier}
                      </label>
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
        {/* Giá tiền */}
        <div className="bg-white rounded lg:shadow-[0_0_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center border-b border-gray-200 justify-between px-3.5 py-2.5 text-[16px] font-semibold">
            <h3>Giá tiền</h3>
            <button onClick={() => toggleSection("prices")}>
              <ChevronDownIcon
                className={`size-4 transition-all duration-300 ${
                  openSections.prices ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={` p-2.5 flex flex-col gap-3 overflow-hidden  text-sm font-normal transition-all  duration-500 ${
              openSections.prices ? "max-h-[500px]" : "max-h-0 py-0"
            }`}
          >
            {PRICES.map((price) => {
              return (
                <li className="flex items-center gap-2" key={price.label}>
                  <input
                    type="checkbox"
                    name={price.label}
                    id={price.label}
                    className="size-4 hover:cursor-pointer outline-none hover:border-red-600 transition-all duration-300"
                    checked={selectedPrices.includes(
                      `${price.min}-${price.max}`
                    )}
                    onChange={() =>
                      handleFilterQuery("price", `${price.min}-${price.max}`)
                    }
                  />
                  <label
                    htmlFor={price.label}
                    className=" hover:cursor-pointer flex-1"
                  >
                    {price.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(SideBarFilter);
