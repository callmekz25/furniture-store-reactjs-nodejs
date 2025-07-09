import IProduct from "@/interfaces/product/product.interface";
import formatPriceToVND from "@/utils/format-price";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import getProductImages from "@/utils/get-images";
import { CustomToastify } from "@/helpers/custom-toastify";
import generateCartItem from "@/utils/generate-cart-item";
import { useAddToCart } from "@/hooks/use-cart";
import { useQueryClient } from "@tanstack/react-query";
import ICartItems from "@/interfaces/cart/cart-items.interface";
import getPrice from "@/utils/get-price";
import checkQuantity from "@/utils/check-quantity";
const Card = ({ product }: { product: IProduct }) => {
  const queryClient = useQueryClient();
  const [isHover, setIsHover] = useState<boolean>(false);

  const { isPending, mutate: addToCart } = useAddToCart();

  const handleAddCart = async () => {
    const request: ICartItems = generateCartItem(product);
    addToCart(request, {
      onSuccess: (data) => {
        queryClient.setQueryData(["cart"], data);
        CustomToastify({
          title: product.title,
          image: request.image,
          price: request.price,
        });
      },
    });
  };
  const images = getProductImages(product);

  return (
    <>
      <div className="flex flex-col gap-2 bg-white  w-full h-full card-product rounded transition-all duration-500  overflow-hidden ">
        <div
          className=" overflow-hidden   flex flex-col relative items-center justify-center  h-full "
          onMouseEnter={() => {
            if (images.length > 1) {
              setIsHover(true);
            }
          }}
          onMouseLeave={() => {
            if (images.length > 1) {
              setIsHover(false);
            }
          }}
        >
          <Link
            to={`/products/${product.slug}`}
            className="flex w-full  overflow-hidden hover:cursor-pointer "
          >
            {Array.isArray(images) && images.length > 0 ? (
              images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={product.title}
                  loading="lazy"
                  className="max-w-full p-1.5 min-w-full aspect-square ease-linear   object-cover transition-all duration-300"
                  style={{
                    transform: isHover ? "translateX(-100%)" : "translateX(0)",
                  }}
                />
              ))
            ) : (
              <div className="">
                <picture>
                  <source
                    media="(max-width: 480px)"
                    srcSet="https://theme.hstatic.net/200000796751/1001266995/14/no_image.jpg?v=91"
                  />
                  <source
                    media="(min-width: 481px)"
                    srcSet="https://theme.hstatic.net/200000796751/1001266995/14/no_image.jpg?v=91"
                  />
                  <img
                    className=""
                    loading="lazy"
                    src="https://theme.hstatic.net/200000796751/1001266995/14/no_image.jpg?v=91"
                    alt={product.title}
                  />
                </picture>
              </div>
            )}
          </Link>

          <div className="flex flex-col flex-1  lg:px-[14px] lg:py-2.5 p-[5px] w-full  ">
            <Link to={`products/${product.slug}`} className="flex flex-col ">
              <h2 className="text-center uppercase mb-1 font-mednum text-[12px] text-gray-500">
                {product.brand}
              </h2>
              <p className="text-sm font-medium text-center line-clamp-2 overflow-hidden mb-1.5  min-h-[40px]">
                {product.title}
              </p>
            </Link>
            <p className="flex items-center flex-wrap gap-1 justify-center pb-0 lg:pb-2  line-clamp-1 ">
              <span
                className={`lg:text-sm md:text-sm text-[13px] font-bold text-center `}
              >
                {formatPriceToVND(getPrice(product))}
              </span>
            </p>
            <div className="flex items-center justify-center mt-auto">
              <button
                name="Thêm vào giỏ"
                disabled={isPending || !checkQuantity(product)}
                onClick={() => handleAddCart()}
                className={`flex transition-all duration-300 h-[35px]  hover:border-red-700 hover:border relative uppercase items-center gap-2 text-[12px] font-semibold rounded-full py-2 pl-4 pr-8  ${
                  !checkQuantity(product)
                    ? "opacity-60 pointer-events-none border-none"
                    : ""
                }`}
              >
                {checkQuantity(product) ? "Thêm vào giỏ" : "Hết hàng"}
                <ShoppingBagIcon className="size-4 absolute top-[50%] right-1.5 -translate-y-1/2" />
              </button>
            </div>
          </div>
          {/* {product && product.discount > 0 && (
            <div className="absolute top-2 left-2 text-[12px] bg-[#ff0000] uppercase text-white font-medium rounded-sm py-1 px-2">
              -{product.discount}%
            </div>
          )} */}
          {product && !checkQuantity(product) && (
            <div className=" absolute top-2 left-2 text-[11px] bg-[#565656] font-medium text-white rounded-[3px] py-[3px] px-[5px]">
              Hết hàng
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Card);
