import FEATURES from "@/constants/features";
const FeatureSection = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-14">
      {FEATURES.map((feature) => {
        return (
          <div
            className="bg-white py-9 px-8 flex flex-col gap-2 justify-center"
            key={feature.label}
          >
            <div className="size-10 text-black">{feature.icon}</div>
            <p className="font-bold lg:text-[20px] text-md line-clamp-2">
              {feature.label}
            </p>
            <span className="font-medium text-sm text-gray-500">
              {feature.descr}
            </span>
          </div>
        );
      })}
    </section>
  );
};

export default FeatureSection;
