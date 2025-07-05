import CarouselProduct from "@/components/carousels/carousel-products";
import { useGetRelatedProducts } from "@/hooks/use-product";
const RelatedProducts = ({ id, title }: { title: string; id: string }) => {
  const { data: products, isLoading, error } = useGetRelatedProducts(id!);

  if (error) {
    return <p>Lỗi xảy ra!</p>;
  }
  return (
    <div className=" lg:px-3 pl-1.5 mt-10">
      <CarouselProduct
        isLoading={isLoading}
        products={products ?? []}
        title={title}
      />
    </div>
  );
};

export default RelatedProducts;
