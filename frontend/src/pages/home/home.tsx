import Banner from "../../components/sections/banners/banner";
import CollectionSeciton from "@/components/sections/showcase/featured-collections";
import ProductsCollection from "@/components/sections/showcase/product-collection";
import CategorySection from "@/components/sections/category/category-section";
import BlogShowcase from "@/components/sections/showcase/blog-showcase";
import NewArrivalsShowcase from "@/components/sections/showcase/new-arrivals-showcase";
import BathroomShowcase from "@/components/sections/showcase/bathroom-showcase";
import DualBanner from "@/components/sections/banners/dual-banner";

const Home = () => {
  return (
    <div className="pb-[70px]">
      <div className="break-point">
        <Banner />
        <CollectionSeciton />
        <ProductsCollection title="Đồ bếp nhập khẩu cao cấp" slug="yeu-bep" />
        <ProductsCollection title="Back To School" slug="back-to-school" />
        <CategorySection />
        <NewArrivalsShowcase />
        <DualBanner />
        <BathroomShowcase />
        <BlogShowcase />
      </div>
    </div>
  );
};
export default Home;
