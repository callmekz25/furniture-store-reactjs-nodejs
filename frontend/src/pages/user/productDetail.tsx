import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Guard from "../../assets/guard.webp";
import Refund from "../../assets/refund.webp";
import Hotline from "../../assets/hotline.webp";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductBySlug from "@/hooks/useProductBySlug";
import formatPriceToVND from "@/utils/formatPriceToVND";
import ICart from "@/interfaces/cart.interface";
import ProductGallery from "@/components/user/productGallery";
import useCart from "@/hooks/useCart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { openFlyoutCart } from "@/redux/slices/flyout-cart.slice";
import { addRecentlyViewedProduct } from "@/api/productService";
import RecentlyViewProductsList from "@/components/user/recentlyViewProducts";
import ReviewSection from "@/components/user/reviewSection";
import { shallowEqual } from "react-redux";
import RelatedProducts from "@/components/user/relatedProducts";
import Loading from "@/components/user/loading";
import getFakePrice from "@/utils/getFakePrice";

const ProductDetail = () => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isTabDescr, setIsTabDescr] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const [selectedVariant, setSelectedVariant] = useState({});
  const [activeVariant, setActiveVariant] = useState(null);
  // Redux flyout cart
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.cart, shallowEqual);

  // Custom hook xử lý cart
  const { addToCart } = useCart();
  const { slug } = useParams<string>();
  const { data: product, isLoading, error } = useProductBySlug(slug);

  useEffect(() => {
    if (!product) return;

    addRecentlyViewedProduct(product);

    // Set variant chỉ khi product thực sự thay đổi
    if (product.variants?.length > 0) {
      setSelectedVariant(product.variants[0].attributes);
      setActiveVariant(product.variants[0]);
    } else {
      setSelectedVariant({});
      setActiveVariant(null);
    }
  }, [product]);

  // Submit add cart
  const onSubmitAddCart = async () => {
    if (!product) return;
    try {
      let attributes: string[] = [];
      let image: string = product.images[0];
      let price: number = product.price;
      let fakePrice: number = product.fakePrice;
      const discount: number = product.discount ? product.discount : 0;
      if (selectedVariant && activeVariant) {
        attributes = Object.entries(selectedVariant).map(
          ([key, value]) => value
        );
        image = activeVariant?.images[0];
        price = activeVariant?.price;
        fakePrice = activeVariant?.fakePrice;
      }

      await addToCart({
        productId: product._id,
        title: product.title,
        quantity,
        image,
        discount,
        attributes,
        slug: product.slug,
        price,
        fakePrice,
      });
      dispatch(openFlyoutCart());
    } catch (error) {
      console.log("Error add to cart", error);
    }
  };
  // Số lượng muốn add cart
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
  // Gộp các ảnh của variants thành 1 mảng nếu có
  const allImages =
    product?.variants?.flatMap((variant) => variant.images) || [];

  const variantsKeyValue = product?.variants?.reduce((acc, variant) => {
    Object.entries(variant.attributes).forEach(([key, value]) => {
      if (!acc[key]) acc[key] = new Set();
      acc[key].add(value);
    });
    return acc;
  }, {});
  // Xử lý chọn 1 variant
  const handleSelectedVariant = (key, value) => {
    if (!product || !product.variants || product.variants.length === 0) return;
    const newAttributes = { ...selectedVariant, [key]: value };
    const matchedVariant = product.variants.find((variant) =>
      Object.entries(newAttributes).every(
        ([key, value]) => variant.attributes[key] === value
      )
    );
    setSelectedVariant(newAttributes);
    setActiveVariant(matchedVariant || null);
  };

  // console.log(variantsKeyValue);
  // console.log(selectedVariant);
  // console.log(activeVariant);

  if (error) {
    return <p>Lỗi xảy ra!</p>;
  }
  return (
    <div className="pt-6 pb-32 break-point ">
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
                    images={allImages}
                    activeVariant={activeVariant}
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
                <h3 className="text-2xl font-bold">{product.title}</h3>
                <div className="flex items-center gap-3 mt-2 flex-wrap  text-sm font-normal">
                  <div className="flex items-center gap-1">
                    <span>Mã sản phẩm:</span>
                    <span className="font-bold text-red-500">
                      {product
                        ? product.variants && product.variants.length > 0
                          ? activeVariant
                            ? activeVariant.sku
                            : product.sku
                          : product.sku
                        : "Null"}
                    </span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1">
                    <span>Tình trạng:</span>
                    <span className="font-bold text-red-500">
                      {product.status ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1">
                    <span>Thương hiệu:</span>
                    <span className="font-bold text-red-500 uppercase">
                      {product.brand}
                    </span>
                  </div>
                </div>
                <div className="flex items-center py-4 mt-4 bg-[#fafafa] px-4">
                  <span className="text-sm font-semibold lg:block hidden min-w-[100px]">
                    Giá:
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold lg:text-3xl  text-[22px] text-red-500">
                      {formatPriceToVND(product.minPrice)}
                    </span>
                    <span className=" lg:text-lg  text-[16px] line-through text-gray-400">
                      {getFakePrice(product)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-6 px-4">
                  {variantsKeyValue &&
                    Object.entries(variantsKeyValue).map(([key, value]) => {
                      return (
                        <div key={key} className="flex items-center ">
                          <h4 className="min-w-[100px] text-sm font-semibold">
                            {key}
                          </h4>
                          <div className="flex items-center gap-3 flex-wrap">
                            {[...value].map((val) => (
                              <button
                                key={val}
                                onClick={() => handleSelectedVariant(key, val)}
                                className={`border text-[12px] font-medium color-red border-gray-300 rounded px-3 py-2 ${
                                  selectedVariant[key] === val
                                    ? "border-red-500"
                                    : ""
                                } `}
                              >
                                {val}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
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
                    onClick={() => onSubmitAddCart()}
                    className="border transition-all duration-500 hover:opacity-80 border-red-500 rounded px-4 py-2.5 flex items-center justify-center w-full text-red-500"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button className="border transition-all duration-500 hover:opacity-80 font-medium  bg-[#ff0000] text-white rounded px-4 py-2.5 flex items-center justify-center w-full">
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
                      onClick={() => onSubmitAddCart()}
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
