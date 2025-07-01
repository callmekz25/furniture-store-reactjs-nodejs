const CardSkeleton = ({ height = 345 }) => {
  return (
    <div className="  w-full   rounded " style={{ height: height }}>
      <div className="bg-white  animate-pulse h-full w-full rounded"></div>
    </div>
  );
};

export default CardSkeleton;
