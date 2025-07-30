import { DataTable } from "@/components/admin/data-table";
import Loading from "@/components/loading/loading";
import { useGetOrders } from "@/hooks/use-order";
import Error from "@/pages/shared/error";
import { columns } from "@/components/admin/columns-table/columns-order";
const OrdersList = () => {
  const { data, isLoading, error } = useGetOrders();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div>
      <>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Đơn hàng</h3>
        </div>
        <div className="bg-white rounded-lg p-4 pt-2 mt-4">
          <DataTable columns={columns} data={data!} />
        </div>
      </>
    </div>
  );
};

export default OrdersList;
