const DetailSkeleton = () => {
  return (
    <section className="flex lg:flex-row flex-col gap-4 animate-pulse h-[75vh]">
      {/* Image Skeleton */}
      <div className="lg:w-[45%] flex justify-center items-center  bg-gray-200 rounded-lg" />

      {/* Content Skeleton */}
      <div className="px-4 bg-white py-3 lg:w-[55%] space-y-3">
        <div className="h-7 w-full bg-gray-200 rounded" />

        <div className="flex items-center gap-3 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 w-1/4 bg-gray-200 rounded" />
          ))}
        </div>

        <div className="flex items-center gap-8 pt-5">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>

        <div className="flex items-center gap-4 py-10">
          <div className="h-14 w-full bg-gray-200 rounded" />
          <div className="h-14 w-full  bg-gray-200 rounded" />
        </div>

        <div className="flex items-center gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-6 w-1/5 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-44 w-full bg-gray-200 rounded" />
      </div>
    </section>
  );
};

export default DetailSkeleton;
