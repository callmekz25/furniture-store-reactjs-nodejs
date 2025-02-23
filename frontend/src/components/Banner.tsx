import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "../assets/slide.jpg";
const Banner = () => {
  return (
    <div className="">
      <img
        id="banner"
        src={Image}
        alt="Banner"
        height={400}
        className="object-contain  w-full min-h-[400px]"
      />
    </div>
  );
};
export default Banner;
