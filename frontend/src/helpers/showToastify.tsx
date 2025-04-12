import { toast } from "react-toastify";

import formatPriceToVND from "@/utils/formatPriceToVND";

export const showToastify = ({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: number;
}) => {
  toast(
    <div className=" bg-[#fdf5f6] px-4 w-full py-5 rounded-md shadow-lg border border-gray-200">
      <h3 className="color-red text-sm font-semibold line-clamp-2">
        Đã thêm vào giỏ hàng thành công!
      </h3>
      <div className="flex items-center gap-3 mt-2">
        <img
          src={image}
          alt={title}
          className="size-[65px] object-cover rounded"
        />
        <div>
          <h3 className="font-normal text-black text-sm">{title}</h3>
          <span className="text-red-600 text-[13px] font-medium">
            {formatPriceToVND(price)}
          </span>
        </div>
      </div>
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    }
  );
};

export const ToastifyError = (error: string) => {
  toast(
    <div className=" bg-red-500 px-4 w-full py-5 rounded-md shadow-lg border border-red-600">
      <span className="text-white  font-medium text-md">{error}</span>
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    }
  );
};
