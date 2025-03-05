import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, memo } from "react";
import { useSearchParams } from "react-router-dom";
import PRICES from "@/constants/prices";
const SideBarFilter = ({ suppliers }: { suppliers: [string] | [] }) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    suppliers: true,
    prices: true,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  // Lấy ra các danh sách của search query params để kiểm tra checked của checkbox
  const selectedSuppliers = searchParams.getAll("supplier");
  const selectedPrices = searchParams.getAll("price");

  // Hàm xử lý search query params với nhà cung cấp và giá tiền dựa vào key và value
  const handleFilterQuery = (key: string, value: string) => {
    const selectedValues = searchParams.getAll(key);

    // Kiểm tra xem giá trị đã có trong danh sách theo key chưa
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    const newSearchParams = new URLSearchParams(searchParams);
    // Phải delete trước khi add vào khi sẽ bị double chứ không làm mới
    newSearchParams.delete(key);
    updatedValues.forEach((item) => newSearchParams.append(key, item));

    setSearchParams(newSearchParams);
  };

  return (
    <div className="lg:flex-[0_0_25%] lg:max-w-[25%] flex-[0_0_100%] max-w-ful lg:block hidden px-4  py-10">
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
            className={` p-2.5 flex flex-col gap-3 overflow-hidden  text-sm font-normal transition-all  duration-500 ${
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
                        value={supplier}
                        className="size-4 hover:cursor-pointer outline-none hover:border-red-600 transition-all duration-300"
                        checked={selectedSuppliers.includes(supplier)}
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
              : "No data"}
          </ul>
        </div>
        {/* Giá tiền */}
        <div
          className="bg-white rounded"
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
        >
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
