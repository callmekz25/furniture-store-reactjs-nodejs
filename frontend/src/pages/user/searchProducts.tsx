import Loading from "@/components/loading/loading";
import ProductCard from "@/components/product/productCard";
import useProductsBySearch from "@/hooks/product/useProductsBySearch";
import IProduct from "@/interfaces/product.interface";
import { useSearchParams } from "react-router-dom";
import Error from "../shared/error";

const SearchProducts = () => {
  const [search, setSearch] = useSearchParams();
  const query = search.get("q");
  const { data, isLoading, error } = useProductsBySearch(query, true);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className=" py-10 break-point px-3">
      {data && data.total && (
        <div className="flex justify-center flex-col items-center">
          <h3 className="color-red font-bold  text-2xl">Tìm kiếm</h3>
          <p className="mt-2 text-md">
            Có <span className=" font-semibold">{data.total} sản phẩm</span> cho
            tìm kiếm
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mt-14">
        {data &&
          data.products &&
          data.products.length > 0 &&
          data.products.map((product: IProduct) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default SearchProducts;
