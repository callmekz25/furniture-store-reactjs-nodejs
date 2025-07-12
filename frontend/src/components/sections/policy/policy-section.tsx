import Guard from "@/assets/guard.webp";
import Refund from "@/assets/refund.webp";
import Hotline from "@/assets/hotline.webp";
const PolicySection = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 lg:gap-0 justify-between mt-6">
      <div className="flex items-center gap-2 flex-1">
        <img
          src={Guard}
          alt="Bảo hành"
          loading="lazy"
          className="size-7  object-contain"
        />
        <span className="text-sm">1 Năm Bảo Hành</span>
      </div>
      <div className="flex items-center gap-2 flex-1">
        <img
          src={Refund}
          alt="Bảo hành"
          loading="lazy"
          className="size-7  object-contain"
        />
        <span className="text-sm">
          Hỗ trợ đổi trong 3 ngày cho sản phẩm nguyên giá
        </span>
      </div>
      <div className="flex items-center justify-end gap-2 flex-1">
        <img
          src={Hotline}
          alt="Bảo hành"
          loading="lazy"
          className="size-7 object-contain"
        />
        <span className="text-sm">
          Hotline: <span className="font-bold">0123456789</span>
        </span>
      </div>
    </div>
  );
};

export default PolicySection;
