import Banner from "../../components/sections/banner";
import CollectionSeciton from "@/components/sections/collection-section";
import CollectionProducts from "@/components/collections/collection-product";
import CategorySection from "@/components/sections/category-section";
import BlogCollection from "@/components/collections/blog-collection";
import NewArrival from "@/components/collections/new-arrival";
import BathroomCollection from "@/components/collections/bathroom-collection";

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
        <CategorySection />
        <NewArrival />
        <BathroomCollection />
        {/* <BlogSection /> */}
      </div>
    </div>
  );
};
export default Home;
