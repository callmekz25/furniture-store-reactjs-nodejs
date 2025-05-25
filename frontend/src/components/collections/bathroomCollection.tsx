import Image from "@/assets/background.webp";
import CarouselBathroomProducts from "@/components/collections/carouselBathroomProducts";
import Loading from "@/components/loading/loading";
import { useMemo } from "react";
import { useGetProductsByCollection } from "@/hooks/product";
import IProduct from "@/interfaces/product.interface";
const BathroomCollection = () => {
  const { data, isLoading, error } = useGetProductsByCollection(
    "phu-kien-phong-tam",
    9
  );
  const products: IProduct[] = useMemo(() => {
    const result = [];
    if (data && data.length > 0) {
      for (let index = 0; index < data.length; index += 3) {
        result.push(data.slice(index, index + 3));
      }
    }
    return result;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>Lỗi</p>;
  }
  return (
    <div className="pb-[70px]">
      <div className="flex bg-white flex-wrap">
        <div className="lg:flex-[0_0_70%] lg:max-w-[70%]  flex-[0_0_100%] max-w-full pt-5 pr-5 pl-4 flex flex-col">
          <CarouselBathroomProducts
            products={products}
            title="Chút xinh xắn cho nhà tắm"
          />
        </div>
        <div className="lg:flex-[0_0_30%] lg:max-w-[30%]  flex-[0_0_100%] max-w-full">
          <img
            src={Image}
            alt=""
            loading="lazy"
            className="max-w-full object-cover h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BathroomCollection;
