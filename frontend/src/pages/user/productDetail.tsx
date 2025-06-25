import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Guard from "../../assets/guard.webp";
import Refund from "../../assets/refund.webp";
import Hotline from "../../assets/hotline.webp";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formatPriceToVND from "@/utils/formatPriceToVND";
import ProductGallery from "@/components/product/productGallery";
import { useAppSelector } from "@/redux/hook";
import { addRecentlyViewedProduct } from "@/services/productService";
import RecentlyViewProductsList from "@/components/product/recentlyViewProducts";
import ReviewSection from "@/components/product/reviewSection";
import RelatedProducts from "@/components/product/relatedProducts";
import Loading from "@/components/loading/loading";
import { showToastify, ToastifyError } from "@/helpers/showToastify";
import ProductVariants from "@/components/product/productVariants";
import Error from "../shared/error";
import { useAddToCart } from "@/hooks/cart";
import ICart from "@/interfaces/cart.interface";
import { useQueryClient } from "@tanstack/react-query";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { useGetOne } from "@/hooks/useGet";
import IProduct from "@/interfaces/product/product.interface";

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
  const {
    data: product,
    isLoading,
    error,
  } = useGetOne<IProduct>("/products", ["products", slug!], false, slug!, {
    enabled: !!slug,
  });

  useEffect(() => {
    if (!product) return;
    addRecentlyViewedProduct(product);
  }, [product]);

  // Submit add cart
  const handleAddCart = async (redirect: boolean) => {
    if (!product) return;

    const data: ICart = {
      productId: product._id!,
      title: product.title,
      quantity,
      image: selectedVariant
        ? (selectedVariant.images[0] as string)
        : (product.images[0] as string),
      price: selectedVariant ? selectedVariant.price : product.price,
      fakePrice: selectedVariant
        ? selectedVariant.fakePrice
        : product.fakePrice,
      slug: product.slug,
      discount: product.discount,
      attributes: selectedVariant ? selectedVariant.attributes : null,
    };

    addToCart(data, {
      onSuccess: (data) => {
        if (redirect) navigate("/cart");
        else
          showToastify({
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

  if (error) {
    return <Error />;
  }

  return (
    <div className="pt-6 pb-32 break-point ">
      {isPending && <Loading />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="flex lg:flex-row flex-col gap-4">
            <div className="lg:w-[45%] flex justify-center items-center lg:sticky lg:top-4 h-fit  bg-white  ">
              {product ? (
                product.images && product.images.length > 0 ? (
                  <ProductGallery images={product.images} />
                ) : product.variants && product.variants.length > 0 ? (
                  <ProductGallery
                    images={allImages as string[]}
                    activeVariant={selectedVariant}
                  />
                ) : (
                  "No images"
                )
              ) : (
                "No images"
              )}
            </div>
            <div className=" lg:w-[55%]">
              <div className="bg-white px-4  py-5">
                <h3 className="text-2xl font-bold">{product!.title}</h3>
                <div className="flex items-center gap-3 mt-2 flex-wrap  text-sm font-normal">
                  <div className="flex items-center gap-1">
                    <span>Mã sản phẩm:</span>
                    {selectedVariant && selectedVariant.sku && (
                      <span className="font-bold text-red-500">
                        {selectedVariant.sku}
                      </span>
                    )}
                    {product && product.sku && (
                      <span className="font-bold text-red-500">
                        {product.sku}
                      </span>
                    )}
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1">
                    <span>Tình trạng:</span>
                    <span className="font-bold text-red-500">
                      {product!.status ? "Còn hàng" : "Hết hàng"}
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

                    {selectedVariant &&
                    selectedVariant.fakePrice &&
                    product!.discount > 0 ? (
                      <span className=" lg:text-lg  text-[16px] line-through text-gray-400">
                        {formatPriceToVND(selectedVariant.fakePrice)}
                      </span>
                    ) : (
                      ""
                    )}
                    {product && product.fakePrice && product.discount > 0 ? (
                      <span className=" lg:text-lg  text-[16px] line-through text-gray-400">
                        {formatPriceToVND(product.fakePrice)}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {product && product.variants.length > 0 && (
                  <ProductVariants
                    variants={product.variants}
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
                  <button
                    onClick={() => handleAddCart(false)}
                    className="border transition-all duration-500 hover:opacity-80 border-red-500 rounded px-4 py-2.5 flex items-center justify-center w-full text-red-500"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={() => handleAddCart(true)}
                    className="border transition-all duration-500 hover:opacity-80 font-medium  bg-[#ff0000] text-white rounded px-4 py-2.5 flex items-center justify-center w-full"
                  >
                    Mua ngay
                  </button>
                </div>
                {/* Mobile add cart */}
                <div
                  className={`flex lg:hidden items-center z-50  left-0  py-2 border-t border-gray-200 bg-white w-full font-semibold fixed bottom-0 ${
                    isOpen ? "hidden" : "flex"
                  }`}
                >
                  <div className="break-point px-4 flex items-center  w-full">
                    <div className="flex w-[140px] items-center  ">
                      <button className="border border-gray-100 flex items-center justify-center p-1.5 size-10 bg-[#f9f9f9]">
                        <MinusIcon className="size-4" />
                      </button>
                      <p className="border h-10 w-12 flex items-center justify-center font-semibold border-gray-100 px-4 py-1 text-sm ">
                        {quantity}
                      </p>
                      <button className="border border-gray-100 flex items-center justify-center p-1.5 size-10  bg-[#f9f9f9]">
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddCart(false)}
                      style={{ width: "calc(100% - 140px)" }}
                      className="border  transition-all duration-500 hover:opacity-80 font-medium text-sm  bg-[#ff0000] text-white rounded px-4 py-2.5 uppercase flex items-center justify-center w-full"
                    >
                      Thêm vào giỏ
                    </button>
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
                    product?._id && <ReviewSection productId={product._id} />
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
          {product && product.slug && (
            <RelatedProducts
              slug={product.slug}
              title="Xem thêm sản phẩm cùng loại"
            />
          )}
          <RecentlyViewProductsList />
        </>
      )}
    </div>
  );
};

export default memo(ProductDetail);
