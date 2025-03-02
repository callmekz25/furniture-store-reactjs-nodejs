import Carousel from "./carousel";
import useProducts from "@/hooks/useProducts";
const BlogSection = () => {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }

  return (
    <div className="mt-6">
      {isLoading ? (
        <span>Loading...</span>
      ) : products && products.length > 0 ? (
        <Carousel products={products} title={"Bài viết mới nhất"} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default BlogSection;
