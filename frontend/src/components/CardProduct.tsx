import Image from "../assets/livingRoom.png";

const Card = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-[#f6f6f6] rounded-md   flex flex-col items-center justify-center hover:cursor-pointer transition-all duration-300 relative">
        <img
          src={Image}
          alt="Áo khoác phao ấm"
          className="max-w-full object-contain  "
        />
        <div className="p-2">
          <h3 className="text-lg font-medium text-center line-clamp-2">
            Bàn ghế sồi đẹp barcelona dsamdmamdsadasm
          </h3>
          <h4 className="text-sm font-semibold text-center mt-2">499.999 đ</h4>
        </div>

        <div className="absolute top-2 left-2 text-[12px] bg-red-500 uppercase text-white font-medium rounded-sm py-1 px-2">
          -50%
        </div>
      </div>
    </div>
  );
};

export default Card;
