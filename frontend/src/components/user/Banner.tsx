import Image from "../../assets/slide.avif";
const Banner = () => {
  return (
    <div className="">
      <img
        id="banner"
        src={Image}
        alt="Ảnh"
        className="object-cover w-full max-h-[600px]"
      />
    </div>
  );
};
export default Banner;
