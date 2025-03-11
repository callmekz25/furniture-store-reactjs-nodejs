import { useEffect, useRef, useState } from "react";
import LayoutAdmin from "../../layouts/adminLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { vi } from "date-fns/locale";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import { setting, formats } from "@/utils/configQuill";
import IBlog from "@/interfaces/blog.interface";
import { postBlog } from "@/api/blogService";

const AddBlog = () => {
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [previewImages, setPreviewImages] = useState<File | null>(null);
  const refEditDate = useRef<HTMLDivElement | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IBlog>();

  // Gọi api upload các file ảnh lên cloudinary
  const handlePostBlog = async (data: IBlog) => {
    const res = await postBlog(previewImages, data);
    if (res) {
      console.log(res);
      reset();
      setPreviewImages(null);
    }
    // if (!previewImages) {
    //   console.log("No file choose");
    // } else {
    // }
  };

  // Cleanup các url tạm thời tránh memory leak
  useEffect(() => {
    return () => {
      if (previewImages) {
        URL.revokeObjectURL(previewImages);
      }
    };
  }, [previewImages]);

  useEffect(() => {
    const handleClickOutsideEditingDate = (e: MouseEvent) => {
      if (
        refEditDate.current &&
        !refEditDate.current.contains(e.target as Node)
      ) {
        setIsEditingDate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideEditingDate);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEditingDate);
    };
  }, []);

  return (
    <LayoutAdmin>
      <form
        className="grid grid-cols-4 gap-6 font-medium"
        onSubmit={handleSubmit(handlePostBlog)}
      >
        <div className=" col-span-3 h-fit flex flex-col gap-4 ">
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            {/* Tiêu đề */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm text-gray-600">
                Tiêu đề
              </label>
              <input
                type="text"
                id=""
                className="custom-input"
                {...register("title")}
              />
            </div>
            {/* Nội dung */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm text-gray-600">
                Nội dung
              </label>
              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ReactQuill
                    formats={formats}
                    modules={setting}
                    {...field}
                    theme="snow"
                    onChange={(content) => field.onChange(content)} // Cập nhật giá trị khi nhập
                  />
                )}
              />
            </div>
            <div className="border p-6 border-gray-200 flex items-center justify-center rounded-md min-h-[100px]">
              <div className="">
                <input
                  type="file"
                  accept="image/*"
                  id="thumbnail"
                  className="hidden"
                  onChange={(e) => {
                    const url = URL.createObjectURL(e.target.files[0]);

                    setPreviewImages(url);
                  }}
                />
                {previewImages && (
                  <img
                    src={previewImages}
                    alt="Ảnh tạm"
                    className="max-w-[200px] object-contain"
                  />
                )}
                <label
                  htmlFor="thumbnail"
                  className="text-[15px] font-medium text-gray-500 hover:cursor-pointer"
                >
                  Upload image
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Publish */}
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-4 h-fit bg-white">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-2 items-start">
                <input
                  type="radio"
                  id="public"
                  className="size-4"
                  value={true}
                  {...register("publish")}
                />
                <div className="flex flex-col">
                  <label htmlFor="public" className="text-sm">
                    Công khai
                  </label>
                  <p className="flex items-center gap-2 text-[12px] text-gray-500">
                    {date
                      ? format(date, "dd/MM/yyyy HH:mm", { locale: vi })
                      : "Chọn ngày công khai"}
                    <button
                      className="relative"
                      onClick={() => setIsEditingDate(true)}
                    >
                      <PencilIcon className="size-4" />
                      <div className="" ref={refEditDate}>
                        <Calendar
                          mode="single"
                          selected={date}
                          locale={vi}
                          onSelect={setDate}
                          className={`absolute   text-black bottom-100 left-[-80px] shadow-xl -translate-x-1/2 transition-all duration-200 opacity-0 scale-0 bg-white border rounded-md z-50 ${
                            isEditingDate ? "opacity-100 scale-100 " : ""
                          }`}
                        />
                      </div>
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="private"
                  value={false}
                  {...register("publish")}
                  className="size-4"
                />
                <label htmlFor="private" className="text-sm">
                  Nháp
                </label>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm text-gray-600">
                Danh mục
              </label>
              <select
                id="category"
                {...register("category")}
                className="custom-input"
              >
                <option value=""></option>
                <option value="nguon-cam-hung">Nguồn cảm hứng</option>
                <option value="news">Tin tức</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm text-gray-600">
                Tags
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("tags")}
                  className="size-4"
                />
                <label htmlFor="">nội thất baya</label>
              </div>
            </div>
          </div>

          <button
            className="bg-blue-600 w-fit rounded-md text-white px-4 py-1.5  "
            disabled={isSubmitting}
          >
            Thêm mới
          </button>
        </div>
      </form>
    </LayoutAdmin>
  );
};

export default AddBlog;
