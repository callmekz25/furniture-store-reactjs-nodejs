import { useEffect, useState } from "react";
import CarouselProduct from "./carouselProduct";
import IProduct from "@/interfaces/product.interface";
import { getRecentlyViewedProducts } from "@/api/productService";
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
