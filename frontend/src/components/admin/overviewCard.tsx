import { Loader2 } from "lucide-react";

const OverviewCard = ({
  title,
  descr,
  total,
  loading,
}: {
  title: string;
  descr: string;
  total: number;
  loading: boolean;
}) => {
  return (
    <div className="flex-1 rounded-lg border border-gray-200 shadow  bg-white p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className=" text-lg font-bold">{title}</h3>
        <p className="text-sm font-medium text-gray-500">{descr}</p>
      </div>
      <h4 className="text-2xl font-bold mt-2">
        {loading ? (
          <span>
            <Loader2 className=" animate-spin size-6 text-blue-600" />
          </span>
        ) : (
          total
        )}
      </h4>
    </div>
  );
};

export default OverviewCard;
