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
import { postReview } from "@/api/review";
import IReview from "@/interfaces/review";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";

const ProductDetail = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isTabDescr, setIsTabDescr] = useState<boolean>(true);
  const { slug } = useParams<string>();
  const { data: product, isLoading, error } = useProductBySlug(slug);

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
  useEffect(() => {
    if (product) {
      setValue("productId", product._id);
    }
  }, [setValue, product]);
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="pt-6 pb-32">
        <section className="flex gap-12 break-point">
          <div className="lg:w-[45%] flex  bg-gray-100  h-auto max-h-[532px]">
            {/* Danh sách ảnh nhỏ */}
            <div className="flex flex-col gap-3 overflow-y-scroll max-h-full scroll-hidden p-2 h-full">
              {product && product.images ? (
                product.images.map((image: string, index: number) => (
                  <div
                    className={`border hover:cursor-pointer flex flex-col items-center justify-center p-3 bg-white border-gray-200 w-[75px] ${
                      currentIndex === index ? "border-red-500" : ""
                    }`}
                    key={image}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img
                      src={image}
                      alt="Ảnh từng sản phẩm"
                      className="object-contain w-full h-auto"
                    />
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>

            <div className="bg-gray-100 relative flex items-center justify-center">
              <button
                className={`absolute  left-0 z-10 top-1/2 -translate-y-1/2  ${
                  currentIndex === 0 ? "hidden" : ""
                } `}
                onClick={() => prevSlider()}
              >
                <ChevronLeftIcon className="size-8" />
              </button>
              <div className="overflow-hidden flex">
                <div
                  className={` flex items-center w-[532px] transition-all duration-500 ease-in-out `}
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {product && product.images ? (
                    product.images.map((image: string) => (
                      <div
                        className="flex-shrink-0 w-full flex items-center justify-center"
                        key={image}
                      >
                        <img
                          src={image}
                          alt="Ảnh chính của sản phẩm"
                          className="object-contain size-full max-w-full"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
              <button
                className={`absolute  right-0 z-10 top-1/2 -translate-y-1/2  ${
                  currentIndex === product?.images.length - 1 ? "hidden" : ""
                } `}
                onClick={() => nextSlider()}
              >
                <ChevronRightIcon className="size-8" />
              </button>
            </div>
          </div>
          <div className="">
            <h3 className="text-2xl font-bold">{product.title}</h3>
            <div className="flex items-center gap-3 mt-2  text-sm font-normal">
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
              <span className="text-sm font-semibold">Giá:</span>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-3xl text-red-500">
                  {product.price}
                </span>
                <span className=" text-lg line-through text-gray-400">
                  {product.fakePrice}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-20 mt-6">
              <span className="text-sm font-semibold">Số lượng:</span>
              <div className="flex items-center gap-4 justify-between border-2 border-gray-200 rounded px-3 py-1">
                <button>
                  <MinusIcon className="size-5" />
                </button>
                <span className="font-semibold">1</span>
                <button>
                  <PlusIcon className="size-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6 font-semibold">
              <button className="border transition-all duration-500 hover:opacity-80 border-black rounded px-4 py-2.5 flex items-center justify-center w-full">
                Thêm vào giỏ hàng
              </button>
              <button className="bg-black text-white transition-all duration-500 hover:opacity-80 rounded px-4 py-2.5 flex items-center justify-center w-full">
                Mua ngay
              </button>
            </div>
            <div className="flex items-center justify-between mt-6">
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
                      <p className="font-medium text-gray-500">
                        Chưa có đánh giá nào cho sản phẩm này
                      </p>
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
                  className="flex items-center color-red gap-2 border rounded border-red-600 px-3 py-1.5 text-sm"
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
