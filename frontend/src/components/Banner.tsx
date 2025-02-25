import Image from "../assets/slide.jpg";
const Banner = () => {
  return (
    <div className="">
      <img
        id="banner"
        src={Image}
        alt="Ảnh giới thiệu về cửa hàng"
        className="object-contain  w-full "
      />
    </div>
  );
};
export default Banner;
