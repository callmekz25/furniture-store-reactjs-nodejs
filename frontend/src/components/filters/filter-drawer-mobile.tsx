import PRICES from "@/constants/prices";
import SORTS from "@/constants/sorts";
import { useAppDispatch } from "@/redux/hook";
import { closeFilterMenu } from "@/redux/slices/filter-menu.slice";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const FilterDrawerMobile = ({ suppliers }: { suppliers: string[] | null }) => {
  const dispatch = useAppDispatch();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    categories: true,
    suppliers: true,
    prices: true,
    sorts: true,
  });
  const [filterd, setFilterd] = useState<{
    supplier: string[];
    price: string[];
    sort: string | null;
  }>({
    supplier: [],
    price: [],
    sort: null,
  });
  const [, setSearchParams] = useSearchParams();
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    resetFilterd();
    // eslint-disable-next-line
  }, []);

  const toggleFilter = (key: "price" | "supplier", value: string) => {
    setFilterd((prev) => {
      const keySet = new Set(prev[key]);
      if (keySet.has(value)) {
        keySet.delete(value);
      } else {
        keySet.add(value);
      }

      return { ...prev, [key]: Array.from(keySet) };
    });
  };
  const sortFilter = (type: string) => {
    setFilterd((prev) => ({
      ...prev,
      sort: type,
    }));
  };
  const applyFilterd = () => {
    const newParams = new URLSearchParams();
    filterd.price.forEach((p) => newParams.append("price", p));
    filterd.supplier.forEach((s) => newParams.append("supplier", s));
    if (filterd.sort) {
      newParams.set("sort", filterd.sort);
    }
    setSearchParams(newParams);
    dispatch(closeFilterMenu());
  };
  const resetFilterd = () => {
    setSearchParams();
    setFilterd({
      supplier: [],
      price: [],
      sort: null,
    });
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between bg-[#c31425] text-white font-bold uppercase py-2.5 px-3">
        <div className="flex items-center w-fit">
          <FunnelIcon className="size-6" />
          <h3 className="pl-2 whitespace-nowrap">Bộ lọc</h3>
        </div>
        <button onClick={() => dispatch(closeFilterMenu())}>
          <XMarkIcon className="size-7" />
        </button>
      </div>
      <div className="max-h-[84vh] overflow-y-auto p-4">
        {/* Danh mục */}
        <div className="bg-white ">
          <div className="flex items-center justify-between py-2 text-[15px] font-semibold">
            <h3>Danh mục sản phẩm</h3>
            <button onClick={() => toggleSection("categories")}>
              <ChevronDownIcon
                className={`size-5 transition-all duration-300 ${
                  openSections.categories ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={`  flex flex-col overflow-hidden  text-sm font-medium transition-all  duration-500 ${
              openSections.categories ? "max-h-[500px] " : "max-h-0 "
            }`}
          >
            <li className="flex items-center  py-2">
              {/* <Link>Được mua nhiều gần đây</Link> */}
            </li>
            <li className="flex items-center py-2">
              <Link to={`/collections/san-pham-moi`}>Sản phẩm mới</Link>
            </li>
            <li className="flex items-center py-2">
              <Link to={`/collections/all`}>Tất cả sản phẩm</Link>
            </li>
          </ul>
        </div>
        {/* Sắp xếp */}
        <div className="bg-white border-t border-gray-200 ">
          <div className="flex items-center  justify-between  py-2.5 text-[15px] font-semibold">
            <h3>Sắp xếp</h3>
            <button onClick={() => toggleSection("sorts")}>
              <ChevronDownIcon
                className={`size-5 transition-all duration-300 ${
                  openSections.sorts ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={`  flex flex-col  overflow-hidden    text-sm font-normal transition-all  duration-500 ${
              openSections.sorts ? "max-h-[500px] " : "max-h-0 "
            }`}
          >
            {SORTS.map((sort) => {
              return (
                <li className="flex items-center py-2" key={sort.label}>
                  <input
                    type="checkbox"
                    name="sort"
                    id={sort.label}
                    value={sort.label}
                    className="size-4 hover:cursor-pointer outline-none hover:border-red-600 transition-all duration-300"
                    checked={filterd.sort === sort.type}
                    onChange={() => sortFilter(sort.type)}
                  />
                  <label
                    htmlFor={sort.label}
                    className=" hover:cursor-pointer flex-1 pl-2"
                  >
                    {sort.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Nhà cung cấp */}
        <div className=" bg-white  border-t border-gray-200">
          <div className="flex items-center  justify-between  py-2 text-[15px] font-semibold">
            <h3>Nhà cung cấp</h3>
            <button onClick={() => toggleSection("suppliers")}>
              <ChevronDownIcon
                className={`size-5 transition-all duration-300 ${
                  openSections.suppliers ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={`  flex flex-col  overflow-hidden    text-sm font-normal transition-all  duration-500 ${
              openSections.suppliers ? "max-h-[750px]" : "max-h-0"
            }`}
          >
            {suppliers && suppliers.length > 0
              ? suppliers.map((supplier) => {
                  return (
                    <li className="flex items-center py-2" key={supplier}>
                      <input
                        type="checkbox"
                        name={supplier}
                        id={supplier}
                        value={supplier.toUpperCase()}
                        className="size-4 hover:cursor-pointer outline-none hover:border-red-600 transition-all duration-300"
                        checked={filterd.supplier.includes(
                          supplier.toUpperCase()
                        )}
                        onChange={(e) =>
                          toggleFilter("supplier", e.target.value)
                        }
                      />
                      <label
                        htmlFor={supplier}
                        className=" hover:cursor-pointer flex-1 pl-2 uppercase"
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
        <div className="bg-white border-t border-gray-200">
          <div className="flex items-center  justify-between  py-2 text-[15px] font-semibold">
            <h3>Giá tiền</h3>
            <button onClick={() => toggleSection("prices")}>
              <ChevronDownIcon
                className={`size-5 transition-all duration-300 ${
                  openSections.prices ? " " : "rotate-180"
                }`}
              />
            </button>
          </div>
          <ul
            className={`  flex flex-col  overflow-hidden   text-sm font-normal transition-all  duration-500 ${
              openSections.prices ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            {PRICES.map((price) => {
              return (
                <li className="flex items-center py-2" key={price.label}>
                  <input
                    type="checkbox"
                    name={price.label}
                    id={price.label}
                    className="size-4 hover:cursor-pointer outline-none hover:border-red-600 transition-all duration-300"
                    checked={filterd.price.includes(
                      `${price.min}-${price.max}`
                    )}
                    onChange={() =>
                      toggleFilter("price", `${price.min}-${price.max}`)
                    }
                  />
                  <label
                    htmlFor={price.label}
                    className=" hover:cursor-pointer flex-1 pl-2"
                  >
                    {price.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center w-full fixed bottom-0 left-0 p-2.5 uppercase border-t border-gray-200 font-medium">
        <button
          onClick={() => {
            resetFilterd();
            dispatch(closeFilterMenu());
          }}
          className="bg-[#f3f4f6] flex-1 mr-2 border py-2 text-center rounded-[2px] border-gray-200 "
        >
          Huỷ
        </button>
        <button
          onClick={() => applyFilterd()}
          className="bg-[#c31425] flex-1 rounded-[2px] py-2 text-center text-white"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default FilterDrawerMobile;
