import { useEffect, useState } from "react";
import useDebounce from "@/hooks/shared/useDebounce";
import useProductsBySearch from "@/hooks/product/useProductsBySearch";
import { SearchIcon } from "lucide-react";
import IProduct from "@/interfaces/product.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";
import getProductImages from "@/utils/getProductImages";
import getFakePrice from "@/utils/getFakePrice";
const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceSearchTermValue = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useProductsBySearch(
    debounceSearchTermValue
  );
  useEffect(() => {
    console.log(debounceSearchTermValue);
  }, [debounceSearchTermValue]);

  return (
    <>
      <div className=" w-[60%] mx-auto flex flex-col ">
        <div className="relative ">
          <input
            type="text"
            className=" rounded outline-none text-sm font-medium text-black bg-white w-full py-2.5 pl-4 pr-13 placeholder:text-sm placeholder:font-normal"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button className="bg-red-600 px-4 py-1.5 absolute right-[3px] top-[50%] -translate-y-1/2 rounded  flex items-center justify-center">
            <SearchIcon className="size-5  text-white" />
          </button>
          <div
            className={`absolute px-5 top-full left-0 w-full bg-white z-[999] h-auto transition-opacity duration-500 ${
              debounceSearchTermValue && data
                ? "opacity-100 visible pointer-events-auto"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            {data && data.products && data.products.length > 0 ? (
              data.products.map((product: IProduct) => {
                return (
                  <div
                    key={product._id}
                    className="py-4 flex items-center justify-between border-b border-gray-200"
                  >
                    <div className="flex flex-col text-black text-sm font-normal opacity-80">
                      <span>{product.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-black">
                          {formatPriceToVND(product.minPrice)}
                        </span>
                        <span className="font-medium text-[13px] line-through text-black opacity-65">
                          {product.discount > 0
                            ? formatPriceToVND(getFakePrice(product))
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="w-[50px]">
                      <img
                        src={getProductImages(product, true)}
                        className="max-w-full object-cover"
                        alt={product.title}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-sm font-normal flex items-center justify-center text-black opacity-70">
                Không có sản phẩm nào
              </div>
            )}
            {data && data.products && data.products.length > 0 && (
              <button className="text-sm font-normal hover:text-red-700 w-full text-black opacity-70 py-4 flex items-center justify-center">
                Xem thêm {data.total} sản phẩm
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
