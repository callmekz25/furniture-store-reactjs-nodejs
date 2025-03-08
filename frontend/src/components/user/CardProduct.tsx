import IProduct from "@/interfaces/product.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "@/hooks/useCart";
import ICart from "@/interfaces/cart.interface";
import { useAppDispatch } from "@/redux/hook";
import { openFlyoutCart } from "@/redux/slices/flyout-cart.slice";
const Card = ({ product }: { product: IProduct }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { addToCart } = useCart();
  const dispatch = useAppDispatch();

  const handleAddCart = async (data: ICart) => {
    await addToCart(data);
    dispatch(openFlyoutCart());
  };
  if (!product || !product.images) {
    return <p>Loading....</p>;
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full card-product rounded transition-all duration-500  overflow-hidden">
      <div
        className="bg-white overflow-hidden   flex flex-col relative items-center justify-center  h-full "
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link
          to={`/products/${product.slug}`}
          className="flex w-full overflow-hidden hover:cursor-pointer "
        >
          <img
            src={product?.images[0]}
            alt={product.title}
            className="max-w-full object-contain min-w-full transition-all duration-300"
            style={{
              transform: isHover ? "translateX(-100%)" : "translateX(0)",
            }}
          />
          <img
            src={product?.images[1]}
            alt={product.title}
            className="max-w-full object-contain min-w-full transition-all duration-300"
            style={{
              transform: isHover ? "translateX(-100%)" : "translateX(0)",
            }}
          />
        </Link>

        <div className="flex flex-col flex-1  px-3.5 py-3 w-full  ">
          <Link to={`products/${product.slug}`} className="flex flex-col ">
            <h2 className="text-center uppercase mb-1 font-mednum text-[12px] text-gray-500">
              {product.brand}
            </h2>
            <p className="text-sm font-medium text-center line-clamp-2 overflow-hidden mb-1.5  min-h-[40px]">
              {product.title}
            </p>
          </Link>
          <p className="flex items-center flex-wrap gap-2 justify-center pb-0 lg:pb-2.5  ">
            <span className="text-sm font-bold text-center text-red-600">
              {formatPriceToVND(product.price)}
            </span>
            <span className="text-sm font-normal text-center text-gray-400 line-through">
              {product.fakePrice > 0 ? formatPriceToVND(product.fakePrice) : ""}
            </span>
          </p>
          <div className="flex items-center justify-center mt-auto">
            <button
              name="Thêm vào giỏ"
              onClick={() =>
                handleAddCart({ productId: product._id, quantity: 1 })
              }
              className="flex transition-all duration-300 h-[35px]  hover:border-red-700 hover:border relative uppercase items-center gap-2 text-[12px] font-semibold rounded-full py-2 pl-4 pr-8 "
            >
              Thêm vào giỏ
              <ShoppingBagIcon className="size-4 absolute top-[50%] right-1.5 -translate-y-1/2" />
            </button>
          </div>
        </div>
        <div className="absolute top-2 left-2 text-[12px] bg-red-500 uppercase text-white font-medium rounded-sm py-1 px-2">
          -50%
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
