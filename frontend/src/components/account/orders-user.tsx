import { useGetUser } from '@/hooks/use-account';
import { useGetOrderByUserId } from '@/hooks/use-order';
import formatPriceToVND from '@/utils/format-price';
import { getOrderStatusVI } from '@/utils/get-order-status-vi';
import { format } from 'date-fns';
import Loading from '../loading/loading';
import { Link } from 'react-router-dom';

const OrdersUser = () => {
  const {
    data: orders,
    isLoading: ilo,
    error: errOrders,
  } = useGetOrderByUserId();
  const { data: user, isLoading, error } = useGetUser();

  if (isLoading || ilo) {
    return <Loading />;
  }
  if (error || errOrders) {
    return <p className="font-medium ">Xảy ra lỗi. Vui lòng thử lại sau</p>;
  }
  return (
    <div>
      <h3 className=" text-[15px] uppercase font-bold mb-2.5 tracking-[1px] py-3 border-b border-gray-200">
        Thông tin tài khoản
      </h3>
      <ul className="flex flex-col gap-2 font-normal text-sm">
        <li className="color-red font-medium text-[16px]">{user?.name}</li>
        <li className=" font-normal text-sm"> {user?.email}</li>
      </ul>

      <div className="py-2 px-2.5 bg-[#d9edf7] my-[30px]">
        <div className="bg-white p-2.5">
          <p className=" uppercase font-bold pb-2 border-b border-[#ededed] tracking-[1px]">
            Danh sách đơn hàng mới nhất
          </p>
          <div className=" overflow-hidden">
            <div className="w-full overflow-x-auto ">
              <table className="w-full bg-white ">
                <thead className="border-b border-[#ededed]">
                  <tr>
                    <th className="text-sm py-2.5 px-2 whitespace-nowrap">
                      Mã đơn hàng
                    </th>
                    <th className="text-sm py-2.5 px-2 whitespace-nowrap">
                      Ngày đặt
                    </th>
                    <th className="text-sm py-2.5 px-2 whitespace-nowrap">
                      Thành tiền
                    </th>
                    <th className="text-sm py-2.5 px-2 whitespace-nowrap">
                      Trạng thái thanh toán
                    </th>
                    <th className="text-sm py-2.5 px-2 whitespace-nowrap">
                      Vận chuyển
                    </th>
                    <th className="text-sm py-2.5 px-2 whitespace-nowrap">
                      Chi tiết
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full bg-white">
                  <tbody>
                    {orders && orders?.length > 0 ? (
                      orders.map((order) => {
                        return (
                          <tr key={order._id}>
                            <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                              <Link to={`/account/orders/${order._id}`}>
                                #{order.orderCode ?? 'N/A'}
                              </Link>
                            </td>
                            <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                              {order.createdAt
                                ? format(
                                    new Date(order.createdAt),
                                    'dd/MM/yyyy'
                                  )
                                : 'N/A'}
                            </td>
                            <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                              {formatPriceToVND(order.totalPrice)}
                            </td>
                            <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                              {order.payment.paymentStatus
                                ? 'Đã thanh toán'
                                : 'Chưa thanh toán'}
                            </td>
                            <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                              {getOrderStatusVI(order.orderStatus)}
                            </td>
                            <td className="text-sm py-2.5 px-2 align-middle text-center whitespace-nowrap">
                              <Link to={`/account/orders/${order._id}`}>
                                Xem chi tiết
                              </Link>
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
                          Chưa có đơn hàng nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersUser;
