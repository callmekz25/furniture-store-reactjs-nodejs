import useProductsByCollectionOrCategory from "@/hooks/useProductsByCollectionOrCategory";
import Layout from "@/layouts";
import { useParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ArrowDownAz } from "lucide-react";
import CardProduct from "@/components/cardProduct";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category";
const Collection = () => {
  const { slug } = useParams<string>();
  const { data, isLoading, error } = useProductsByCollectionOrCategory(slug);
  const {
    data: categories,
    isCategoriesLoading,
    errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isLoading || isCategoriesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <section className="break-point flex flex-wrap">
        {/* Phần filter */}
        <div className="lg:flex-[0_0_25%] lg:max-w-[25%] flex-[0_0_100%] max-w-full px-4  py-10">
          <div className="flex flex-col gap-4">
            {/* Danh mục */}
            <div
              className="bg-white rounded"
              style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center border-b border-gray-200 justify-between px-3.5 py-2.5 text-[16px] font-semibold">
                <h3>Danh mục sản phẩm</h3>
                <button>
                  <ChevronDownIcon className="size-4" />
                </button>
              </div>
              <ul className=" p-2.5 flex flex-col gap-1 text-sm font-medium">
                {categories && categories.length > 0
                  ? categories.map((category) => {
                      return (
                        <li
                          className="flex items-center gap-2"
                          key={category.name}
                        >
                          <input
                            type="checkbox"
                            name={category.name}
                            id={category.name}
                            className="size-4 hover:cursor-pointer"
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
        {/* Phần hiển thị sản phẩm */}
        <div className="lg:flex-[0_0_75%] lg:max-w-[75%] flex-[0_0_100%] max-w-full py-10 px-4">
          {/* Phần sắp xếp */}
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-5">
              <span className="text-[24px] font-bold text-red-700">
                {data.type.name}
              </span>
              <span className="text-sm font-normal">
                <span className="font-bold">{data.products.length}</span> sản
                phẩm
              </span>
            </p>
            <div className="flex items-center gap-10 bg-white px-2.5 text-[13px] font-semibold h-[38px] border border-gray-200">
              <div className="flex items-center gap-2">
                <ArrowDownAz className="size-5" />
                <span>Sắp xếp</span>
              </div>
              <ChevronDownIcon className="size-4" />
            </div>
          </div>
          <div className="flex flex-wrap mt-4 gap-y-4">
            {data && data.products.length > 0
              ? data.products.map((product) => {
                  return (
                    <div
                      className="lg:flex-[0_0_20%] px-1.5 lg:max-w-[20%] flex-[0_0_50%] max-w-[50%]"
                      key={product._id}
                    >
                      <CardProduct product={product} />
                    </div>
                  );
                })
              : "No data"}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Collection;
