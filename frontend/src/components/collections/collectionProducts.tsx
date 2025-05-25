import CarouselProduct from "./carouselProduct";
import Loading from "../loading/loading";
import { useGetProductsByCollection } from "@/hooks/product";
const CollectionProduct = ({
  slug,
  title,
  limit,
  more = false,
}: {
  slug: string;
  title: string;
  more: boolean;
  limit?: number;
}) => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCollection(slug, limit);

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="pb-[70px] lg:px-3 pl-1.5">
      {isLoading ? (
        <Loading isBgColor={false} />
      ) : products && products.length > 0 ? (
        <CarouselProduct
          products={products}
          title={title}
          more={more}
          slug={slug}
        />
      ) : (
        "Lỗi"
      )}
    </div>
  );
};

export default CollectionProduct;
