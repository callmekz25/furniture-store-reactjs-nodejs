import CarouselProduct from "@/components/carousels/carousel-products";
import { useGetRecommendProducts } from "@/hooks/use-product";
import { useEffect } from "react";
const RelatedProducts = ({ productId }: { productId: string }) => {
  const { data, isLoading, error } = useGetRecommendProducts(productId!);

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        "vector",
        JSON.stringify({
          value: data.vector,
          expiredAt: Date.now() + 30 * 60 * 1000,
        })
      );
    }
  }, [data]);
  if (error) {
    return;
  }
  return (
    <div className=" lg:px-3 pl-1.5 mt-10">
      <CarouselProduct
        isLoading={isLoading}
        products={data?.products ?? []}
        title={"Sản phẩm gợi ý"}
      />
    </div>
  );
};

export default RelatedProducts;
