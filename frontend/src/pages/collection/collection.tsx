import { useParams, useSearchParams } from "react-router-dom";
import { FunnelIcon } from "@heroicons/react/24/outline";
import CardProduct from "@/components/cards/product-card";
import FilterSideBarDesktop from "@/components/filters/filter-sidebar-desktop";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { openFilterMenu } from "@/redux/slices/filter-menu.slice";
import { useAppSelector } from "@/redux/hook";
import IProduct from "@/interfaces/product/product.interface";
import Error from "../shared/error";
import FilterDrawerMobile from "@/components/filters/filter-drawer-mobile";
import useCheckScreen from "@/hooks/use-check-screen";
import { useGetInfiniteProductsByCollection } from "@/hooks/use-product";
import Loading from "@/components/loading/loading";
import { Loader2 } from "lucide-react";
import FilterdTags from "@/components/filters/filtered-tags";

const Collection = () => {
  const { slug } = useParams<string>();
  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");
  const dispatch = useAppDispatch();
  const { isOpenMenuFilter } = useAppSelector((state) => state.filterMenu);
  const isMobileScreen = useCheckScreen();
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [queryParams, setQueryParams] = useSearchParams();
  const canFetch = queryParams.get("sort") !== null;

  const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useGetInfiniteProductsByCollection(slug!, queryParams, canFetch);

  const mergedData: IProduct[] =
    data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    if (data?.pages && data.pages.length > 0) {
      const firstPage = data.pages[0];
      if (firstPage?.type?.name) {
        document.title = `${firstPage.type.name} - VNest`;
        setCollectionName(firstPage.type.name);
      }
      if (firstPage?.suppliers) {
        setSuppliers(firstPage.suppliers);
      }
      setTotalProducts(firstPage?.total ?? 0);
    }
    return () => {
      document.title = "Nội thất & trang trí - VNest";
    };
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryParams]);
  useEffect(() => {
    const scrollSmooth = () => {
      document.documentElement.style.scrollBehavior = "smooth";
    };
    scrollSmooth();
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const suppliersFiltered = queryParams.getAll("supplier");
  const pricesFiltered = queryParams.getAll("price");

  if (error) {
    return <Error />;
  }

  return (
    <section className="break-point flex flex-wrap pb-8">
      <div
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 lg:static lg:bg-transparent
    ${isOpenMenuFilter ? "opacity-100 visible" : "opacity-0 invisible"}`}
      ></div>
      {/* Phần filter */}
      {!isMobileScreen && (
        <div className="lg:w-[25%] min-h-full lg:flex-[0_0_25%] px-[15px] pt-10   lg:max-w-[25%]  ">
          <FilterSideBarDesktop suppliers={suppliers} />
        </div>
      )}

      <div className="lg:flex-[0_0_75%] lg:max-w-[75%] flex-[0_0_100%]  max-w-full lg:py-10 py-3 lg:px-[15px] px-1">
        <div className="lg:flex lg:items-center  lg:justify-between lg:px-0 px-3">
          <div className="flex items-center gap-8 ">
            <h1 className="lg:text-[24px] text-[22px] font-bold text-red-700">
              {collectionName}
            </h1>

            {!isLoading && (
              <p className="text-sm font-normal items-center gap-2 lg:flex hidden">
                <span className="font-bold">{totalProducts}</span> sản phẩm
              </p>
            )}
          </div>
          {!isLoading && (
            <p className="flex items-center justify-between">
              <span className="text-[15px] font-normal lg:hidden flex items-center gap-2">
                <span className="font-bold">{totalProducts}</span> sản phẩm
              </span>

              <button
                onClick={() => dispatch(openFilterMenu())}
                className="lg:hidden lg:text-sm items-center gap-1 text-[12px] rounded-full px-2 py-1 border border-gray-200 bg-white flex"
              >
                <span>Bộ lọc</span>
                <FunnelIcon className="size-4" />
              </button>
            </p>
          )}
        </div>
        {isMobileScreen && (
          <div
            className={`fixed bottom-0 left-0 right-0 z-[9999] bg-white max-h-dvh min-h-dvh transition-transform duration-500 ${
              isOpenMenuFilter
                ? "translate-y-0"
                : "translate-y-full pointer-events-none"
            }`}
          >
            <FilterDrawerMobile suppliers={suppliers} />
          </div>
        )}
        {/* Filtered  */}
        <FilterdTags
          suppliersFiltered={suppliersFiltered}
          pricesFiltered={pricesFiltered}
          queryParams={queryParams}
          onChangeQueryParams={setQueryParams}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-wrap mt-4 ">
              {mergedData && mergedData.length > 0 ? (
                mergedData.map((product: IProduct) => {
                  return (
                    <div
                      className="lg:flex-[0_0_20%]  lg:mb-3.5  mb-1 lg:px-[6px] px-[2px]  lg:max-w-[20%] flex-[0_0_50%] max-w-[50%]"
                      key={product._id}
                    >
                      <CardProduct product={product} />
                    </div>
                  );
                })
              ) : (
                <p className="text-sm lg:px-0 px-[15px]">
                  Chưa có sản phẩm nào trong danh mục này
                </p>
              )}
            </div>
            {hasNextPage && (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetching}
                  style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
                  className={`flex justify-center border gap-1 border-red-600  text-sm mt-4 transition-all duration-500 hover:bg-red-600 hover:text-white  items-center text-red-600 font-semibold bg-white rounded py-2.5 px-[25px] ${
                    isFetching ? " opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isFetching ? (
                    <>
                      Xem thêm sản phẩm
                      <Loader2 className="animate-spin size-[18px]  text-white" />
                    </>
                  ) : (
                    <>Xem thêm sản phẩm</>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Collection;
