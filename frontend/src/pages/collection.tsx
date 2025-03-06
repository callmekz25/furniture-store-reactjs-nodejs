import useProductsByCollectionOrCategory from "@/hooks/useProductsByCollectionOrCategory";
import Layout from "@/layouts";
import { useParams, useSearchParams } from "react-router-dom";
import { FunnelIcon } from "@heroicons/react/24/outline";
import CardProduct from "@/components/cardProduct";
import SideBarFilter from "@/components/sideBarFilter";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { openFilterMenu } from "@/redux/slices/filter-menu.slice";
import { useAppSelector } from "@/redux/hook";
import Newsletter from "@/components/newsLetter";
import useHiddenScroll from "@/hooks/useHiddenSscroll";
const Collection = () => {
  const [typeCollection, setTypeCollection] = useState<string>();

  const { slug } = useParams<string>();
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useProductsByCollectionOrCategory(
    slug,
    searchParams
  );
  const dispatch = useAppDispatch();
  const { isOpenMenuFilter } = useAppSelector((state) => state.filterMenu);
  const [suppliers, setSuppliers] = useState<[string] | []>([]);
  // Dùng state vì suppliers và collection name nằm trong response của api nên nếu search query params thay đổi thì response thay đổi làm re-render props của sidebar không cần thiết
  useEffect(() => {
    if (data?.suppliers) {
      setSuppliers(data.suppliers);
    }
  }, [data?.suppliers]);
  useEffect(() => {
    if (data?.type.name) {
      setTypeCollection(data.type.name);
    }
  }, [data?.type.name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data?.products]);
  useHiddenScroll(isOpenMenuFilter);
  return (
    <Layout>
      <section className="break-point flex flex-wrap min-h-screen pb-8">
        <div
          className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 lg:static lg:bg-transparent
    ${isOpenMenuFilter ? "opacity-100 visible" : "opacity-0 invisible"}`}
        ></div>
        {/* Phần filter */}
        <div className="lg:w-[25%] min-h-full lg:flex-[0_0_25%]   lg:max-w-[25%] w-[85%] flex-[0_0_85%] max-w-[85%] ">
          <SideBarFilter suppliers={suppliers} />
        </div>

        <div className="lg:flex-[0_0_75%] lg:max-w-[75%] flex-[0_0_100%]  max-w-full lg:py-10 py-3 lg:px-4 px-1">
          <div className="lg:flex lg:items-center  lg:justify-between lg:px-0 px-3">
            <div className="flex items-center gap-8">
              <h1 className="lg:text-[24px] text-[22px] font-bold text-red-700">
                {typeCollection}
              </h1>
              <span className="text-sm font-normal  items-center gap-2 lg:flex hidden">
                <span className="font-bold">
                  {isLoading ? "Loading..." : data.products.length}
                </span>
                sản phẩm
              </span>
            </div>

            <p className="flex items-center justify-between">
              <span className="text-[15px] font-normal lg:hidden flex items-center gap-2">
                <span className="font-bold">
                  {isLoading ? "Loading..." : data.products.length}
                </span>
                sản phẩm
              </span>
              <button
                onClick={() => dispatch(openFilterMenu())}
                className="lg:hidden lg:text-sm items-center gap-1 text-[12px] rounded-full px-2 py-1 border border-gray-200 bg-white flex"
              >
                <span>Bộ lọc</span>
                <FunnelIcon className="size-4" />
              </button>
            </p>
          </div>
          {/* Phần hiển thị sản phẩm */}
          {isLoading ? (
            <p>Loading Products...</p>
          ) : (
            <>
              <div className="flex flex-wrap mt-4 lg:gap-y-4 gap-y-1 md:gap-y-4 ">
                {data && data.products.length > 0
                  ? data.products.map((product) => {
                      return (
                        <div
                          className="lg:flex-[0_0_20%]  lg:px-1.5 px-[2px] md:px-2 lg:max-w-[20%] flex-[0_0_50%] max-w-[50%]"
                          key={product._id}
                        >
                          <CardProduct product={product} />
                        </div>
                      );
                    })
                  : "No data"}
              </div>
            </>
          )}
        </div>
      </section>
      <Newsletter />
    </Layout>
  );
};

export default Collection;
