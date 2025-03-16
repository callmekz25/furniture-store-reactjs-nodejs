const OverviewCard = ({
  title,
  descr,
  total,
}: {
  title: string;
  descr: string;
  total: number;
}) => {
  return (
    <div className="flex-1 rounded-xl  bg-white p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className=" text-lg font-bold">{title}</h3>
        <p className="text-sm font-medium text-gray-500">{descr}</p>
      </div>
      <h4 className="text-3xl font-bold mt-2">{total}</h4>
    </div>
  );
};

export default OverviewCard;
