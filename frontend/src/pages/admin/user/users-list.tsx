import { DataTable } from "@/components/admin/data-table";
import Loading from "@/components/loading/loading";
import Error from "@/pages/shared/error";
import { columns } from "@/components/admin/columns-table/column-user";
import { useGetUsers } from "@/hooks/use-user";
const UsersList = () => {
  const { data, isLoading, error } = useGetUsers();
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
          <h3 className="text-2xl font-bold">Khách hàng</h3>
        </div>
        <div className="bg-white rounded-lg p-4 pt-2 mt-4">
          <DataTable columns={columns} data={data!} />
        </div>
      </>
    </div>
  );
};

export default UsersList;
