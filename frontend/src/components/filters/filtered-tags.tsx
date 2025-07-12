import formatPriceToVND from "@/utils/format-price";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FilterdTags = ({
  suppliersFiltered,
  pricesFiltered,
  queryParams,
  onChangeQueryParams,
}) => {
  const handleRemoveFiltered = (type: string) => {
    const newSearchParams = new URLSearchParams(queryParams);
    if (type === "supplier") {
      newSearchParams.delete("supplier");
    }
    if (type === "price") {
      newSearchParams.delete("price");
    }
    onChangeQueryParams(newSearchParams);
  };
  return (
    <div className="lg:flex hidden items-center gap-4 flex-wrap py-3 ">
      {suppliersFiltered && suppliersFiltered.length > 0 ? (
        <div className="flex items-center border border-gray-300 rounded-full bg-white px-2.5 py-1 justify-between gap-2 text-[13px] font-normal opacity-70">
          <div className="flex items-center gap-1.5">
            Nhà cung cấp:
            <p className="flex items-center flex-wrap">
              {suppliersFiltered.map((sf, index) => {
                return (
                  <span className=" font-bold uppercase" key={sf}>
                    {sf}
                    {index === suppliersFiltered.length - 1 ? "" : ","}
                  </span>
                );
              })}
            </p>
          </div>
          <button onClick={() => handleRemoveFiltered("supplier")}>
            <XMarkIcon className="size-5" />
          </button>
        </div>
      ) : (
        ""
      )}
      {pricesFiltered && pricesFiltered.length > 0 ? (
        <div className="flex items-center border border-gray-300 rounded-full bg-white px-2.5 py-1 justify-between gap-2 text-[13px] font-normal opacity-70">
          <div className="flex items-center gap-1.5">
            Giá:
            <p className="flex items-center gap-1 flex-wrap">
              {pricesFiltered.map((pf, index) => {
                return (
                  <span className=" font-bold " key={pf}>
                    {(() => {
                      const priceRange = pf.split("-");
                      const isInfinity = priceRange[1] === "Infinity";

                      return isInfinity
                        ? `Trên ${formatPriceToVND(
                            Number(priceRange[0]),
                            false
                          )}`
                        : priceRange
                            .map((newPf) =>
                              formatPriceToVND(Number(newPf), false)
                            )
                            .join(" - ");
                    })()}
                    {index === pricesFiltered.length - 1 ? "" : ", "}
                  </span>
                );
              })}
            </p>
          </div>
          <button onClick={() => handleRemoveFiltered("price")}>
            <XMarkIcon className="size-5" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterdTags;
