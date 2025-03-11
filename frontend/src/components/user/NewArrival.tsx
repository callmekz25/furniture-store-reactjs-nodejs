import CarouselProduct from "./carouselProduct";
import useProducts from "@/hooks/useProducts";
import CardSkeleton from "../loading/cardSkeleton";
const NewArrival = () => {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="mt-6">
      {isLoading ? (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <CardSkeleton key={i} height={420} />
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <CarouselProduct
          products={products}
          title={"Sản phẩm mới"}
          more={true}
        />
      ) : (
        "Lỗi"
      )}
    </div>
  );
};

export default NewArrival;
