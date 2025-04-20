import useReview from "@/hooks/review/useReview";
import IReview from "@/interfaces/review.interface";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import StarRating from "@/components/ui/starRating";
import DisplayStarRating from "@/components/ui/displayStarRating";
import { memo } from "react";
const ReviewSection = ({ productId }: { productId: string }) => {
  const {
    reviewData,
    isLoading: isReviewsLoading,
    error: isReviewsError,
    postReview,
  } = useReview(productId);
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
      rating: 5,
      content: "",
      userId: null,
      productId: productId,
    },
  });
  // Submit review
  const onSubmitReview = async (data: IReview) => {
    if (!productId) return;
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
      productId: productId,
    });
  };
  console.log("Review");

  if (!productId) {
    return;
  }
  if (isReviewsError) {
    return <p>Lỗi xảy ra!</p>;
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitReview)}
        className="flex flex-col gap-4 py-3"
      >
        <div className="flex flex-col gap-5">
          {isReviewsLoading ? (
            <span>Loading...</span>
          ) : reviewData.length > 0 ? (
            reviewData.map((review: any) => {
              return (
                <div key={review._id}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">
                        {review.email}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <DisplayStarRating rating={review.rating} />
                    <p className="font-medium">{review.content}</p>
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
  );
};

export default memo(ReviewSection);
