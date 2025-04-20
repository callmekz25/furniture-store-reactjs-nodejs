import CardSkeleton from "@/components/loading/cardSkeleton";
import useBlogs from "@/hooks/blog/useBlogs";
import CarouselBlog from "@/components/blog/carouselBlog";
const BlogSection = () => {
  const { data: blogs, isLoading, error } = useBlogs();

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }

  return (
    <div className="pb-[70px]">
      {isLoading ? (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <CardSkeleton key={i} height={420} />
          ))}
        </div>
      ) : blogs && blogs.length > 0 ? (
        <CarouselBlog blogs={blogs} title="Bài viết mới nhất" />
      ) : (
        "Không có bài viết nào"
      )}
    </div>
  );
};

export default BlogSection;
