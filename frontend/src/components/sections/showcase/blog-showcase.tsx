import CardSkeleton from "@/components/loading/card-skeleton";
import CarouselBlog from "@/components/carousels/carousel-blog";
import { useGetBlogs } from "@/hooks/use-blog";
const BlogShowcase = () => {
  const { data: blogs, isLoading, error } = useGetBlogs();

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

export default BlogShowcase;
