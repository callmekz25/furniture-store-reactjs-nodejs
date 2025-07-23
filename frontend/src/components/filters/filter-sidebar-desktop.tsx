import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, memo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PRICES from "@/constants/prices";
import SORTS from "@/constants/sorts";
const FilterSideBarDesktop = ({
  suppliers,
}: {
  suppliers: string[] | null;
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    categories: true,
    suppliers: true,
    prices: true,
    sorts: true,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  useEffect(() => {
    if (!searchParams.get("sort")) {
      searchParams.set("sort", "createdAt.desc");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams]);

  const selectedSuppliers = searchParams.getAll("supplier");
  const selectedPrices = searchParams.getAll("price");
  const selectedSorts = searchParams.get("sort");

  const handleFilterQuery = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (key === "sort") {
      newSearchParams.set(key, value);
    } else {
      const selectedValues = new Set(newSearchParams.getAll(key));

      if (selectedValues.has(value)) {
        selectedValues.delete(value);
      } else {
        selectedValues.add(value);
      }

      newSearchParams.delete(key);
      selectedValues.forEach((item) => newSearchParams.append(key, item));
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div
      className={` w-full transition-all duration-300  block  sticky  top-5 left-0 `}
    >
      <div className="flex flex-col gap-4   overflow-hidden ">
        {/* Danh mục */}
        <div className="bg-white rounded shadow-[0_0_3px_rgba(0,0,0,0.08)] ">
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
            className={` p-2.5 flex flex-col gap-2 overflow-hidden  text-[15px] font-medium transition-all  duration-500 ${
              openSections.categories ? "max-h-[500px]" : "max-h-0 py-0"
            }`}
          >
            <li className="flex items-center gap-2 ">
              {/* <Link>Được mua nhiều gần đây</Link> */}
            </li>
            <li className="flex items-center gap-2">
              <Link to={`/collections/san-pham-moi`}>Sản phẩm mới</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link to={`/collections/all`}>Tất cả sản phẩm</Link>
            </li>
          </ul>
        </div>
        {/* Sắp xếp */}
        <div className="bg-white rounded  shadow-[0_0_3px_rgba(0,0,0,0.08)]">
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
                    type="checkbox"
                    name="sort"
                    id={sort.label}
                    value={sort.label}
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
        <div className=" bg-white rounded overflow-hidden shadow-[0_0_3px_rgba(0,0,0,0.08)]">
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
            className={` p-2.5 flex flex-col gap-4 overflow-hidden   text-sm font-normal transition-all  duration-500 ${
              openSections.suppliers ? "max-h-[750px]" : "py-0 max-h-0"
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
        <div className="bg-white rounded shadow-[0_0_3px_rgba(0,0,0,0.08)]">
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

export default memo(FilterSideBarDesktop);
