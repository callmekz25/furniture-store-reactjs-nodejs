import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "@/components/admin/columns-products";
import Loading from "@/components/loading/loading";
import { Link } from "react-router-dom";
import { useGetProducts } from "@/hooks/use-product";
const ListProducts = () => {
  const { data, isLoading, error } = useGetProducts();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>Lỗi!</p>;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Sản phẩm</h3>
        <Link
          to="/admin/add-product"
          className="flex px-3 py-2 rounded-md items-center gap-2 bg-blue-500 text-white font-semibold text-sm"
        >
          Thêm sản phẩm
          <PlusIcon className="size-5" />
        </Link>
      </div>
      <div className="bg-white rounded-lg p-4 pt-2 mt-4">
        <DataTable columns={columns} data={data!} />
      </div>
    </>
  );
};

export default ListProducts;
