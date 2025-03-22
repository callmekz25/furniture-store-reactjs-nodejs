import useProductsByCollectionOrCategory from "@/hooks/useProductsByCollectionOrCategory";
import Layout from "@/layouts/userLayout";
import { useParams, useSearchParams } from "react-router-dom";
import {
  ChevronRightIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CardProduct from "@/components/user/productCard";
import SideBarFilter from "@/components/user/sideBarFilter";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { openFilterMenu } from "@/redux/slices/filter-menu.slice";
import { useAppSelector } from "@/redux/hook";

import useHiddenScroll from "@/hooks/useHiddenSscroll";
import IProduct from "@/interfaces/product.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { shallowEqual } from "react-redux";

const Collection = () => {
  // Dùng ref để giá trị không bị re-render chỉ mount 1 lần vì cố định
  const suppliersRef = useRef<string[] | null>(null);
  const typeRef = useRef<string | null>(null);
  const { slug } = useParams<string>();

  const dispatch = useAppDispatch();
  const { isOpenMenuFilter } = useAppSelector(
    (state) => state.filterMenu,
    shallowEqual
  );

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useProductsByCollectionOrCategory(slug, searchParams);
  // Data của useInfiniteQuery là 1 object chứa pageParams: array là các số trang đã query rồi và pages: array chứa dữ liệu trả về từ api
  // Hoạt động bằng cách nối mảng nhưng chỉ nối products tránh trùng lặp key của suppliers và type
  // Do pages trả về 1 array chứa các response phải làm phẳng mảng
  const mergedData = {
    products: data?.pages.flatMap((page) => page.products) || [],
    suppliers: suppliersRef.current || [],
    type: typeRef.current || {},
    total: data?.pages[0]?.total || 0,
  };
  useEffect(() => {
    if (data?.pages.length) {
      if (!suppliersRef.current && data.pages[0].suppliers) {
        suppliersRef.current = data.pages[0].suppliers;
      }
      if (!typeRef.current && data.pages[0].type) {
        typeRef.current = data.pages[0].type;
      }
      if (data.pages[0].total !== undefined) {
        setTotalProducts(data.pages[0].total);
      }
    }
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);
  useEffect(() => {
    const scrollSmooth = () => {
      document.documentElement.style.scrollBehavior = "smooth";
    };
    scrollSmooth();
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  useHiddenScroll(isOpenMenuFilter);
  // Lấy ra các giá trị đã filtered
  const suppliersFiltered = searchParams.getAll("supplier");
  const pricesFiltered = searchParams.getAll("price");

  const handleRemoveFiltered = (type: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (type === "supplier") {
      newSearchParams.delete("supplier");
    }
    if (type === "price") {
      newSearchParams.delete("price");
    }
    setSearchParams(newSearchParams);
  };
  if (error) {
    return <p>Lỗi xảy ra...</p>;
  }
  console.log(mergedData);

  return (
    <Layout>
      <section className="break-point flex flex-wrap min-h-screen pb-8">
        <div
          className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 lg:static lg:bg-transparent
    ${isOpenMenuFilter ? "opacity-100 visible" : "opacity-0 invisible"}`}
        ></div>
        {/* Phần filter */}
        <div className="lg:w-[25%] min-h-full lg:flex-[0_0_25%]   lg:max-w-[25%] w-[85%] flex-[0_0_85%] max-w-[85%] ">
          <SideBarFilter suppliers={suppliersRef.current} />
        </div>

        <div className="lg:flex-[0_0_75%] lg:max-w-[75%] flex-[0_0_100%]  max-w-full lg:py-10 py-3 lg:px-4 px-1">
          <div className="lg:flex lg:items-center  lg:justify-between lg:px-0 px-3">
            <div className="flex items-center gap-8">
              <h1 className="lg:text-[24px] text-[22px] font-bold text-red-700">
                {typeRef?.current?.name}
              </h1>
              <span className="text-sm font-normal  items-center gap-2 lg:flex hidden">
                <span className="font-bold">{totalProducts}</span>
                sản phẩm
              </span>
            </div>

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
          </div>
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
          {/* Phần hiển thị sản phẩm */}
          {isLoading ? (
            <div className="flex flex-wrap mt-4 lg:gap-y-4 gap-y-1 md:gap-y-4"></div>
          ) : (
            <>
              <div className="flex flex-wrap mt-4 lg:gap-y-4 gap-y-1 md:gap-y-4 ">
                {mergedData && mergedData.products.length > 0 ? (
                  mergedData.products.map((product: IProduct) => {
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
                  <h3>Không tìm thấy sản phẩm</h3>
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
    </Layout>
  );
};

export default Collection;
