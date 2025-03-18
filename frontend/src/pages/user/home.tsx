import Layout from "../../layouts/userLayout";
import Banner from "../../components/user/banner";
import CollectionSeciton from "../../components/user/collectionSection";
import NewArrival from "../../components/user/newArrival";

import CategorySection from "../../components/user/categorySection";
import BlogSection from "../../components/user/blogSection";

const Home = () => {
  return (
    <Layout>
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
        </div>
        {/* Category Section */}
        <div className="break-point ">
          <CollectionSeciton />
          <NewArrival />
        </div>
        <div className="break-point ">
          <CategorySection />
          <BlogSection />
        </div>
      </div>
    </Layout>
  );
};
export default Home;
