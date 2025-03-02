import Layout from "../layouts";
import Banner from "../components/banner";
import CategorySection from "../components/categorySection";
import NewArrival from "../components/newArrival";
import FeatureSection from "../components/featureSection";
import SaleSection from "../components/saleSection";
import BlogSection from "../components/blogSection";
import Newsletter from "../components/newsLetter";
const Home = () => {
  return (
    <Layout>
      <>
        <div className="break-point ">
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
        </div>
        {/* Category Section */}
        <div className="break-point">
          <CategorySection />
          <NewArrival />
          <FeatureSection />
        </div>
      </>
      <div className="break-point ">
        <SaleSection />
        <BlogSection />
      </div>
      <Newsletter />
    </Layout>
  );
};
export default Home;
