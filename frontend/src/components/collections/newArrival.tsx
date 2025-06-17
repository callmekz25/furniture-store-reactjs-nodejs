import Image from "@/assets/background.webp";
import ProductCard from "@/components/product/productCard";
import IProduct from "@/interfaces/product/product.interface";
import CardSkeleton from "@/components/loading/cardSkeleton";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { useGetAll } from "@/hooks/useGet";
const NewArrival = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetAll<IProduct[]>(
    `/collections/san-pham-moi/products`,
    ["products", "san-pham-moi"],
    false,
    undefined,
    {
      limit: 10,
    }
  );

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="pb-[70px] lg:px-3 px-2">
      <h3 className="font-bold  md:text-2xl py-5 text-lg text-red-700">
        Sản phẩm mới
      </h3>
      <div className="flex flex-wrap h-fit">
        <div className="lg:flex-[0_0_20%] lg:max-w-[20%] lg:block hidden">
          <img
            src={Image}
            alt=""
            loading="lazy"
            className=" object-cover max-w-full w-full aspect-[2/5]"
          />
        </div>
        <div className="lg:flex-[0_0_80%] lg:max-w-[80%] w-full max-w-full lg:pl-4  grid lg:grid-cols-5 grid-cols-2 gap-4">
          {isLoading ? (
            <div className="flex items-center">
              {[...Array(10)].map((_, i) => (
                <CardSkeleton key={i} height={420} />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            products.map((product: IProduct) => {
              return (
                <div className="" key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            })
          ) : (
            "Lỗi"
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3">
        <Link
          to={`/collections/san-pham-moi`}
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
          className="flex justify-center text-red-700  text-sm mt-4 transition-all duration-500 hover:bg-red-600 hover:text-white  items-center gap-1 font-medium bg-white border border-red-700 rounded py-3 px-4"
        >
          Xem tất cả <span className="font-bold">Sản phẩm mới</span>
          <ChevronRightIcon className="size-5" />
        </Link>
      </div>
    </div>
  );
};

export default NewArrival;
