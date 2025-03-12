import Image from "../../assets/slide.avif";
const Banner = () => {
  return (
    <div className="">
      <img
        id="banner"
        src={Image}
        alt="Ảnh banner"
        width={1400}
        height={600}
        className="object-cover max-w-full aspect-[1400/600] max-h-[600px]"
      />
    </div>
  );
};
export default Banner;
