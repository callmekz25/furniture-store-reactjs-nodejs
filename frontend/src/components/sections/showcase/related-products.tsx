import CarouselProduct from "@/components/carousels/carousel-products";
import CardSkeleton from "@/components/loading/card-skeleton";
import { useGetAll } from "@/hooks/use-get";
import IProduct from "@/interfaces/product/product.interface";
const RelatedProducts = ({ slug, title }: { title: string; slug: string }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetAll<IProduct[]>(
    `/products/${slug}/related`,
    ["related-products", slug],
    false,
    undefined,
    {
      limit: 8,
    }
  );
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
        <CarouselProduct products={products} title={title} />
      ) : (
        "Lỗi"
      )}
    </div>
  );
};

export default RelatedProducts;
