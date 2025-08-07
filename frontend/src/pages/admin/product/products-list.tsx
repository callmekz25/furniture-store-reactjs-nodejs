import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "@/components/admin/columns-table/columns-products";
import Loading from "@/components/loading/loading";
import { Link } from "react-router-dom";
import { useDeleteProduct, useGetProducts } from "@/hooks/use-product";
import Error from "@/pages/shared/error";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const ProductsList = () => {
  const { data, isLoading, error } = useGetProducts();
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const handleDelete = (id: string) => {
    const confirm = window.confirm("Bạn chắc chắn muốn xoá sản phẩm này?");
    if (confirm) {
      deleteProduct(id, {
        onSuccess: () => {
          toast.success("Xoá sản phẩm thành công");
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        },
      });
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
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
        {isPending && <Loading />}
        <DataTable columns={columns({ onDelete: handleDelete })} data={data!} />
      </div>
    </>
  );
};

export default ProductsList;
