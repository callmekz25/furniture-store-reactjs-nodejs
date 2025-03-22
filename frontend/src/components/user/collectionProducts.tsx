import CarouselProduct from "./carouselProduct";
import useProductsByCollection from "@/hooks/useProductsByCollection";
import CardSkeleton from "../loading/cardSkeleton";
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
  } = useProductsByCollection(slug, limit);

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="pb-[70px] lg:px-3 pl-1.5">
      {isLoading ? (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <CardSkeleton key={i} height={420} />
          ))}
        </div>
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
