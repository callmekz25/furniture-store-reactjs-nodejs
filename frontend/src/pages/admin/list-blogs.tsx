import LayoutAdmin from "@/layouts/adminLayout";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "@/components/admin/columns-blog";

import Loading from "@/components/user/loading";
import { Link } from "react-router-dom";
import useBlogs from "@/hooks/useBlogs";
const ListBlogs = () => {
  const { data, isLoading, error } = useBlogs();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <LayoutAdmin>
      <>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Bài viết</h3>
          <Link
            to="/add-blog"
            className="flex px-3 py-2 rounded-md items-center gap-2 bg-blue-500 text-white font-semibold text-sm"
          >
            Thêm bài viết
            <PlusIcon className="size-5" />
          </Link>
        </div>
        <div className="">
          <DataTable columns={columns} data={data} />
        </div>
      </>
    </LayoutAdmin>
  );
};

export default ListBlogs;
