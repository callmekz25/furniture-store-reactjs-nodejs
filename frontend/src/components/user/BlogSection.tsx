import CardSkeleton from "../loading/cardSkeleton";
import useBlogs from "@/hooks/useBlogs";
import CarouselBlog from "./carouselBlog";
const BlogSection = () => {
  const { data: blogs, isLoading, error } = useBlogs();

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
      ) : blogs && blogs.length > 0 ? (
        <CarouselBlog blogs={blogs} title="Bài viết mới nhất" />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default BlogSection;
