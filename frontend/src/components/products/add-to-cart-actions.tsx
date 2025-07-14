import { CustomToastify } from "@/helpers/custom-toastify";
import { useAddToCart } from "@/hooks/use-cart";
import { useIsMobile } from "@/hooks/use-mobile";
import ICartItems from "@/interfaces/cart/cart-items.interface";
import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { useAppSelector } from "@/redux/hook";
import checkInStock from "@/utils/check-instock";
import getFinalPrice from "@/utils/get-final-price";
import getPrice from "@/utils/get-price";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddToCartActions = ({
  product,
  selectedVariant,
}: {
  product: IProduct;
  selectedVariant: ISelectedVariant;
}) => {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { isOpen } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const isMobileScreen = useIsMobile();

  const plusQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const minusQuantity = () => {
    if (quantity <= 1) {
      return;
    } else {
      setQuantity((prev) => prev - 1);
    }
  };
  // Submit add cart
  const handleAddCart = async (redirect: boolean) => {
    if (!product) return;
    const image = selectedVariant
      ? (selectedVariant.images[0] as string)
      : (product.images[0] as string);
    const price = product.promotion
      ? getFinalPrice(product, selectedVariant)
      : getPrice(product, selectedVariant);
    const data: ICartItems = {
      productId: product._id!,
      title: product.title,
      collections: product.collections,
      quantity,
      price: product.price,
      image: image,
      slug: product.slug,
      attributes: selectedVariant ? selectedVariant.attributes : null,
    };

    addToCart(data, {
      onSuccess: () => {
        if (redirect) navigate("/cart");
        else {
          if (!isMobileScreen) {
            CustomToastify({
              image: image,
              price: price,
              title: product.title,
            });
          }
          queryClient.invalidateQueries({
            queryKey: ["cart"],
          });
        }
      },
      onError: () => toast.error("Oops xảy ra lỗi"),
    });
  };
  return (
    <div>
      <div className=" items-center  px-4 mt-6 lg:flex hidden">
        <span className="text-sm font-semibold min-w-[100px]">Số lượng:</span>
        <div className="flex items-center ">
          <button
            onClick={() => minusQuantity()}
            className="border border-gray-100 p-2  bg-[#f9f9f9]"
          >
            <MinusIcon className="size-4" />
          </button>
          <span className="border font-semibold border-gray-100 px-4 py-1.5 text-sm ">
            {quantity}
          </span>
          <button
            onClick={() => plusQuantity()}
            className="border border-gray-100 p-2  bg-[#f9f9f9]"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>
      </div>
      <div className="lg:flex items-center hidden gap-4 mt-6 font-medium">
        {checkInStock(product) ? (
          <>
            <button
              onClick={() => handleAddCart(false)}
              disabled={!checkInStock(product) || isPending}
              className={`border transition-all duration-500 hover:opacity-80 border-red-500 rounded px-4 py-2.5  items-center justify-center uppercase font-bold w-full text-red-500 ${
                checkInStock(product) ? "flex" : "hidden"
              }`}
            >
              Thêm vào giỏ
            </button>
            <button
              onClick={() => handleAddCart(true)}
              disabled={!checkInStock(product) || isPending}
              className={`border transition-all duration-500 hover:opacity-80 font-bold  bg-[#ff0000] text-white rounded px-4 py-[11px] uppercase flex items-center justify-center w-full ${
                checkInStock(product) ? "flex" : "hidden"
              }`}
            >
              Mua ngay
            </button>
          </>
        ) : (
          <button
            disabled
            className="border border-gray-500  rounded-sm uppercase px-3 text-[#929292] text-[15px] font-bold py-2.5 w-full "
          >
            Hết hàng
          </button>
        )}
      </div>
      {/* Mobile add cart */}
      <div
        className={`flex lg:hidden items-center z-50  left-0  py-2 border-t border-gray-200 bg-white w-full font-semibold fixed bottom-0 ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <div className="break-point px-2 flex items-center gap-2  w-full">
          <div className="flex w-[140px] items-center  ">
            <button
              onClick={() => minusQuantity()}
              className="border border-gray-100 flex items-center justify-center p-1.5 size-10 bg-[#f3f4f4] "
            >
              <MinusIcon className="size-4 " />
            </button>
            <p className="border h-10 w-12 flex items-center justify-center font-semibold border-gray-100 px-4 py-1 text-sm ">
              {quantity}
            </p>
            <button
              onClick={() => plusQuantity()}
              className="border border-gray-100 flex items-center justify-center p-1.5 size-10  bg-[#f3f4f4]"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
          {checkInStock(product) ? (
            <button
              onClick={() => handleAddCart(false)}
              style={{ width: "calc(100% - 140px)" }}
              disabled={isPending}
              className={`border   transition-all duration-500 hover:opacity-80 font-semibold text-sm  bg-[#ff0000] text-white rounded px-4 py-2.5 gap-2 uppercase flex items-center justify-center w-full ${
                isPending ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              Thêm vào giỏ
              {isPending && (
                <Loader2 className="animate-spin size-[18px]  text-white" />
              )}
            </button>
          ) : (
            <button
              disabled
              className="border border-gray-500  rounded uppercase px-[15px] text-[#929292] text-[13px] font-medium h-[40px] w-full "
            >
              Hết hàng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCartActions;
