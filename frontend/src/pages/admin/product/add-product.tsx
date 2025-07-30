import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortTableItem } from "../../../components/admin/variants/sort-table-item";
import { addProduct } from "@/services/product.service";
import { useForm, Controller } from "react-hook-form";
import { setting, formats } from "@/utils/config-quill";
import IProduct from "@/interfaces/product/product.interface";
import generateSlug from "@/utils/generate-slug";
import Loading from "@/components/loading/loading";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { useGetCollections } from "@/hooks/use-collection";
import MultiSelect from "@/components/ui/multi-select";
import VariantForm from "@/components/admin/variants/variant-form";
import VariantDetail from "@/components/admin/variants/variant-detail";
import { Switch } from "@/components/ui/switch";

const AddProduct = () => {
  const [productVariants, setProductVariants] = useState<ISelectedVariant[]>(
    []
  );
  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const { data: collections, isLoading: ic } = useGetCollections();

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
    if (previewImages.length === 0 && productVariants.length === 0) {
      alert("Bắt buộc phải có ảnh chính hoặc của biến thể");
      return;
    }
    const res = await addProduct(previewImages, data, productVariants);
    if (res) {
      reset();
      setPreviewImages([]);
      setProductVariants([]);
    }
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
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="text-sm text-gray-600">
              Slug
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                className="custom-input w-full"
                {...register("slug")}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setValue("slug", generateSlug(productTitle));
                }}
                className="text-[13px] font-semibold bg-gray-100 flex-1 rounded-md px-3 py-2"
              >
                Generate
              </button>
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
                    <SortTableItem
                      main={true}
                      key={index}
                      file={file}
                      index={index}
                    />
                  ))}

                  <label
                    htmlFor="images"
                    className={`border ${
                      productVariants?.length > 0
                        ? " hover:cursor-not-allowed"
                        : "hover:cursor-pointer"
                    } border-gray-400 border-dashed rounded-md py-14 px-4 flex items-center justify-center ${
                      previewImages.length > 0
                        ? "col-span-1"
                        : "col-span-5 row-span-2"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="font-semibold text-center text-gray-300 text-lg">
                        Upload new image
                      </span>
                    </div>
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={productVariants?.length > 0}
                      onChange={(e) => handlePreviewImages(e.target.files)}
                      className="hidden"
                    />
                  </label>
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
        {productVariants?.length === 0 && (
          <div className="border border-gray-200 rounded-md p-4 bg-white flex  gap-3">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="" className="text-sm text-gray-600">
                Giá
              </label>
              <input
                type="number"
                className="custom-input w-full"
                {...register("price")}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="" className="text-sm text-gray-600">
                Sku
              </label>
              <input
                type="text"
                className="custom-input w-full"
                {...register("sku")}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="" className="text-sm text-gray-600">
                Số lượng
              </label>
              <input
                type="number"
                className="custom-input w-full"
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
          <div className="flex flex-col gap-2 ">
            <label htmlFor="collections" className="text-sm text-gray-600">
              Collections
            </label>
            <div className="flex flex-col gap-2 w-full max-h-[400px] overflow-y-auto">
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
                "Loading..."
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
