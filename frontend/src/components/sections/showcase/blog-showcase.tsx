import CardSkeleton from "@/components/loading/card-skeleton";
import CarouselBlog from "@/components/carousels/carousel-blog";
import { useGetBlogs } from "@/hooks/use-blog";
import useCheckScreen from "@/hooks/use-check-screen";
const BlogShowcase = () => {
  const { data: blogs, isLoading, error } = useGetBlogs();
  const isScreenMobile = useCheckScreen();
  if (error) {
    return <span>Lỗi hiển thị</span>;
  }

  return (
    <div className="pb-[70px]">
      {isLoading ? (
        <div className="flex items-center">
          {[...Array(isScreenMobile ? 2 : 5)].map((_, i) => (
            <CardSkeleton key={i} height={420} />
          ))}
        </div>
      ) : blogs && blogs.length > 0 ? (
        <CarouselBlog blogs={blogs} title="Bài viết mới nhất" />
      ) : (
        ""
      )}
    </div>
  );
};

export default BlogShowcase;
