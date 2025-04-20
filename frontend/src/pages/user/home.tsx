import Banner from "../../components/sections/banner";
import CollectionSeciton from "@/components/sections/collectionSection";
import CollectionProducts from "@/components/collections/collectionProducts";
import CategorySection from "@/components/sections/categorySection";
import BlogSection from "@/components/sections/blogSection";
import NewArrival from "@/components/collections/newArrival";
import BathroomCollection from "@/components/collections/bathroomCollection";
import CategoryMenu from "@/components/sections/categoryMenu";

const Home = () => {
  return (
    <div className="pb-[70px]">
      <div className="break-point">
        {/* <CategoryMenu /> */}
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
