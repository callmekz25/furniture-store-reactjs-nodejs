import Carousel from "./carousel";
import useProducts from "@/hooks/useProducts";
const NewArrival = () => {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="mt-6">
      {isLoading ? (
        <span>Loading...</span>
      ) : products && products.length > 0 ? (
        <Carousel products={products} title={"Sản phẩm mới"} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default NewArrival;
