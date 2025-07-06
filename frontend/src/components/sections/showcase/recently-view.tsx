import { useEffect, useState } from "react";
import CarouselProduct from "@/components/carousels/carousel-products";
import IProduct from "@/interfaces/product/product.interface";
import { getRecentlyViewedProducts } from "@/services/product.service";
const RecentlyViewProducts = () => {
  const [recentlyViewProducts, setRecentlyViewProducts] = useState<IProduct[]>(
    []
  );
  useEffect(() => {
    setRecentlyViewProducts(getRecentlyViewedProducts());
  }, []);
  if (recentlyViewProducts.length === 0) {
    return;
  }
  return (
    <div className="lg:px-3 pl-1.5 mt-10">
      <CarouselProduct
        isLoading={false}
        products={recentlyViewProducts}
        title="Sản phẩm đã xem"
      />
    </div>
  );
};

export default RecentlyViewProducts;
