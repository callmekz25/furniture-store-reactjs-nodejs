import Layout from "../layouts";
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import NewArrival from "../components/NewArrival";
import FeatureSection from "../components/FeatureSection";
import SaleSection from "../components/SaleSection";
import BlogSection from "../components/BlogSection";
import Newsletter from "../components/Newsletter";
const Home = () => {
  return (
    <Layout>
      <div className="">
        <div className="px-6 lg:px-[100px]">
          <Banner />
          <h3 className="font-extrabold text-4xl leading-14 mt-5">
            Độc đáo từng chi tiết <span className="text-gray-400">/</span>
            Hoàn hảo từng trải nghiệm
          </h3>
          <p className="font-medium text-gray-500 mt-4 text-md">
            <span className="font-bold text-black">3legant</span> nằm ở vị trí
            15 Lý Nam Đế, Nha Trang, Khánh Hòa
          </p>
          {/* Category Section */}
          <CategorySection />
          <NewArrival />
          <FeatureSection />
        </div>
        <SaleSection />
        <div className="lg:px-[100px] px-6">
          <BlogSection />
        </div>
        <Newsletter />
      </div>
    </Layout>
  );
};
export default Home;
