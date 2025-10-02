import { columns } from '@/components/admin/columns-table/column-collection';
import { DataTable } from '@/components/admin/data-table';
import Loading from '@/components/loading/loading';
import { useGetCollections } from '@/hooks/use-collection';

const CollectionsList = () => {
  const { data, isLoading } = useGetCollections();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Bộ sưu tập</h3>
        </div>
        <div className="bg-white rounded-lg p-4 pt-2 mt-4">
          <DataTable columns={columns} data={data!} />
        </div>
      </>
    </div>
  );
};

export default CollectionsList;
