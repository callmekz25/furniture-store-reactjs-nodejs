import Layout from "../../layouts/userLayout";
import Banner from "../../components/user/banner";
import CollectionSeciton from "../../components/user/collectionSection";
import CollectionProducts from "../../components/user/collectionProducts";

import CategorySection from "../../components/user/categorySection";
import BlogSection from "../../components/user/blogSection";
import NewArrivalProducts from "@/components/user/newArrivalProducts";

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
          <CollectionProducts
            title="Đồ bếp nhập khẩu cao cấp"
            more={true}
            slug="yeu-bep"
          />
          <CollectionProducts
            title="Back To School"
            more={false}
            slug="back-to-school"
          />
        </div>
        <div className="break-point ">
          <CategorySection />
          <NewArrivalProducts />
          <BlogSection />
        </div>
      </div>
    </Layout>
  );
};
export default Home;
