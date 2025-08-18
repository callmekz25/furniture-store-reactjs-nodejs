import ProductCard from "@/components/cards/product-card";
import IProduct from "@/interfaces/product/product.interface";
import { useSearchParams } from "react-router-dom";
import Error from "../shared/error";
import { ChevronRightIcon } from "lucide-react";
import { useGetInfiniteProductsBySearch } from "@/hooks/use-product";
import { useEffect } from "react";
import CardSkeleton from "@/components/loading/card-skeleton";
const SearchResult = () => {
  const [search] = useSearchParams();
  const query = search.get("q");
  const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useGetInfiniteProductsBySearch(query!);

  const mergedData: IProduct[] =
    data?.pages.flatMap((page) => page.products) ?? [];
  const total = data?.pages[0].total;

  useEffect(() => {
    document.title = "Kết quả tìm kiếm - VNest";
    return () => {
      document.title = "Nội thất & trang trí - VNest";
    };
  }, []);

  if (error) {
    return <Error />;
  }
  return (
    <div className=" py-10 break-point px-3">
      {total && (
        <div className="flex justify-center flex-col items-center">
          <h3 className="color-red font-bold  text-2xl">Tìm kiếm</h3>
          <p className="mt-2 text-md">
            Có <span className=" font-semibold">{total} sản phẩm</span> cho tìm
            kiếm
          </p>
        </div>
      )}
      {search && (
        <h3 className="text-md font-normal mt-10">
          Kết quả tìm kiếm cho{" "}
          <span className="font-semibold">"{search.get("q")}"</span>
        </h3>
      )}

      <div className="flex flex-wrap  mt-3">
        {isLoading
          ? [...Array(10)].map((_, i) => (
              <CardSkeleton
                key={i}
                height={416}
                className="lg:flex-[0_0_20%] md:flex-[0_0_33%] flex-[0_0_50%] p-1.5"
              />
            ))
          : mergedData &&
            mergedData.length > 0 &&
            mergedData.map((product: IProduct) => {
              return (
                <div
                  className="lg:flex-[0_0_20%] md:flex-[0_0_33%] flex-[0_0_50%] p-1.5"
                  key={product._id}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
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
    </div>
  );
};

export default SearchResult;
