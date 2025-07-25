import Image from "@/assets/background.webp";
import ProductCard from "@/components/cards/product-card";
import IProduct from "@/interfaces/product/product.interface";
import CardSkeleton from "@/components/loading/card-skeleton";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsByCollection } from "@/hooks/use-product";
const NewArrivalsShowcase = () => {
  const { data, isLoading, error } = useGetProductsByCollection(
    "san-pham-moi",
    10
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
        <div className="lg:flex-[0_0_20%] lg:max-w-[20%]  lg:pr-2 overflow-hidden lg:flex justify-center items-center hidden">
          <img
            src="//theme.hstatic.net/200000796751/1001266995/14/home_coll_1_banner.jpg?v=91"
            alt="Sản phẩm mới"
            loading="lazy"
            className=" object-cover  rounded h-full max-w-full w-full"
          />
        </div>
        <div className="lg:flex-[0_0_80%] lg:max-w-[80%] w-full max-w-full   grid lg:grid-cols-5 grid-cols-2 ">
          {isLoading
            ? [...Array(10)].map((_, i) => (
                <CardSkeleton key={i} height={420} />
              ))
            : data && data.products.length > 0
            ? data.products.map((product: IProduct) => {
                return (
                  <div
                    key={product?._id}
                    className="lg:px-[6px] lg:mb-3.5  mb-1  px-1"
                  >
                    <ProductCard product={product} />
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div
        className={` items-center justify-center mt-3 ${
          data && data.total > 10 ? " flex" : ""
        }`}
      >
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

export default NewArrivalsShowcase;
