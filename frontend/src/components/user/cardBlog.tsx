import IBlog from "@/interfaces/blog.interface";
import formatDate from "@/utils/formatDate";
import { CalendarDays, ChevronsRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
const CardBlog = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="flex flex-col gap-2 w-full h-full card-product bg-white rounded transition-all duration-500  overflow-hidden">
      <Link to={`/blogs/${blog.category}/${blog.slug}`}>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          loading="lazy"
          width={334}
          height={334}
          className="max-w-full object-cover w-full h-full  hover:cursor-pointer "
        />
      </Link>
      <div className="flex flex-col flex-1 py-2.5 px-4 ">
        <h3 className="text-[16px] min-h-[40px] font-bold color-red leading-5 line-clamp-2 hover:cursor-pointer">
          {blog.title}
        </h3>
        <p className="text-sm font-normal line-clamp-2 text-gray-400  overflow-hidden mt-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam atque
          autem expedita sapiente porro accusamus fugit libero ipsum, sequi, quo
          id, maiores velit magnam commodi error at ea ipsam exercitationem.
        </p>
        <div className="flex items-center justify-between pt-4 text-gray-400  text-[12px] font-normal border-t border-gray-200 mt-4">
          <p className="flex items-center gap-1">
            <CalendarDays className="size-3 " />
            {formatDate(blog.createdAt)}
          </p>
          <Link
            to={`/blogs/${blog.category}/${blog.slug}`}
            className="flex items-center gap-1 "
          >
            Xem thêm <ChevronsRightIcon name="Xem thêm" className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
