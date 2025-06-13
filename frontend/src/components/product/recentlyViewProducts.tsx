import { useEffect, useState } from "react";
import CarouselProduct from "@/components/collections/carouselProduct";
import IProduct from "@/interfaces/product/product.interface";
import { getRecentlyViewedProducts } from "@/services/productService";
const RecentlyViewProducts = () => {
  const [recentlyViewProducts, setRecentlyViewProducts] = useState<IProduct[]>(
    []
  );
  useEffect(() => {
    setRecentlyViewProducts(getRecentlyViewedProducts());
  }, []);
  if (recentlyViewProducts.length === 0) {
    return <h3>Chưa xem sản phẩm nào</h3>;
  }
  return (
    <div className="lg:px-3 pl-1.5 mt-10">
      <CarouselProduct
        products={recentlyViewProducts}
        title="Sản phẩm đã xem"
        more={false}
      />
    </div>
  );
};

export default RecentlyViewProducts;
