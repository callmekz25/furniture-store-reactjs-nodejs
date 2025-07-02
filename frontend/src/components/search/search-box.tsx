import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import IProduct from "@/interfaces/product/product.interface";
import formatPriceToVND from "@/utils/format-price";
import getProductImages from "@/utils/get-images";
import getFakePrice from "@/utils/get-fake-price";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetAll } from "@/hooks/useGet";
import ICollectionLimitResponse from "@/interfaces/paginate-response/collection-limit-response";
import getPrice from "@/utils/get-price";

const SearchBox = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [hiddenSearch, setHiddenSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const location = useLocation();
  const debounceSearchTermValue = useDebounce(searchTerm, 500);

  const { data } = useGetAll<ICollectionLimitResponse>(
    "/search",
    ["products", debounceSearchTermValue as string],
    false,
    undefined,
    { q: debounceSearchTermValue },
    { enabled: !!debounceSearchTermValue }
  );

  const handleNavigateSearchPage = () => {
    navigate(`/search?q=${searchTerm}&page=1`);
  };
  useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);
  useEffect(() => {
    const handleClickOutSearch = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setHiddenSearch(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutSearch);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSearch);
    };
  }, []);
  console.log(data);

  return (
    <>
      <div className=" w-full flex flex-col ">
        <div className="relative " ref={searchRef}>
          <input
            type="text"
            className=" rounded outline-none text-sm font-medium text-black bg-white w-full py-2.5 pl-4 pr-13 placeholder:text-sm placeholder:font-normal"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onFocus={() => setHiddenSearch(false)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button className="bg-red-600 px-4 py-1.5 absolute right-[3px] top-[50%] -translate-y-1/2 rounded  flex items-center justify-center">
            <SearchIcon className="size-5  text-white" />
          </button>
          <div
            className={`absolute px-5 top-full shadow-md left-0 w-full bg-white z-[999] h-auto transition-opacity duration-500 ${
              debounceSearchTermValue && data && !hiddenSearch
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
                      <Link
                        onClick={() => setSearchTerm("")}
                        to={`/products/${product.slug}`}
                      >
                        {product.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-black">
                          {formatPriceToVND(getPrice(product))}
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
                        src={getProductImages(product, true) as string}
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
              <button
                onClick={() => handleNavigateSearchPage()}
                className="text-sm font-normal hover:text-red-700 w-full text-black opacity-70 py-4 flex items-center justify-center"
              >
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
