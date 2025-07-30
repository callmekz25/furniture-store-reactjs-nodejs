import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortTableItem } from "../../../components/admin/variants/sort-table-item";
import generateSlug from "@/utils/generate-slug";
import { useForm, Controller } from "react-hook-form";
import { setting, formats } from "@/utils/config-quill";
import IProduct from "@/interfaces/product/product.interface";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading/loading";
import { useGetProductById, useUpdateProduct } from "@/hooks/use-product";
import { useGetCollections } from "@/hooks/use-collection";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import MultiSelect from "@/components/ui/multi-select";
import VariantForm from "@/components/admin/variants/variant-form";
import VariantDetail from "@/components/admin/variants/variant-detail";
import { Switch } from "@/components/ui/switch";
const EditProduct = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductById(productId!);
  const [productVariants, setProductVariants] = useState<ISelectedVariant[]>();
  const [previewImages, setPreviewImages] = useState<File[] | string[]>([]);

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const { data: collections, isLoading: ic } = useGetCollections();

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

  useEffect(() => {
    if (product) {
      reset(product);
      setProductVariants(product.variants);
      setPreviewImages(product.images);
    }
  }, [product, reset]);

  // Group images
  const handlePreviewImages = (files: FileList | null) => {
    if (!files) return;
    setPreviewImages([...previewImages, ...Array.from(files)] as string[]);
  };
  // Drag drop for images default
  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPreviewImages((prev) => {
      const oldIndex = prev.findIndex((file) =>
        typeof file === "string" ? file === active.id : file.name === active.id
      );
      const newIndex = prev.findIndex((file) =>
        typeof file === "string" ? file === over.id : file.name === over.id
      );
      return arrayMove(prev as File[], oldIndex, newIndex);
    });
  };

  const handleUpdate = (data) => {
    console.log(productVariants);

    // updateProduct(
    //   {
    //     id: data._id,
    //     collections: data.collection,
    //   },
    //   {
    //     onSuccess: () => {
    //       window.location.reload();
    //     },
    //   }
    // );
  };
  if (isLoading || ic || isPending) {
    return <Loading />;
  }
  console.log(productVariants);

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="grid grid-cols-4 gap-6 font-medium"
    >
      <div className=" col-span-3 h-fit flex flex-col gap-4 ">
        <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
          {/* Tiêu đề */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm text-gray-600">
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              className="custom-input"
              {...register("title")}
            />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <label htmlFor="slug" className="text-sm text-gray-600">
              Slug
            </label>
            <div className="flex items-center gap-3 ">
              <input
                type="text"
                id="slug"
                className="custom-input w-full py-1.5"
                {...register("slug")}
              />
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("slug", generateSlug(productTitle));
                }}
                className="text-[13px] font-semibold bg-gray-100 rounded-md px-3 py-2"
              >
                Generate
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">
              Mô tả
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

          {productVariants?.length === 0 && (
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm text-gray-600">
                Hình ảnh
              </label>
              <DndContext
                collisionDetection={closestCenter}
                onDragOver={handleDragOver}
              >
                <SortableContext
                  items={previewImages.map((item) =>
                    typeof item === "string" ? item : item.name
                  )}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="max-h-[400px] grid grid-cols-5 grid-rows-2 gap-3">
                    {previewImages.map((file, index) => (
                      <SortTableItem
                        key={index}
                        main={true}
                        file={file}
                        index={index}
                      />
                    ))}

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
          )}
        </div>
        {productVariants?.length === 0 && (
          <div className="border border-gray-200 rounded-lg p-4 bg-white flex flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="price" className="text-sm text-gray-600">
                Giá
              </label>
              <input
                id="price"
                type="text"
                className="custom-input"
                value={
                  typeof watch("price") === "number"
                    ? watch("price").toLocaleString("vi-VN")
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setValue("price", Number(raw || 0), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="sku" className="text-sm text-gray-600">
                Sku
              </label>
              <input
                type="text"
                id="sku"
                className="custom-input"
                {...register("sku")}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="quantity" className="text-sm text-gray-600">
                Số lượng
              </label>
              <input
                id="quantity"
                type="number"
                className="custom-input"
                {...register("quantity")}
              />
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200  rounded-xl">
          <VariantForm
            productVariants={productVariants}
            onChange={setProductVariants}
          />

          <VariantDetail
            productVariants={productVariants}
            onChange={setProductVariants}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="border border-gray-200 rounded-xl p-4 h-fit bg-white">
          <span className="text-sm text-gray-600">Hiển thị</span>
          <div className="flex items-center gap-2 mt-4">
            <label htmlFor="publish" className="text-sm ">
              Công khai
            </label>
            <Switch
              id="publish"
              checked={watch("publish")}
              onCheckedChange={(checked) => setValue("publish", checked)}
            />
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 h-fit bg-white flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="collections" className="text-sm text-gray-600">
              Collections
            </label>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto w-full">
              {ic ? (
                <span>Loading...</span>
              ) : collections ? (
                <Controller
                  name="collections"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <MultiSelect
                      selected={field.value}
                      onChange={field.onChange}
                      options={collections.map((col) => ({
                        _id: col._id,
                        name: col.name,
                      }))}
                      className="w-full"
                    />
                  )}
                />
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

export default EditProduct;
