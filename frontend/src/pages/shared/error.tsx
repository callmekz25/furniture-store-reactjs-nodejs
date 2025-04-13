import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col break-point">
      <h3 className="text-[170px] text-white font-bold text-shadow">404</h3>
      <h4 className="text-[40px] color-red  font-bold">Không tìm thấy trang</h4>
      <p className="mt-4 max-w-[520px] text-center">
        Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, thay đổi link hoặc
        chưa bao giờ tồn tại.
      </p>
      <Link
        to="/"
        className="py-2 px-6 mt-7 rounded-full bg-red-700 text-white font-medium"
      >
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default Error;
