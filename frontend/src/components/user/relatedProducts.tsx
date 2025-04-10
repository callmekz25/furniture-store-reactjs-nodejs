import useRelatedProductsBySlug from "@/hooks/product/useRelatedProductsBySlug";
import CarouselProduct from "./carouselProduct";
import CardSkeleton from "../loading/cardSkeleton";
const RelatedProducts = ({
  limit,
  slug,
  title,
  more = false,
}: {
  title: string;
  more?: boolean;
  limit?: number;
  slug: string;
}) => {
  const {
    data: products,
    isLoading,
    error,
  } = useRelatedProductsBySlug(slug, limit);
  if (error) {
    return <p>Lỗi xảy ra!</p>;
  }
  return (
    <div className=" lg:px-3 pl-1.5 mt-10">
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

export default RelatedProducts;
