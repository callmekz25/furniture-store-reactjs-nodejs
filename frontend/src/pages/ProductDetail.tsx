import Layout from "@/layouts";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import Guard from "../assets/guard.webp";
import Refund from "../assets/refund.webp";
import Hotline from "../assets/hotline.webp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useProductBySlug from "@/hooks/useProductBySlug";
import { getReviewsByProductId, postReview } from "@/api/review";
import IReview from "@/interfaces/review";
import StarRating from "@/components/StarRating";
import DisplayStarRating from "@/components/DisplayStarRating";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import formatPriceToVND from "@/utils/formatPriceToVND";
import ICart from "@/interfaces/cart";
import { addCart } from "@/api/cart";
import ProductGallery from "@/components/ProductGallery";
const ProductDetail = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isTabDescr, setIsTabDescr] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const { slug } = useParams<string>();
  const { data: product, isLoading, error } = useProductBySlug(slug);
  const productId = product?._id;
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    error: isReviewsError,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProductId(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 30,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IReview>({
    defaultValues: {
      name: "",
      email: "",
      rating: 5, // Giá trị mặc định của rating
      content: "",
      userId: null,
      productId: "",
    },
  });
  // Thêm productId vào hook form
  useEffect(() => {
    if (product) {
      setValue("productId", product._id);
    }
  }, [setValue, product]);

  // Hàm xử lý slide
  const nextSlider = () => {
    if (product?.images && currentIndex < product.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prevSlider = () => {
    if (product?.images && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  // Submit review
  const onSubmitReview = async (data: IReview) => {
    const res = await postReview(data);

    toast("", {
      style: {
        backgroundColor: "#22c55e",
        color: "white",
        fontSize: 15,
        fontWeight: 800,
      },
      description: res.mess,
    });
    reset({
      name: "",
      email: "",
      rating: 5,
      content: "",
      userId: null,
      productId: product?._id,
    });
  };
  // Submit add cart
  const onSubmitAddCart = async (data: ICart) => {
    await addCart(data);
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
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="pt-6 pb-32">
        <section className="flex lg:flex-row flex-col gap-12 break-point">
          <div className="lg:w-[45%] flex justify-center items-center h-fit  bg-gray-100  ">
            {product && product.images ? (
              <ProductGallery images={product.images} />
            ) : (
              ""
            )}
          </div>
          <div className="px-4">
            <h3 className="text-2xl font-bold">{product.title}</h3>
            <div className="flex items-center gap-3 mt-2 flex-wrap  text-sm font-normal">
              <div className="flex items-center gap-1">
                <span>Mã sản phẩm:</span>
                <span className="font-bold text-red-500">{product.sku}</span>
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
            <div className="flex items-center gap-32 mt-4">
              <span className="text-sm font-semibold lg:block hidden">
                Giá:
              </span>
              <div className="flex items-center gap-4">
                <span className="font-semibold lg:text-3xl  text-[22px] text-red-500">
                  {formatPriceToVND(product.price)}
                </span>
                <span className=" lg:text-lg  text-[16px] line-through text-gray-400">
                  {formatPriceToVND(product.fakePrice)}
                </span>
              </div>
            </div>
            <div className=" items-center gap-20 mt-6 lg:flex hidden">
              <span className="text-sm font-semibold">Số lượng:</span>
              <div className="flex items-center gap-4 justify-between border border-gray-200 rounded px-3 py-1">
                <button onClick={() => minusQuantity()}>
                  <MinusIcon className="size-5" />
                </button>
                <span className="font-semibold">{quantity}</span>
                <button onClick={() => plusQuantity()}>
                  <PlusIcon className="size-5" />
                </button>
              </div>
            </div>
            <div className="lg:flex items-center hidden gap-4 mt-6 font-medium">
              <button
                onClick={() => onSubmitAddCart({ productId, quantity })}
                className="border transition-all duration-500 hover:opacity-80 border-red-500 rounded px-4 py-2.5 flex items-center justify-center w-full text-red-500"
              >
                Thêm vào giỏ hàng
              </button>
              <button className="border transition-all duration-500 hover:opacity-80 font-medium  bg-[#ff0000] text-white rounded px-4 py-2.5 flex items-center justify-center w-full">
                Mua ngay
              </button>
            </div>
            {/* Mobile add cart */}
            <div className="flex lg:hidden items-center z-50 gap-4 left-0 px-4 py-2 border-t border-gray-200 bg-white w-full font-semibold fixed bottom-0">
              <div className="flex items-center gap-6 justify-between border border-gray-200 rounded px-3 py-2.5">
                <button onClick={() => minusQuantity()}>
                  <MinusIcon className="size-5" />
                </button>
                <span className="font-semibold w-2">{quantity}</span>
                <button onClick={() => plusQuantity()}>
                  <PlusIcon className="size-5" />
                </button>
              </div>
              <button
                onClick={() => onSubmitAddCart({ productId, quantity })}
                className="border transition-all duration-500 hover:opacity-80 font-medium  bg-[#ff0000] text-white rounded px-4 py-2.5 flex items-center justify-center w-full"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
            <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 lg:gap-0 justify-between mt-6">
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={Guard}
                  alt="Bảo hành"
                  className="size-7  object-contain"
                />
                <span className="text-sm">1 Năm Bảo Hành</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={Refund}
                  alt="Bảo hành"
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
                  className="size-7 object-contain"
                />
                <span className="text-sm">
                  Hotline: <span className="font-bold">0899348258</span>
                </span>
              </div>
            </div>
            <div className="mt-6 ">
              <ul className="flex items-center gap-10 border-b border-gray-300 py-3">
                <li
                  className={`font-semibold text-md ${
                    isTabDescr ? "color-red " : ""
                  }`}
                >
                  <button onClick={() => setIsTabDescr(true)}>
                    Mô tả sản phẩm
                  </button>
                </li>
                <li
                  className={`font-semibold text-md ${
                    isTabDescr ? " " : "color-red"
                  }`}
                >
                  <button onClick={() => setIsTabDescr(false)}>Đánh giá</button>
                </li>
              </ul>
              <div
                className={`overflow-hidden min-w-full py-4 text-sm transition-all duration-500 product-description  ease-out relative ${
                  isExpand ? "max-h-[1000px]" : "max-h-[230px]"
                } `}
              >
                {isTabDescr ? (
                  <>
                    <div
                      className="whitespace-pre-wrap text-sm "
                      dangerouslySetInnerHTML={{ __html: product?.descr }}
                    />
                  </>
                ) : (
                  <>
                    <form
                      onSubmit={handleSubmit(onSubmitReview)}
                      className="flex flex-col gap-4 py-3"
                    >
                      <div className="flex flex-col gap-5">
                        {isReviewsLoading ? (
                          <span>Loading...</span>
                        ) : reviews.length > 0 ? (
                          reviews.map((review: any) => {
                            return (
                              <div key={review._id}>
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold">
                                      {review.email}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString("vi-VN")}
                                    </span>
                                  </div>
                                  <DisplayStarRating rating={review.rating} />
                                  <p className="font-medium">
                                    {review.content}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="font-medium text-gray-500">
                            Chưa có đánh giá nào cho sản phẩm này
                          </p>
                        )}
                      </div>

                      <div className="border border-gray-300 p-4 rounded">
                        <h3 className="font-semibold text-lg">Thêm đánh giá</h3>
                        <h4 className="text-gray-400 text-sm py-2">Xếp hạng</h4>
                        <StarRating
                          rating={watch("rating")}
                          onChange={(rating) => setValue("rating", rating)}
                        />
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label
                              htmlFor="content"
                              className="text-sm font-medium text-gray-400"
                            >
                              Đánh giá
                            </label>
                            <textarea
                              id="review"
                              className=" border border-gray-300 rounded outline-none px-2 py-2 min-h-[80px]"
                              {...register("content", {
                                required: true,
                                minLength: {
                                  value: 8,
                                  message: "Tối thiểu 8 kí tự",
                                },
                              })}
                            ></textarea>
                            {errors.content?.type === "required" && (
                              <span className="text-sm text-red-500 font-medium">
                                Đánh giá không được trống
                              </span>
                            )}
                            {errors.content?.type === "minLength" && (
                              <span className="text-sm text-red-500 font-medium">
                                {errors.content.message}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-1">
                            <label
                              htmlFor="name"
                              className="text-sm font-medium text-gray-400"
                            >
                              Họ tên
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="border border-gray-300 rounded outline-none px-2 py-1.5"
                              {...register("name", {
                                required: true,
                              })}
                            />
                            {errors.name?.type === "required" && (
                              <span className="text-sm text-red-500 font-medium">
                                Họ tên không được trống
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-1">
                            <label
                              htmlFor="email"
                              className="text-sm font-medium text-gray-400"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              id="email"
                              className="border border-gray-300 rounded outline-none px-2 py-1.5"
                              {...register("email", {
                                required: true,
                                pattern: {
                                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                  message: "Email không hợp lệ",
                                },
                              })}
                            />

                            {errors.email?.type === "required" && (
                              <span className="text-sm text-red-500 font-medium">
                                Email không được trống
                              </span>
                            )}
                            {errors.email?.type === "pattern" && (
                              <span className="text-sm text-red-500 font-medium">
                                {errors.email.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="submit"
                          name="submit-review"
                          className="bg-red-700 px-4 py-2 rounded text-white font-semibold"
                        >
                          Gửi đánh giá
                        </button>
                      </div>
                    </form>
                  </>
                )}

                <div
                  className={`absolute bottom-0 transition-all duration-300 left-0 w-full h-20 bg-gradient-to-t from-white via-white/80 to-transparent ${
                    isExpand ? "opacity-0 hidden" : "opacity-100 block"
                  } `}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="flex transition-all duration-300 hover:bg-red-700 hover:text-white items-center color-red gap-2 border rounded border-red-600 px-3 py-1.5 text-sm"
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
      </div>
    </Layout>
  );
};

export default ProductDetail;
