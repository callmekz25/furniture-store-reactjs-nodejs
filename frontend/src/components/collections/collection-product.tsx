import CarouselProduct from "./carousel-products";
import Loading from "../loading/loading";
import { useGetAll } from "@/hooks/useGet";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import ICollectionLimitResponse from "@/interfaces/paginate-response/collection-limit-response";
const CollectionProduct = ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) => {
  const { data, isLoading, error } = useGetAll<ICollectionLimitResponse>(
    `/collections/${slug}/products`,
    ["products", slug],
    false,
    undefined,
    {
      limit: 8,
    },
    { enabled: !!slug }
  );

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="pb-[70px] lg:px-3 pl-1.5">
      {isLoading ? (
        <Loading />
      ) : data && data.products.length > 0 ? (
        <div className="">
          <CarouselProduct
            products={data.products}
            title={title}
            total={data.total}
            slug={slug}
          />
          <div
            className={` items-center justify-center  mt-3 ${
              data.total > 8 ? "flex" : "hidden"
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
      ) : (
        "Lỗi"
      )}
    </div>
  );
};

export default CollectionProduct;
