const CardSkeleton = ({
  height = 345,
  className,
}: {
  height: number;
  className?: string;
}) => {
  return (
    <div
      className={`rounded w-full px-1 lg:px-2 ${className}`}
      style={{ height: height }}
    >
      <div className="animate-shimmer-white h-full w-full rounded"></div>
    </div>
  );
};

export default CardSkeleton;
