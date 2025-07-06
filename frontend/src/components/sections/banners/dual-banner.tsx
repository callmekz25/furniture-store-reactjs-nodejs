import { Link } from "react-router-dom";

const DualBanner = () => {
  return (
    <div className="pb-[70px]">
      <div className="flex items-center flex-wrap">
        <div className="mb-[15px] lg:flex-[0_0_50%] lg:max-w-[50%] flex-[0_0_100%] max-w-[100%] px-[15px]">
          <div className=" rounded overflow-hidden">
            <Link to={"/collections/chan-ga-goi"}>
              <img
                src="//theme.hstatic.net/200000796751/1001266995/14/homebanner_1_img.jpg?v=91"
                alt="Ngủ"
                className=" object-cover max-w-full w-full transition-all ease-linear duration-300 hover:scale-105"
              />
            </Link>
          </div>
        </div>
        <div className="mb-[15px] lg:flex-[0_0_50%] lg:max-w-[50%] flex-[0_0_100%] max-w-[100%] px-[15px]">
          <div className=" rounded overflow-hidden">
            <Link to={"/collections/nen-thom"}>
              <img
                src="//theme.hstatic.net/200000796751/1001266995/14/homebanner_2_img.jpg?v=91"
                alt="Nến thơm"
                className=" object-cover max-w-full w-full transition-all ease-linear duration-300 hover:scale-105"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualBanner;
