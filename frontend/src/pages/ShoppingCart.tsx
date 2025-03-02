import Layout from "@/layouts";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Newsletter from "@/components/newsLetter";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/cartPageContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/api/cart";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { getProductBySlug } from "@/api/product";
import { Link } from "react-router-dom";
const ShoppingCart = () => {
  const { setIsCartPage } = useContext(PageContext);
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 30,
  });

  // Kiểm tra nếu user đang ở trang cart
  useEffect(() => {
    setIsCartPage(true);
    return () => setIsCartPage(false);
  }, [setIsCartPage]);
  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <Layout>
      <div className="lg:px-[100px] px-6 lg:py-20 py-6 ">
        <div className="py-20 flex lg:flex-row flex-col gap-6">
          <div
            style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.08)" }}
            className="flex flex-col bg-white lg:w-[65%] w-full h-fit  rounded-md lg:p-6 p-3 "
          >
            <h3 className="font-semibold text-2xl mb-4">Giỏ hàng của bạn</h3>
            {/* Product */}

            {cartData.items.length > 0 ? (
              cartData.items.map((item: any) => {
                return (
                  <div
                    className="flex items-start justify-between  pb-3 border-b border-gray-300"
                    key={item.product._id}
                  >
                    <div className="flex  lg:gap-4 gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="flex items-center relative justify-center h-fit  flex-shrink-0 flex-grow-0 md:basis-[85px] md:max-w-[85px] max-w-[60px] basis-[60px]  border border-gray-200"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="object-contain max-w-full "
                        />
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="size-5 bg-gray-400 text-[8px] text-white rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                        >
                          Xóa
                        </button>
                      </Link>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold lg:text-lg line-clamp-1 pr-4">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2 lg:line-clamp-none">
                          Nâu vàng / 1m2x60cm
                        </p>
                        <span className="font-medium  text-[17px] text-gray-500">
                          {formatPriceToVND(item.product.price)}
                        </span>
                        <span className="font-medium line-through text-sm text-gray-500">
                          {formatPriceToVND(item.product.fakePrice)}
                        </span>
                      </div>
                    </div>
                    <div className="flex lg:gap-6 justify-between items-start">
                      <div className="flex flex-col gap-4">
                        <span className="font-semibold lg:text-lg text-[16px] text-red-600">
                          {formatPriceToVND(item.product.price * item.quantity)}
                        </span>
                        <div className="flex items-center gap-3 justify-between border border-gray-200 rounded px-3 py-1">
                          <button>
                            <MinusIcon className="size-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button>
                            <PlusIcon className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>No data</span>
            )}
          </div>
          {/* Oder summary */}
          <div
            className="p-6 bg-white  rounded-md flex-1 h-fit"
            style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.08)" }}
          >
            <h3 className="font-semibold text-2xl">Thông tin đơn hàng</h3>
            <div className="flex items-center justify-between py-6">
              <span className="font-semibold">Tổng tiền</span>
              <span className="font-semibold text-xl text-red-500">
                2.300.000đ
              </span>
            </div>
            <ul className="flex flex-col gap-2 text-sm list-disc px-4">
              <li>Phí vận chuyển sẽ được tính ở trang Thanh toán</li>
              <li>Mã giảm giá được nhập ở trang Thanh toán</li>
            </ul>
            <button className="py-2.5 px-4 flex items-center justify-center bg-red-500 text-white font-medium w-full rounded mt-10">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
    </Layout>
  );
};

export default ShoppingCart;
