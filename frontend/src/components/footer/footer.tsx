import { Facebook, Youtube } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-10 lg:px-[100px] px-6 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap">
          <h3 className="pr-5 text-[20px] font-bold">Đăng ký nhận tin</h3>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Nhập email của bạn"
              className="border border-gray-300 min-w-[290px] rounded-full outline-none px-4 text-sm py-2.5"
            />
            <div className="pl-5">
              <button className="px-10 py-3 rounded-full font-bold bg-red-600 text-white text-sm uppercase">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="pr-5 text-[20px] font-bold">Kết nối với chúng tôi</h3>
          <Link className="border border-black rounded-full size-[35px] flex items-center justify-center">
            <Facebook className="size-4" />
          </Link>
          <Link className="border ml-2 border-black rounded-full size-[35px] flex items-center justify-center">
            <Youtube className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default memo(Footer);
