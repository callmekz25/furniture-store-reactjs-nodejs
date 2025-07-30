import { DataTable } from "@/components/admin/data-table";
import Loading from "@/components/loading/loading";
import { useGetPromotions } from "@/hooks/use-promotion";
import Error from "@/pages/shared/error";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { columns } from "@/components/admin/columns-table/columns-promotion";
const PromotionsList = () => {
  const { data, isLoading, error } = useGetPromotions();
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
          <h3 className="text-2xl font-bold">Khuyến mãi</h3>
          <Link
            to="/admin/add-promotion"
            className="flex px-3 py-2 rounded-md items-center gap-2 bg-blue-500 text-white font-semibold text-sm"
          >
            Thêm khuyến mãi
            <PlusIcon className="size-5" />
          </Link>
        </div>
        <div className="bg-white rounded-lg p-4 pt-2 mt-4">
          <DataTable columns={columns} data={data!} />
        </div>
      </>
    </div>
  );
};

export default PromotionsList;
