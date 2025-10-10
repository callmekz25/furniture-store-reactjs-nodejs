import Loading from '@/components/loading/loading';
import { useGetOrderById } from '@/hooks/use-order';
import formatPriceToVND from '@/utils/format-price';
import { getOrderStatusVI } from '@/utils/get-order-status-vi';
import { getPaymentMethodVi } from '@/utils/get-payment-method-vi';
import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data, isLoading, isError } = useGetOrderById(orderId!, 'detail');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h3>
      <form className="grid grid-cols-5 gap-6 font-semibold">
        <div className=" col-span-3 h-fit flex flex-col gap-4 ">
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <h4>Thông tin cơ bản</h4>
            <div className="flex flex-col gap-3 text-[15px] font-medium">
              <div className="flex items-center  justify-between">
                <span>Mã đơn hàng:</span>
                <span>{data?.orderCode}</span>
              </div>
              <div className="flex items-center  justify-between">
                <span>Trạng thái đơn hàng:</span>
                <span>{getOrderStatusVI(data!.orderStatus)}</span>
              </div>
              <div className="flex items-center  justify-between">
                <span>Phương thức thanh toán:</span>
                <span>{getPaymentMethodVi(data!.payment.paymentMethod!)}</span>
              </div>
              <div className="flex items-center  justify-between">
                <span>Trạng thái thanh toán:</span>
                <span>
                  {data?.payment.paymentStatus
                    ? 'Đã thanh toán'
                    : 'Chưa thanh toán'}
                </span>
              </div>
              <div className="flex items-center  justify-between">
                <span>Tổng tiền:</span>
                <span>{formatPriceToVND(data?.totalPrice)}</span>
              </div>
            </div>
          </div>
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <h4>Thông tin sản phẩm</h4>
            <div className="flex flex-col gap-4">
              {data?.products.map((p) => {
                return (
                  <div key={p.sku} className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="size-20 object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] max-w-[400px]">
                          {p.title}
                        </span>
                        {p.attributes && (
                          <span className="text-[12px] text-gray-500">
                            {Object.entries(p.attributes).map(
                              ([key, value]) => {
                                return <span key={key}>{value}</span>;
                              }
                            )}
                          </span>
                        )}
                        <span className="text-sm font-medium">
                          Sku: {p.sku}
                        </span>
                        <span className="text-sm font-medium">
                          Số lượng: {p.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="font-semibold">
                      {formatPriceToVND(p.finalPrice! * p.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="border h-fit bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <h3>Thông tin khách hàng</h3>
            <div className="flex flex-col gap-3 text-[15px] font-medium">
              <div className="flex items-center justify-between">
                <span>Họ tên:</span>
                <span>{data?.orderInfo.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <span>{data?.orderInfo.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Sdt:</span>
                <span>{data?.orderInfo.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="min-w-[200px]">Địa chỉ:</span>
                <span>
                  {data?.orderInfo.address}, {data?.orderInfo.ward.name},{' '}
                  {data?.orderInfo.district.name},{' '}
                  {data?.orderInfo.province.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderDetail;
