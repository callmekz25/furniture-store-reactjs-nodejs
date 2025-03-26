import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "@/components/admin/columns-products";

import useProducts from "@/hooks/useProducts";
import Loading from "@/components/user/loading";
import { Link } from "react-router-dom";
const ListProducts = () => {
  const { data, isLoading, error } = useProducts();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Sản phẩm</h3>
        <Link
          to="/add-product"
          className="flex px-3 py-2 rounded-md items-center gap-2 bg-blue-500 text-white font-semibold text-sm"
        >
          Thêm sản phẩm
          <PlusIcon className="size-5" />
        </Link>
      </div>
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default ListProducts;
