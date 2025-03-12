import { useEffect, useRef, useState } from "react";
import LayoutAdmin from "../../layouts/adminLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { vi } from "date-fns/locale";
import { format } from "date-fns";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Calendar } from "@/components/ui/calendar";
import { SortableItem } from "../../components/admin/SortTableItem";
import { PencilIcon } from "@heroicons/react/24/outline";
import { addProduct } from "@/api/productService";
import { useForm, Controller } from "react-hook-form";
import { setting, formats } from "@/utils/configQuill";
import IProduct from "@/interfaces/product.interface";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categoryService";
import { getCollections } from "@/api/collectionService";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircleIcon } from "lucide-react";
import SortOptionVariant from "@/components/admin/sortOptionVariant";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addVariant, updateIndexVariant } from "@/redux/slices/variant.slice";

const AddProduct = () => {
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [productVariants, setProductVariants] = useState<string[]>();
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const refEditDate = useRef<HTMLDivElement | undefined>();
  const variants = useAppSelector((state) => state.variant.variant);
  const [variantImages, setVariantImages] = useState<
    [{ variantName: string; files: File[] }]
  >([]);

  const dispatch = useAppDispatch();
  const {
    data: categories,
    isLoadingCategories,
    errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30,
  });
  const {
    data: collections,
    isLoadingCollections,
    errorCollections,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
    staleTime: 1000 * 60 * 30,
  });

  // Hook form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IProduct>();

  // Hàm biến các file ảnh thành 1 mảng vô state
  const handlePreviewImages = (files: FileList | null) => {
    if (!files) return;
    setPreviewImages([...previewImages, ...Array.from(files)]);
  };
  // Xử lý hành vi kéo thả
  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPreviewImages((prev) => {
      const oldIndex = prev.findIndex((file) => file.name === active.id);
      const newIndex = prev.findIndex((file) => file.name === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };
  // Gọi api upload các file ảnh lên cloudinary
  const handleAddProduct = async (data: IProduct) => {
    // if (!previewImages || previewImages.length === 0) {
    //   console.log("No file choose");
    // } else {
    // }
    // Variants dạng [{name: "Màu sắc", value: "Đỏ"}] => {Màu sắc: ["Đỏ", "Xám"]}
    const attributes = variants.reduce((acc, variant) => {
      acc[variant.name] = variant.value;
      return acc;
    }, {});
    const generateProductVariants = (variants) => {
      const variantKeys = Object.keys(variants); // ["Kích thước", "Màu sắc"]

      const combinations = variantKeys.reduce((acc, key) => {
        const values = variants[key].map((v) => ({
          name: key,
          value: v.value,
        }));

        if (acc.length === 0) return values.map((v) => [v]);

        return acc.flatMap((existing) =>
          values.map((newValue) => [...existing, newValue])
        );
      }, []);

      return combinations.map((variantCombo) => ({
        attributes: variantCombo.reduce((acc, { name, value }) => {
          acc[name] = value;
          return acc;
        }, {}),
        quantity: 50, // Mặc định stock
        price: 299000, // Mặc định price
      }));
    };

    // 🛠 Gọi hàm
    const productVariants = generateProductVariants(attributes);
    console.log(productVariants);
    const res = await addProduct(previewImages, data, productVariants);
    if (res) {
      console.log(res);
      reset();
      setPreviewImages([]);
    }
  };
  const handleAddVariant = () => {
    const tempVariants = []; // Tạo mảng tạm để tránh gọi setState nhiều lần

    for (let i = 0; i < variants.length - 1; i++) {
      const element1 = variants[i].value;

      for (let j = 0; j < element1.length; j++) {
        const element2 = element1[j]?.value || "";

        const elementNext = variants[i + 1]?.value || [];
        for (let k = 0; k < elementNext.length; k++) {
          const element = elementNext[k]?.value || "";
          if (element2 !== "" && element !== "") {
            tempVariants.push(`${element2}-${element}`);
          }
        }
      }
      setProductVariants(tempVariants);
    }
  };
  const handleDragOptionVariants = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const oldIndex = variants.findIndex((vr) => vr.id === active.id);
    const newIndex = variants.findIndex((vr) => vr.id === over.id);

    dispatch(updateIndexVariant({ oldIndex, newIndex }));
  };

  // Cleanup các url tạm thời tránh memory leak
  useEffect(() => {
    return () => {
      previewImages.forEach((file) =>
        URL.revokeObjectURL(URL.createObjectURL(file))
      );
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
  const handleUploadImages = (variantName: string, files: FileList | null) => {
    if (!files) return;

    setVariantImages((prev) => {
      const newFiles = Array.from(files);
      const existingVariant = prev.find((v) => v.variantName === variantName);

      if (existingVariant) {
        // Nếu variantName đã có, cập nhật files
        return prev.map((v) =>
          v.variantName === variantName
            ? { ...v, files: [...v.files, ...newFiles] }
            : v
        );
      } else {
        // Nếu chưa có, thêm mới
        return [...prev, { variantName, files: newFiles }];
      }
    });
  };

  const handleDragOverVariantImages = (variantName: string, event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setVariantImages((prev) => {
      return prev.map((variant) => {
        if (variant.variantName !== variantName) return variant; // Giữ nguyên các variant khác

        const oldIndex = variant.files.findIndex(
          (img) => img.name === active.id
        );
        const newIndex = variant.files.findIndex((img) => img.name === over.id);

        return {
          ...variant,
          files: arrayMove(variant.files, oldIndex, newIndex), // Sắp xếp lại ảnh
        };
      });
    });
  };

  console.log(variantImages);

  return (
    <LayoutAdmin>
      <form
        className="grid grid-cols-4 gap-6 font-medium"
        onSubmit={handleSubmit(handleAddProduct)}
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
                name="descr"
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
            {/* Hình ảnh */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm text-gray-600">
                Hình ảnh
              </label>
              {/* Khai báo khung có thể kéo thả */}
              <DndContext
                collisionDetection={closestCenter}
                onDragOver={handleDragOver}
              >
                {/* Định nghĩa danh sách có thể kéo thả, items phải là danh sách các id không trùng lặp và ổn định */}
                <SortableContext
                  items={previewImages.map((file) => file.name)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="max-h-[400px] grid grid-cols-5 grid-rows-2 gap-3">
                    {previewImages.map((file, index) => (
                      // Phần tử có thể kéo thả
                      <SortableItem key={index} file={file} index={index} />
                    ))}

                    {/* Upload button */}
                    <label
                      htmlFor="images"
                      className={`border hover:cursor-pointer border-gray-300 border-dashed rounded-md py-14 px-4 flex items-center justify-center ${
                        previewImages.length > 0
                          ? "col-span-1"
                          : "col-span-5 row-span-2"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <span className="font-normal text-center text-gray-300 text-lg">
                          Upload new image
                        </span>
                      </div>
                      <input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handlePreviewImages(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
          {/* Price */}
          <div className="border border-gray-200 rounded-md p-4 bg-white flex flex-wrap gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Giá
              </label>
              <input
                type="text"
                className="custom-input"
                {...register("price")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Giá ảo
              </label>
              <input
                type="text"
                className="custom-input"
                {...register("fakePrice")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Sku
              </label>
              <input
                type="text"
                className="custom-input"
                {...register("sku")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Số lượng
              </label>
              <input
                type="number"
                className="custom-input"
                {...register("quantity")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Tình trạng
              </label>
              <input
                type="radio"
                className="custom-input"
                value={true}
                {...register("status")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Slug
              </label>
              <input
                type="text"
                className="custom-input"
                {...register("slug")}
              />
            </div>
          </div>
          {/* Variant  */}
          <div className="bg-white border border-gray-200  rounded-xl">
            <div className="p-4">
              <p className="flex items-center justify-between">
                <h3 className="text-sm text-gray-600">Variant Settings</h3>
                <Button
                  variant="outline"
                  className=" font-semibold flex items-center px-3 rounded-lg text-[13px]"
                >
                  <Plus />
                  Add Variant
                </Button>
              </p>
              <div className=" mt-4 rounded-lg text-sm  p-2 w-full">
                {variants && variants.length > 0 && (
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragOver={handleDragOptionVariants}
                  >
                    {/* Định nghĩa danh sách có thể kéo thả, items phải là danh sách các id không trùng lặp và ổn định */}
                    <SortableContext
                      items={variants.map((vr) => vr.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="flex flex-col gap-3">
                        {variants.map((vr) => {
                          return <SortOptionVariant key={vr.id} variant={vr} />;
                        })}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}

                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(addVariant());
                  }}
                  className="flex border bordr-gray-300 py-2 px-4 mt-4 rounded-lg font-medium items-center gap-2 w-full"
                >
                  <PlusCircleIcon className="size-4" />
                  <span>Add options like size or color</span>
                </button>
                <div className="flex items-center justify-end mt-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleAddVariant();
                    }}
                    className="text-sm py-1"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
            {/* Variants child */}
            <div className="mt-7 flex flex-col">
              <div className="py-3 flex items-center border-t border-gray-300 px-7">
                <p className="text-sm text-gray-500 flex-[0_0_65%] max-w-[60%]">
                  Variant
                </p>
                <p className="text-sm text-gray-500 flex-[0_0_30%] max-w-[30%]">
                  Giá
                </p>
                <p className="text-sm text-gray-500 flex-[0_0_15%] max-w-[10%]">
                  Số lượng
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col w-full">
                {productVariants &&
                  productVariants.length > 0 &&
                  productVariants.map((pvr) => {
                    return (
                      <div className="flex flex-col gap-2" key={pvr}>
                        <div className="py-4 border-t border-gray-300 px-8">
                          <p className="text-[17px] uppercase font-medium">
                            {pvr}
                          </p>
                        </div>

                        <div className="py-3 pl-8 box-border border-t w-full gap-4  border-gray-300 flex items-center">
                          <div className="flex-[0_0_55%] max-w-[55%]">
                            <div className="flex flex-col gap-2">
                              <label
                                htmlFor=""
                                className="text-sm text-gray-600"
                              >
                                Hình ảnh
                              </label>
                              {/* Khai báo khung có thể kéo thả */}
                              <DndContext
                                collisionDetection={closestCenter}
                                onDragOver={(e) =>
                                  handleDragOverVariantImages(pvr, e)
                                }
                              >
                                <SortableContext
                                  items={
                                    variantImages
                                      .find((v) => v.variantName === pvr)
                                      ?.files.map((file) => file.name) || []
                                  }
                                  strategy={verticalListSortingStrategy}
                                >
                                  <div className="max-h-[400px] grid grid-cols-5 grid-rows-2 gap-3">
                                    {variantImages
                                      .find((v) => v.variantName === pvr)
                                      ?.files.map((file, index) => (
                                        <SortableItem
                                          key={file.name}
                                          file={file}
                                          index={index}
                                        />
                                      ))}

                                    {/* Upload button */}
                                    <label
                                      htmlFor={`${pvr}`}
                                      className={`border hover:cursor-pointer border-gray-300 border-dashed rounded-md py-14 px-4 flex items-center justify-center ${
                                        (variantImages.find(
                                          (v) => v.variantName === pvr
                                        )?.files.length || 0) > 0
                                          ? "col-span-1"
                                          : "col-span-5 row-span-2"
                                      }`}
                                    >
                                      <div className="flex items-center justify-center">
                                        <span className="font-normal text-center text-gray-300 text-lg">
                                          Upload new image
                                        </span>
                                      </div>
                                      <input
                                        id={`${pvr}`}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) =>
                                          handleUploadImages(
                                            pvr,
                                            e.target.files
                                          )
                                        }
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                </SortableContext>
                              </DndContext>
                            </div>
                          </div>
                          <div className="flex-[0_0_25%] max-w-[25%]">
                            <input
                              type="text"
                              name=""
                              id=""
                              className=" custom-input w-full "
                            />
                          </div>
                          <div className="flex-[0_0_14%] max-w-[14%]">
                            <input
                              type="text"
                              className="custom-input w-full"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
          <div className="border border-gray-200 rounded-xl p-4 h-fit bg-white flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="collections" className="text-sm text-gray-600">
                Collections
              </label>
              <div className="flex flex-col gap-2 w-full">
                {isLoadingCollections ? (
                  <span>Loading...</span>
                ) : collections ? (
                  collections.map((collection) => {
                    return (
                      <div
                        key={collection.name}
                        className="flex items-center  gap-3"
                      >
                        <input
                          type="checkbox"
                          value={collection.slug}
                          className="size-4"
                          id={collection.name}
                          {...register("collection")}
                        />
                        <label htmlFor={collection.name}>
                          {collection.name}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  "Loading"
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="categories" className="text-sm text-gray-600">
                Danh mục
              </label>
              <select
                className="custom-input"
                id="categories"
                {...register("category")}
              >
                <option value=""></option>
                {isLoadingCategories ? (
                  <span>Loading...</span>
                ) : categories ? (
                  categories.map((category) => {
                    return (
                      <option key={category.name} value={category.slug}>
                        {category.name}
                      </option>
                    );
                  })
                ) : (
                  "Loading"
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="supplier" className="text-sm text-gray-600">
                Nhà cung cấp
              </label>
              <input
                type="text"
                className="custom-input"
                id="supplier"
                {...register("brand")}
              />
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

export default AddProduct;
