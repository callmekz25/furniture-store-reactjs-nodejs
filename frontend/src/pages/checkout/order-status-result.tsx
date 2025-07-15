import SuccessAnimation from "@/components/animations/success-animation";
import Loading from "@/components/loading/loading";
import { Button } from "@/components/ui/button";
import { useGetOrderStatus } from "@/hooks/use-order";
import { ArrowRightIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const OrderStatusResult = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderStatus(orderId!);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {isLoading && <Loading />}
      <div className="flex flex-col items-center ">
        <SuccessAnimation />
        <div className="flex flex-col items-center z-50">
          <h2 className="text-green-600 text-center text-2xl font-bold mt-4">
            Đặt hàng thành công
          </h2>
          <p className="mt-2 font-medium">Mã đơn hàng: 032031</p>
          <p className="mt-2 text-xl font-bold text-center">
            Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi.
          </p>
          <p className="text-gray-500 mt-2 font-medium text-center max-w-md">
            Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn. Mọi
            thông tin chi tiết sẽ được cập nhật trong tài khoản của bạn.
          </p>
          <Link to="/account" className="mt-6">
            <Button className="bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-linear text-black font-semibold flex items-center gap-2">
              Xem đơn hàng
              <ArrowRightIcon className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusResult;
