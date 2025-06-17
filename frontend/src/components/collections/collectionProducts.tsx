import CarouselProduct from "./carouselProduct";
import Loading from "../loading/loading";
import { useGetAll } from "@/hooks/useGet";
import IProduct from "@/interfaces/product/product.interface";
const CollectionProduct = ({
  slug,
  title,
  more = false,
}: {
  slug: string;
  title: string;
  more: boolean;
}) => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetAll<IProduct[]>(
    `/collections/${slug}/products`,
    ["products", slug],
    false,
    undefined,
    {
      limit: 8,
    },
    { enabled: !!slug }
  );

  if (error) {
    return <span>Lỗi hiển thị</span>;
  }
  return (
    <div className="pb-[70px] lg:px-3 pl-1.5">
      {isLoading ? (
        <Loading />
      ) : products && products.length > 0 ? (
        <CarouselProduct
          products={products}
          title={title}
          more={more}
          slug={slug}
        />
      ) : (
        "Lỗi"
      )}
    </div>
  );
};

export default CollectionProduct;
