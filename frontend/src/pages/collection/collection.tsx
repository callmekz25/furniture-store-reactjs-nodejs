import { useParams, useSearchParams } from "react-router-dom";
import {
  ChevronRightIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CardProduct from "@/components/product/product-card";
import FilterSideBarDesktop from "@/components/filters/filter-sidebar-desktop";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { openFilterMenu } from "@/redux/slices/filter-menu.slice";
import { useAppSelector } from "@/redux/hook";
import IProduct from "@/interfaces/product/product.interface";
import formatPriceToVND from "@/utils/format-price";
import Loading from "@/components/loading/loading";
import { useGetAllInfinite } from "@/hooks/useGet";
import searchParamsToObject from "@/utils/search-params-to-object";
import CollectionResponse from "@/interfaces/paginate-response/collection-response";
import Error from "../shared/error";
import FilterDrawerMobile from "@/components/filters/filter-drawer-mobile";
import useCheckScreen from "@/hooks/useCheckScreen";

const Collection = () => {
  const { slug } = useParams<string>();
  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");
  const dispatch = useAppDispatch();
  const { isOpenMenuFilter } = useAppSelector((state) => state.filterMenu);
  const isMobileScreen = useCheckScreen();
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [queryParams, setQueryParams] = useSearchParams();
  const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useGetAllInfinite<IProduct, CollectionResponse>(
      `/collections`,
      ["collections", slug!, queryParams.toString()],
      false,
      slug!,
      searchParamsToObject(queryParams),
      {
        enabled: !!slug,
      }
    );

  const mergedData: IProduct[] =
    data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    if (data?.pages && data.pages.length > 0) {
      if (data.pages[0]) {
        setSuppliers(data.pages[0].suppliers);
        setCollectionName(data.pages[0].type?.name);
        setTotalProducts(data.pages[0].total);
      }
    }
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

  const handleRemoveFiltered = (type: string) => {
    const newSearchParams = new URLSearchParams(queryParams);
    if (type === "supplier") {
      newSearchParams.delete("supplier");
    }
    if (type === "price") {
      newSearchParams.delete("price");
    }
    setQueryParams(newSearchParams);
  };
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
        <div className="lg:w-[25%] min-h-full lg:flex-[0_0_25%]   lg:max-w-[25%]  ">
          <FilterSideBarDesktop suppliers={suppliers} />
        </div>
      )}

      <div className="lg:flex-[0_0_75%] lg:max-w-[75%] flex-[0_0_100%]  max-w-full lg:py-10 py-3 lg:px-4 px-1">
        <div className="lg:flex lg:items-center  lg:justify-between lg:px-0 px-3">
          <div className="flex items-center gap-8">
            <h1 className="lg:text-[24px] text-[22px] font-bold text-red-700">
              {collectionName != "" && collectionName}
            </h1>
            <span className="text-sm font-normal  items-center gap-2 lg:flex hidden">
              <span className="font-bold">
                {totalProducts ? `${totalProducts} sản phẩm` : ""}
              </span>
            </span>
          </div>
          {!isLoading && (
            <p className="flex items-center justify-between">
              <span className="text-[15px] font-normal lg:hidden flex items-center gap-2">
                <span className="font-bold">{totalProducts}</span>
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
        <div className="lg:flex hidden items-center gap-4 flex-wrap py-3 ">
          {suppliersFiltered && suppliersFiltered.length > 0 ? (
            <div className="flex items-center border border-gray-300 rounded-full bg-white px-2.5 py-1 justify-between gap-2 text-[13px] font-normal opacity-70">
              <div className="flex items-center gap-1.5">
                Nhà cung cấp:
                <p className="flex items-center flex-wrap">
                  {suppliersFiltered.map((sf, index) => {
                    return (
                      <span className=" font-bold uppercase" key={sf}>
                        {sf}
                        {index === suppliersFiltered.length - 1 ? "" : ","}
                      </span>
                    );
                  })}
                </p>
              </div>
              <button onClick={() => handleRemoveFiltered("supplier")}>
                <XMarkIcon className="size-5" />
              </button>
            </div>
          ) : (
            ""
          )}
          {pricesFiltered && pricesFiltered.length > 0 ? (
            <div className="flex items-center border border-gray-300 rounded-full bg-white px-2.5 py-1 justify-between gap-2 text-[13px] font-normal opacity-70">
              <div className="flex items-center gap-1.5">
                Giá:
                <p className="flex items-center gap-1 flex-wrap">
                  {pricesFiltered.map((pf, index) => {
                    return (
                      <span className=" font-bold " key={pf}>
                        {(() => {
                          const priceRange = pf.split("-");
                          const isInfinity = priceRange[1] === "Infinity";

                          return isInfinity
                            ? `Trên ${formatPriceToVND(
                                Number(priceRange[0]),
                                false
                              )}`
                            : priceRange
                                .map((newPf) =>
                                  formatPriceToVND(Number(newPf), false)
                                )
                                .join(" - ");
                        })()}
                        {index === pricesFiltered.length - 1 ? "" : ", "}
                      </span>
                    );
                  })}
                </p>
              </div>
              <button onClick={() => handleRemoveFiltered("price")}>
                <XMarkIcon className="size-5" />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-wrap mt-4 lg:gap-y-4 gap-y-1 md:gap-y-4 ">
              {mergedData && mergedData.length > 0 ? (
                mergedData.map((product: IProduct) => {
                  return (
                    <div
                      className="lg:flex-[0_0_20%]  lg:px-1.5 px-[2px] md:px-2 lg:max-w-[20%] flex-[0_0_50%] max-w-[50%]"
                      key={product._id}
                    >
                      <CardProduct product={product} />
                    </div>
                  );
                })
              ) : (
                <h3>Chưa có sản phẩm nào trong danh mục này</h3>
              )}
            </div>
            {hasNextPage && (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetching}
                  style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
                  className="flex justify-center  text-sm mt-4 transition-all duration-500 hover:bg-red-600 hover:text-white  items-center gap-1 font-medium bg-white rounded-md py-3 px-1.5 min-w-[320px]"
                >
                  Xem thêm <ChevronRightIcon className="size-5" />
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
