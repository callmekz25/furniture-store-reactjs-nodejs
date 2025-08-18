import CarouselBathroom from "@/components/carousels/carousel-bathroom";
import { useMemo } from "react";
import IProduct from "@/interfaces/product/product.interface";
import { useGetProductsByCollection } from "@/hooks/use-product";
const BathroomShowcase = () => {
  const { data, isLoading, error } = useGetProductsByCollection(
    "phu-kien-phong-tam",
    9
  );

  const products: IProduct[][] = useMemo(() => {
    const result = [];
    if (data && data?.products.length > 0) {
      for (let index = 0; index < data.products.length; index += 3) {
        result.push(data.products.slice(index, index + 3));
      }
    }
    return result;
  }, [data]);

  return (
    <div className="pb-[70px]">
      <div className="flex bg-white flex-wrap">
        <div className="lg:flex-[0_0_70%] lg:max-w-[70%]  flex-[0_0_100%] max-w-full pt-5 pr-5 pl-4 flex flex-col">
          {error ? (
            <span>Xảy ra lỗi khi tải sản phẩm</span>
          ) : (
            <CarouselBathroom
              products={products}
              isLoading={isLoading}
              title="Chút xinh xắn cho nhà tắm"
            />
          )}
        </div>
        <div className="lg:flex-[0_0_30%] lg:max-w-[30%]  flex-[0_0_100%] max-w-full">
          <img
            src="//theme.hstatic.net/200000796751/1001266995/14/home_collection_3_banner.jpg?v=91"
            alt="Phòng tắm"
            loading="lazy"
            className="max-w-full object-cover h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BathroomShowcase;
