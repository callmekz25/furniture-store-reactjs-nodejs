import Banner from "../../components/sections/introduce/banner";
import CollectionSeciton from "@/components/sections/showcase/featured-collections";
import ProductsCollection from "@/components/sections/showcase/product-collection";
import CategorySection from "@/components/sections/category/category-section";
import BlogShowcase from "@/components/sections/showcase/blog-showcase";
import NewArrivalsShowcase from "@/components/sections/showcase/new-arrivals-showcase";
import BathroomShowcase from "@/components/sections/showcase/bathroom-showcase";

const Home = () => {
  return (
    <div className="pb-[70px]">
      <div className="break-point">
        <Banner />
        <section className=" flex py-8 flex-col justify-center items-center">
          <h3 className="font-extrabold text-4xl leading-14 ">
            Độc đáo từng chi tiết <span className="text-gray-400">/</span>
            Hoàn hảo từng trải nghiệm
          </h3>
          <p className="font-medium text-gray-500 mt-4 text-md">
            <span className="font-bold text-black">3legant</span> nằm ở vị trí
            15 Lý Nam Đế, Nha Trang, Khánh Hòa
          </p>
        </section>
        <CollectionSeciton />
        <ProductsCollection title="Đồ bếp nhập khẩu cao cấp" slug="yeu-bep" />
        <ProductsCollection title="Back To School" slug="back-to-school" />
        <CategorySection />
        <NewArrivalsShowcase />
        <BathroomShowcase />
        {/* <BlogCollection /> */}
      </div>
    </div>
  );
};
export default Home;
