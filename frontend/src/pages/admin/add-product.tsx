import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
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
import { addProduct } from "@/services/product.service";
import generateProductVariants from "@/utils/generateProductVariants";
import { useForm, Controller } from "react-hook-form";
import { setting, formats } from "@/utils/configQuill";
import IProduct from "@/interfaces/product/product.interface";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircleIcon } from "lucide-react";
import SortOptionVariant from "@/components/admin/sortOptionVariant";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addVariant,
  resetVariant,
  updateIndexVariant,
} from "@/redux/slices/variant.slice";
import generateSlug from "@/utils/generateSlug";
import Loading from "@/components/loading/loading";
import { useGetAll } from "@/hooks/useGet";
import IVariant from "@/interfaces/variant/variant.interface";
import IOption from "@/interfaces/variant/option.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

const AddProduct = () => {
  const [productVariants, setProductVariants] = useState<ISelectedVariant[]>();
  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const variants = useAppSelector((state) => state.variant.variant);

  const dispatch = useAppDispatch();

  const {
    data: collections,
    isLoading: ic,
    error: ec,
  } = useGetAll<{ name: string; slug: string }[]>(
    "/get-collections",
    ["collections"],
    true
  );

  // Hook form
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<IProduct>();
  const productTitle = watch("title");

  // Group preview image and file to array
  const handlePreviewImages = (files: FileList | null) => {
    if (!files) return;
    setPreviewImages([...previewImages, ...Array.from(files)]);
  };
  // Drag drop image default
  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPreviewImages((prev) => {
      const oldIndex = prev.findIndex((file) => file.name === active.id);
      const newIndex = prev.findIndex((file) => file.name === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleAddProduct = async (data: IProduct) => {
    if (!previewImages && !productVariants) {
      console.log("Missing images");
    }
    const res = await addProduct(previewImages, data, productVariants);
    if (res) {
      console.log(res);
      reset();
      setPreviewImages([]);
      setProductVariants([]);
      dispatch(resetVariant());
    }
  };

  // Set variants
  const handleDoneVariants = () => {
    console.log("Variants ban đầu: ", variants);

    // Variants [{name: "Màu sắc", value: ["Đỏ", "Xám"]}] => {Màu sắc: ["Đỏ", "Xám"]}
    const attributes = variants.reduce(
      (
        acc: {
          [key: string]: IOption[];
        },
        variant: IVariant
      ) => {
        acc[variant.name] = variant.value;
        return acc;
      },
      {}
    );
    console.log("Attributes sau khi gộp: ", attributes);

    const productVariants = generateProductVariants(attributes);
    setProductVariants(productVariants);
    console.log("Product variants cuối: ", productVariants);
  };

  // Drag drop variants
  const handleDragOptionVariants = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const oldIndex = variants.findIndex((vr) => vr.id === active.id);
    const newIndex = variants.findIndex((vr) => vr.id === over.id);

    dispatch(updateIndexVariant({ oldIndex, newIndex }));
  };

  // Drag drop images of variants
  const handleDragOverVariantImages = (index: number, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProductVariants((prev) =>
      prev!.map((variant, i) => {
        if (i !== index) return variant;

        const oldIndex = variant.images.findIndex(
          (img) => typeof img !== "string" && img.name === active.id
        );

        const newIndex = variant.images.findIndex(
          (img) => typeof img !== "string" && img.name === over.id
        );

        return {
          ...variant,
          images: arrayMove(variant.images as string[], oldIndex, newIndex),
        };
      })
    );
  };
  // Update fields each variants based on index
  const handleChangeFieldVariants = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setProductVariants((prev) =>
      prev!.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    );
  };

  // Update images each variants
  const handleUploadImages = (index: number, files: FileList) => {
    if (!files) {
      console.log("No files");
      return;
    }

    setProductVariants((prev) =>
      prev!.map((variant, i) =>
        i === index
          ? {
              ...variant,
              images: [
                ...(Array.isArray(variant.images) ? variant.images : []),
                ...Array.from(files),
              ],
            }
          : variant
      )
    );
  };
  if (ic) {
    return <Loading />;
  }
  return (
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
                  onChange={(content) => field.onChange(content)}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">
              Hình ảnh
            </label>

            <DndContext
              collisionDetection={closestCenter}
              onDragOver={handleDragOver}
            >
              <SortableContext
                items={previewImages.map((file) => file.name)}
                strategy={verticalListSortingStrategy}
              >
                <div className="max-h-[400px] grid grid-cols-5 grid-rows-2 gap-3">
                  {previewImages.map((file, index) => (
                    <SortableItem
                      key={index}
                      file={file}
                      index={index}
                      main={true}
                    />
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
              {...register("fakePrice")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="text-sm text-gray-600">
              Giảm giá (%)
            </label>
            <input
              type="number"
              className="custom-input"
              {...register("discount")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="text-sm text-gray-600">
              Sku
            </label>
            <input type="text" className="custom-input" {...register("sku")} />
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
              Slug
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                className="custom-input"
                {...register("slug")}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setValue("slug", generateSlug(productTitle));
                }}
                className="text-[13px] font-semibold bg-gray-100 rounded-md px-3 py-2"
              >
                Generate slug
              </button>
            </div>
          </div>
        </div>
        {/* Variant  */}
        <div className="bg-white border border-gray-200  rounded-xl">
          <div className="p-4">
            <p className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Variant Settings</span>
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
                <span>Add another options</span>
              </button>
              <div className="flex items-center justify-end mt-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDoneVariants();
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
                productVariants.map((pvr, index) => {
                  return (
                    <div className="flex flex-col gap-2" key={index}>
                      <div className="py-4 border-t border-gray-300 px-8">
                        <p className="text-[17px] uppercase font-medium">
                          {Object.entries(pvr.attributes)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(" - ")}
                        </p>
                      </div>

                      <div className="py-3 pl-6 box-border border-t w-full gap-3 border-gray-300 grid grid-cols-6">
                        <div className=" col-span-3">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-sm text-gray-600">
                              Hình ảnh
                            </label>
                            <DndContext
                              collisionDetection={closestCenter}
                              onDragOver={(e) =>
                                handleDragOverVariantImages(index, e)
                              }
                            >
                              <SortableContext
                                items={
                                  pvr.images.map((file) =>
                                    typeof file === "string" ? file : file.name
                                  ) || []
                                }
                                strategy={verticalListSortingStrategy}
                              >
                                <div className="max-h-[400px] grid grid-cols-5 grid-rows-2 gap-3">
                                  {pvr.images.map((file, idx) => (
                                    <SortableItem
                                      key={
                                        typeof file === "string"
                                          ? file
                                          : file.name
                                      }
                                      file={file}
                                      index={idx}
                                      main={true}
                                    />
                                  ))}

                                  {/* Upload button */}
                                  <label
                                    htmlFor={`upload-${index}`}
                                    className={`border hover:cursor-pointer border-gray-300 border-dashed rounded-md py-14 px-4 flex items-center justify-center ${
                                      (pvr?.images.length || 0) > 0
                                        ? "col-span-1"
                                        : "col-span-5 row-span-2"
                                    }`}
                                  >
                                    <div className="flex items-center justify-center">
                                      <span className="font-norma l text-center text-gray-300 text-lg">
                                        Upload new image
                                      </span>
                                    </div>
                                    <input
                                      id={`upload-${index}`}
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      onChange={(e) =>
                                        handleUploadImages(
                                          index,
                                          e.target.files!
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
                        <div className="flex items-center gap-2 flex-wrap col-span-3">
                          {/* Fake price */}
                          <div className="flex flex-col gap-1">
                            <label
                              className="text-sm font-normal text-gray-500"
                              htmlFor={`fakePrice-${pvr}`}
                            >
                              Giá ảo
                            </label>
                            <input
                              id={`fakePrice-${pvr}`}
                              type="number"
                              value={pvr.fakePrice}
                              onChange={(e) =>
                                handleChangeFieldVariants(
                                  index,
                                  "fakePrice",
                                  e.target.value
                                )
                              }
                              className="custom-input w-full"
                            />
                          </div>
                          {/* Số lượng */}
                          <div className="flex flex-col gap-1">
                            <label
                              className="text-sm font-normal text-gray-500"
                              htmlFor={`quantity-${pvr}`}
                            >
                              Số lượng
                            </label>
                            <input
                              id={`quantity-${pvr}`}
                              type="number"
                              value={pvr.quantity}
                              onChange={(e) =>
                                handleChangeFieldVariants(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="custom-input w-full"
                            />
                          </div>
                          {/* Sku variant */}
                          <div className="flex flex-col gap-1">
                            <label
                              className="text-sm font-normal text-gray-500"
                              htmlFor={`sku-${pvr}`}
                            >
                              Sku
                            </label>
                            <input
                              id={`sku-${pvr}`}
                              type="text"
                              value={pvr.sku}
                              onChange={(e) =>
                                handleChangeFieldVariants(
                                  index,
                                  "sku",
                                  e.target.value
                                )
                              }
                              className="custom-input w-full"
                            />
                          </div>
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
                value="true"
                {...register("publish")}
              />
              <div className="flex flex-col">
                <label htmlFor="public" className="text-sm">
                  Công khai
                </label>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="private"
                value="false"
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
            <span className="text-sm text-gray-600">Sản phẩm mới</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="isNew"
                  className="size-4"
                  value="true"
                  {...register("isNew")}
                />
                <label htmlFor="isNew">New</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="notNew"
                  className="size-4"
                  value="false"
                  {...register("isNew")}
                />
                <label htmlFor="notNew">Not new</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="collections" className="text-sm text-gray-600">
              Collections
            </label>
            <div className="flex flex-col gap-2 w-full max-h-[400px] overflow-y-auto">
              {ic ? (
                <span>Loading...</span>
              ) : collections ? (
                collections.map(
                  (collection: { name: string; slug: string }) => {
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
                        <label
                          htmlFor={collection.name}
                          className="text-md font-normal"
                        >
                          {collection.name}
                        </label>
                      </div>
                    );
                  }
                )
              ) : (
                "Loading"
              )}
            </div>
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
  );
};

export default AddProduct;
