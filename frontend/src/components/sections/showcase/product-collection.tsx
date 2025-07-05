import CarouselProduct from "@/components/carousels/carousel-products";
import Loading from "@/components/loading/loading";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { useGetProductsByCollection } from "@/hooks/use-product";
const ProductCollection = ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) => {
  const { data, isLoading, error } = useGetProductsByCollection(slug);

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="pb-[70px] lg:px-3 pl-1.5">
      <div className="">
        <CarouselProduct
          isLoading={isLoading}
          products={data?.products ?? []}
          title={title}
        />
        <div
          className={` items-center justify-center  mt-3 ${
            data && data.total > 8 ? "flex" : "hidden"
          }`}
        >
          <Link
            to={`/collections/${slug}`}
            style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.08)" }}
            className="flex justify-center  text-sm mt-4 transition-all duration-500 hover:bg-red-600 hover:text-white  items-center gap-1 font-medium bg-white  rounded py-3 px-1.5 min-w-[320px]"
          >
            Xem thêm <ChevronRightIcon className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
