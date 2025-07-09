import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Guard from "../../assets/guard.webp";
import Refund from "../../assets/refund.webp";
import Hotline from "../../assets/hotline.webp";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formatPriceToVND from "@/utils/format-price";
import ProductGallery from "@/components/gallery/product-gallery";
import { useAppSelector } from "@/redux/hook";
import { addRecentlyViewedProduct } from "@/services/product.service";
import RecentlyViewProductsList from "@/components/sections/showcase/recently-view";
import ProductRating from "@/components/rates/product-rating";
import RelatedProducts from "@/components/sections/showcase/related-products";
import Loading from "@/components/loading/loading";
import { CustomToastify, ToastifyError } from "@/helpers/custom-toastify";
import ProductVariants from "@/components/variants/product-variants";
import Error from "../shared/error";
import { useAddToCart } from "@/hooks/use-cart";
import { useQueryClient } from "@tanstack/react-query";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import ICartItems from "@/interfaces/cart/cart-items.interface";
import { useGetProductBySlug } from "@/hooks/use-product";
import checkQuantity from "@/utils/check-quantity";

const ProductDetail = () => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isTabDescr, setIsTabDescr] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] =
    useState<ISelectedVariant | null>(null);
  const navigate = useNavigate();
  const { isOpen } = useAppSelector((state) => state.cart);
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { slug } = useParams<string>();
  const { data: product, isLoading, error } = useGetProductBySlug(slug!);

  useEffect(() => {
    if (!product) return;
    addRecentlyViewedProduct(product);
  }, [product]);

  // Submit add cart
  const handleAddCart = async (redirect: boolean) => {
    if (!product) return;

    const data: ICartItems = {
      productId: product._id!,
      title: product.title,
      quantity,
      image: selectedVariant
        ? (selectedVariant.images[0] as string)
        : (product.images[0] as string),
      price: selectedVariant ? selectedVariant.price : product.price,
      slug: product.slug,
      attributes: selectedVariant ? selectedVariant.attributes : null,
    };

    addToCart(data, {
      onSuccess: (data) => {
        if (redirect) navigate("/cart");
        else
          CustomToastify({
            image: selectedVariant
              ? (selectedVariant.images[0] as string)
              : (product.images[0] as string),
            price: selectedVariant ? selectedVariant.price : product.price,
            title: product.title,
          });
        queryClient.setQueryData(["cart"], data);
      },
      onError: (error) => ToastifyError(error.message),
    });
  };

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
  // Group images variants to 1 array
  const allImages =
    product?.variants?.flatMap((variant: ISelectedVariant) => variant.images) ??
    [];

  console.log(selectedVariant);

  if (error) {
    return <Error />;
  }

  return (
    <div className="pt-6 pb-10 break-point ">
      {isPending && <Loading />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="flex lg:flex-row flex-col gap-4">
            <div className="lg:w-[45%] flex justify-center items-center lg:sticky lg:top-4 h-fit  bg-white  ">
              {product &&
                (product.images && product.images.length > 0 ? (
                  <ProductGallery images={product.images} />
                ) : product.variants && product.variants.length > 0 ? (
                  <ProductGallery
                    images={allImages as string[]}
                    activeVariant={selectedVariant}
                  />
                ) : (
                  <img
                    className=" object-contain w-full"
                    loading="lazy"
                    src="https://theme.hstatic.net/200000796751/1001266995/14/no_image.jpg?v=91"
                    alt={product.title}
                  />
                ))}
            </div>
            <div className=" lg:w-[55%]">
              <div className="bg-white px-4  py-5">
                <h3 className="text-2xl font-bold">{product!.title}</h3>
                <div className="flex items-center gap-3 mt-2 flex-wrap  text-sm font-normal">
                  <div className="flex items-center gap-1">
                    <span>Mã sản phẩm:</span>
                    {product.variants?.length > 0 && selectedVariant ? (
                      <span className="font-bold text-red-500">
                        {selectedVariant.sku}
                      </span>
                    ) : (
                      product?.sku && (
                        <span className="font-bold text-red-500">
                          {product.sku}
                        </span>
                      )
                    )}
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1">
                    <span>Tình trạng:</span>
                    <span className="font-bold text-red-500">
                      {product.variants?.length > 0 && selectedVariant
                        ? selectedVariant.quantity > 0
                          ? "Còn hàng"
                          : "Hết hàng"
                        : product.quantity > 0
                        ? "Còn hàng"
                        : "Hết hàng"}
                    </span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1">
                    <span>Thương hiệu:</span>
                    <span className="font-bold text-red-500 uppercase">
                      {product!.brand}
                    </span>
                  </div>
                </div>
                <div className="flex items-center py-4 mt-4 bg-[#fafafa] px-4">
                  <span className="text-sm font-semibold lg:block hidden min-w-[100px]">
                    Giá:
                  </span>
                  <div className="flex items-center gap-4">
                    {selectedVariant && selectedVariant.price ? (
                      <span className="font-bold lg:text-3xl  text-[22px] text-red-500">
                        {formatPriceToVND(selectedVariant.price)}
                      </span>
                    ) : (
                      <span className="font-bold lg:text-3xl  text-[22px] text-red-500">
                        {formatPriceToVND(product!.price)}
                      </span>
                    )}
                  </div>
                </div>
                {product && (
                  <ProductVariants
                    variants={product.variants ?? []}
                    onSelectVariant={setSelectedVariant}
                  />
                )}

                <div className=" items-center gap-20 px-4 mt-6 lg:flex hidden">
                  <span className="text-sm font-semibold">Số lượng:</span>
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
                  {checkQuantity(product) ? (
                    <>
                      <button
                        onClick={() => handleAddCart(false)}
                        disabled={!checkQuantity(product)}
                        className={`border transition-all duration-500 hover:opacity-80 border-red-500 rounded px-4 py-2.5  items-center justify-center uppercase font-bold w-full text-red-500 ${
                          checkQuantity(product) ? "flex" : "hidden"
                        }`}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        onClick={() => handleAddCart(true)}
                        disabled={!checkQuantity(product)}
                        className={`border transition-all duration-500 hover:opacity-80 font-bold  bg-[#ff0000] text-white rounded px-4 py-[11px] uppercase flex items-center justify-center w-full ${
                          checkQuantity(product) ? "flex" : "hidden"
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
                  <div className="break-point px-4 flex items-center gap-2  w-full">
                    <div className="flex w-[140px] items-center  ">
                      <button className="border border-gray-100 flex items-center justify-center p-1.5 size-10 bg-[#f3f4f4] ">
                        <MinusIcon className="size-4 " />
                      </button>
                      <p className="border h-10 w-12 flex items-center justify-center font-semibold border-gray-100 px-4 py-1 text-sm ">
                        {quantity}
                      </p>
                      <button className="border border-gray-100 flex items-center justify-center p-1.5 size-10  bg-[#f3f4f4]">
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                    {checkQuantity(product) ? (
                      <button
                        onClick={() => handleAddCart(false)}
                        style={{ width: "calc(100% - 140px)" }}
                        className="border  transition-all duration-500 hover:opacity-80 font-medium text-sm  bg-[#ff0000] text-white rounded px-4 py-2.5 uppercase flex items-center justify-center w-full"
                      >
                        Thêm vào giỏ
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
                      Hotline: <span className="font-bold">0899348258</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white px-4 py-2 ">
                <ul className="flex items-center gap-10 border-b border-gray-300 py-3">
                  <li
                    className={`font-semibold text-md ${
                      isTabDescr ? "color-red " : ""
                    }`}
                  >
                    <button
                      onClick={() => {
                        setIsExpand(false);
                        setIsTabDescr(true);
                      }}
                    >
                      Mô tả sản phẩm
                    </button>
                  </li>
                  <li
                    className={`font-semibold text-md ${
                      isTabDescr ? " " : "color-red"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setIsExpand(false);
                        setIsTabDescr(false);
                      }}
                    >
                      Đánh giá
                    </button>
                  </li>
                </ul>
                <div
                  className={`overflow-hidden min-w-full py-4 text-sm transition-all duration-500 product-description  ease-out relative ${
                    isExpand ? "max-h-[1000px]" : "max-h-[230px]"
                  } `}
                >
                  {isTabDescr ? (
                    <>
                      {product?.descr ? (
                        <div
                          className="whitespace-pre-wrap text-sm "
                          dangerouslySetInnerHTML={{ __html: product?.descr }}
                        />
                      ) : (
                        <span className="">Chưa có mô tả cho sản phẩm này</span>
                      )}
                    </>
                  ) : (
                    product &&
                    product?._id && <ProductRating productId={product._id} />
                  )}

                  <div
                    className={`absolute bottom-0 transition-all duration-300 left-0 w-full h-20 bg-gradient-to-t from-white via-white/80 to-transparent ${
                      isExpand ? "opacity-0 hidden" : "opacity-100 block"
                    } ${isTabDescr && !product?.descr ? "hidden" : ""} `}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className={`flex transition-all duration-300 hover:bg-red-700 hover:text-white items-center color-red gap-2 border rounded border-red-600 px-3 py-1.5 text-sm ${
                      isTabDescr && !product?.descr ? "hidden" : ""
                    } `}
                    onClick={() => setIsExpand((prev) => !prev)}
                  >
                    {isExpand ? (
                      <>
                        <MinusIcon className="size-4" />
                        Rút gọn
                      </>
                    ) : (
                      <>
                        <PlusIcon className="size-4" />
                        Hiển thị thêm
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          {product && product._id && (
            <RelatedProducts
              id={product._id}
              title="Xem thêm sản phẩm tương tự"
            />
          )}
          <RecentlyViewProductsList />
        </>
      )}
    </div>
  );
};

export default memo(ProductDetail);
