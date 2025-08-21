import { useGetOrderById } from "@/hooks/use-order";
import formatPriceToVND from "@/utils/format-price";
import { Link, useParams } from "react-router-dom";
import Loading from "@/components/loading/loading";
import Error from "@/pages/shared/error";
import { format } from "date-fns";
import { getOrderStatusVI } from "@/utils/get-order-status-vi";
import { getPaymentMethodVi } from "@/utils/get-payment-method-vi";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOrderById(orderId!, "detail");

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div>
      <h3 className=" uppercase color-red font-medium">
        Đơn hàng: #{data?.orderCode}
      </h3>
      <p className="color-red text-sm mt-1.5">
        Đặt lúc -{" "}
        {data?.createdAt
          ? format(new Date(data.createdAt), "dd/MM/yyyy HH:mm")
          : "N/A"}
      </p>
      <div className="py-2 px-2.5  bg-[#d9edf7] my-[30px]">
        <div className="bg-white p-2.5">
          <p className=" uppercase font-bold pb-2 border-b border-[#ededed] tracking-[1px]">
            Chi tiết đơn hàng
          </p>
          <div className=" overflow-hidden border-b border-[#ededed]">
            <div className="w-full overflow-x-auto">
              <table className="w-full bg-white mb-2 ">
                <thead className="border-b border-[#ededed]">
                  <tr>
                    <th className="text-sm py-3 px-2 whitespace-nowrap min-w-[76px]"></th>
                    <th className="text-sm py-3 px-2 text-start whitespace-nowrap">
                      Sản phẩm
                    </th>
                    <th className="text-sm py-3 px-2 whitespace-nowrap">
                      Mã sản phẩm
                    </th>
                    <th className="text-sm py-3 px-2 whitespace-nowrap">
                      Đơn giá
                    </th>
                    <th className="text-sm py-3 px-2 whitespace-nowrap">
                      Số lượng
                    </th>
                    <th className="text-sm py-3 px-2 whitespace-nowrap">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data && data?.products?.length > 0 ? (
                    data.products.map((product) => {
                      return (
                        <tr key={product.productId}>
                          <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                            <div className="border border-gray-100 flex items-center justify-center p-[2px]">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="max-w-full object-contain w-[60px] h-[60px]"
                              />
                            </div>
                          </td>
                          <td className="text-sm py-2.5 px-2 align-start text-start whitespace-nowrap ">
                            <Link to={`/products/${product.slug}`}>
                              {product.title}
                            </Link>
                            <br />
                            {product.attributes && (
                              <span className="text-[12px] text-gray-500">
                                {Object.entries(product.attributes).map(
                                  ([key, value]) => {
                                    return <span key={key}>{value}</span>;
                                  }
                                )}
                              </span>
                            )}
                          </td>
                          <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                            {product.sku}
                          </td>
                          <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                            {formatPriceToVND(product.finalPrice)}
                          </td>
                          <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                            {product.quantity}
                          </td>
                          <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                            {formatPriceToVND(
                              product.finalPrice! * product.quantity
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-sm py-2.5 px-2 align-middle text-center"
                      >
                        Xảy ra lỗi!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <table className="w-full mt-2.5">
            <tbody>
              <tr>
                <td className="py-2.5 px-2 font-bold text-sm" colSpan={4}>
                  Giá sản phẩm
                </td>
                <td className="text-end py-2.5 px-2 font-bold text-sm">
                  {formatPriceToVND(data.totalPrice)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-bold text-sm" colSpan={4}>
                  Phí vận chuyển báo sau
                </td>
                <td className="text-end py-2.5 px-2 font-bold text-sm">
                  {formatPriceToVND(0)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-2 font-bold text-sm" colSpan={4}>
                  Tổng tiền
                </td>
                <td className="text-end py-2.5 px-2 font-bold text-sm">
                  {formatPriceToVND(data.totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="  lg:max-w-[50%] lg:w-[50%] w-full max-w-full">
        <h3 className=" font-semibold color-red uppercase text-[15px] py-2.5">
          Địa chỉ gửi hàng
        </h3>
        <div className="">
          <div className="px-4 py-3  bg-[#d9edf7]">
            Vận chuyển: {getOrderStatusVI(data.orderStatus)}
          </div>
          <div className="bg-white p-2.5 mb-[30px]">
            <div className="flex items-center text-sm py-2  justify-between">
              <span className="font-bold w-[35%] pr-2.5">Họ tên:</span>
              <span>{data.orderInfo.name}</span>
            </div>
            <div className="flex items-center text-sm py-2  justify-between">
              <span className="font-bold w-[35%] pr-2.5">Số điện thoại:</span>
              <span>{data.orderInfo.phoneNumber}</span>
            </div>
            <div className="flex items-center text-sm py-2  justify-between">
              <span className="font-bold w-[35%] pr-2.5">Địa chỉ:</span>
              <span>
                {[
                  data.orderInfo.address,
                  data.orderInfo.ward?.name,
                  data.orderInfo.district?.name,
                  data.orderInfo.province?.name,
                ].join(", ")}
              </span>
            </div>
            <div className="flex items-center text-sm py-2  justify-between">
              <span className="font-bold w-[35%] pr-2.5">Thanh toán:</span>
              <span>
                {data.payment.paymentStatus
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </span>
            </div>
            <div className="flex items-center text-sm py-2  justify-between">
              <span className="font-bold w-[35%] pr-2.5">Phương thức:</span>
              <span>{getPaymentMethodVi(data.payment.paymentMethod)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
