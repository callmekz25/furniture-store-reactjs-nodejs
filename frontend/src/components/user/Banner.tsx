import Image from "../../assets/slide.avif";
const Banner = () => {
  return (
    <div className="">
      <img
        id="banner"
        src={Image}
        // loading="lazy"
        alt="Ảnh banner"
        className="object-cover w-full max-h-[600px]"
      />
    </div>
  );
};
export default Banner;
