import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortTableItem } from "./sort-table-item";
import { ChevronDownIcon } from "lucide-react";
import { useContext, useState } from "react";
import { ProductVariantsContext } from "@/context/product-variants.context";
import { Checkbox } from "@/components/ui/checkbox";

const VariantDetail = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { productVariants, setProductVariants } = useContext(
    ProductVariantsContext
  )!;
  const parentAttrName = Object.keys(productVariants?.[0]?.attributes || {})[0];

  const groupedVariants = productVariants?.reduce((acc, variant) => {
    const key = variant.attributes[parentAttrName];

    if (!acc[key]) acc[key] = [];
    acc[key].push(variant);
    return acc;
  }, {} as Record<string, ISelectedVariant[]>);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );
  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Update images for each variants
  const handleUploadImages = (index: number, files: FileList) => {
    if (!files) return;

    const updated = productVariants.map((variant, i) =>
      i === index
        ? {
            ...variant,
            images: [
              ...(Array.isArray(variant.images) ? variant.images : []),
              ...Array.from(files),
            ],
          }
        : variant
    );
    setProductVariants(updated);
  };
  // Update fields in variants like price, quantity,... base on index
  const handleChangeFieldVariants = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = productVariants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setProductVariants(updated);
  };
  const handleDeleteImages = (index: number) => {
    const updated = productVariants.map((variant, i) => {
      if (i === index) {
        const newImages = variant.images.filter((img) => {
          const file = typeof img === "string" ? img : img.name;
          return !selectedImages.includes(file);
        });
        return { ...variant, images: newImages };
      }
      return variant;
    });
    setProductVariants(updated);
    setSelectedImages([]);
  };
  const handleDragOverVariantImages = (index: number, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const updated = productVariants.map((variant, i) => {
      if (i !== index) return variant;

      const oldIndex = variant.images.findIndex((img) =>
        typeof img === "string" ? img === active.id : img.name === active.id
      );
      const newIndex = variant.images.findIndex((img) =>
        typeof img === "string" ? img === over.id : img.name === over.id
      );

      return {
        ...variant,
        images: arrayMove(variant.images, oldIndex, newIndex),
      };
    });

    setProductVariants(updated);
  };

  return (
    <div>
      <div className="mt-7 flex flex-col">
        <div className="py-3 flex items-center border-t border-gray-300 px-7">
          <p className="text-sm text-gray-500 flex-[0_0_40%] max-w-[40%]">
            Variant
          </p>
          <p className="text-sm text-gray-500 flex-[0_0_20%] max-w-[20%]">
            Giá
          </p>
          <p className="text-sm text-gray-500 flex-[0_0_25%] max-w-[25%]">
            SKU
          </p>
          <p className="text-sm text-gray-500 flex-[0_0_15%] max-w-[15%]">
            Số lượng
          </p>
        </div>
      </div>
      {Object.entries(groupedVariants ?? {}).map(([parentValue, variants]) => (
        <div key={parentValue} className="border-t px-6 py-4 text-sm">
          <button
            type="button"
            onClick={() => toggleGroup(parentValue)}
            className="flex items-center justify-between w-full text-gray-700"
          >
            <span className="font-semibold">
              {parentValue} ({variants.length} variants)
            </span>
            <ChevronDownIcon
              className={`size-4 transition-transform ${
                expandedGroups[parentValue] ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedGroups[parentValue] && (
            <div className="mt-4 flex flex-col gap-4">
              {variants.map((variant) => {
                const globalIndex = productVariants.findIndex(
                  (pv) =>
                    JSON.stringify(pv.attributes) ===
                    JSON.stringify(variant.attributes)
                );

                return (
                  <div className="flex flex-col gap-2" key={globalIndex}>
                    <div className="py-3 flex  box-border items-center border-t w-full  border-gray-300 ">
                      <div className="flex-[0_0_40%] max-w-[40%]">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            {selectedImages?.length > 0 ? (
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="selected-all"
                                  checked={
                                    selectedImages.length > 0 &&
                                    selectedImages.length ===
                                      variant.images.length
                                  }
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedImages(
                                        variant.images.map((img) =>
                                          typeof img === "string"
                                            ? img
                                            : img.name
                                        )
                                      );
                                    } else {
                                      setSelectedImages([]);
                                    }
                                  }}
                                />
                                <label
                                  htmlFor="selected-all"
                                  className="text-sm"
                                >
                                  {selectedImages.length} ảnh
                                </label>
                              </div>
                            ) : (
                              <label
                                htmlFor=""
                                className="text-sm text-gray-600"
                              >
                                Hình ảnh
                              </label>
                            )}
                            {selectedImages?.length > 0 && (
                              <button
                                onClick={() => handleDeleteImages(globalIndex)}
                                className="text-[13px] font-medium text-red-600"
                              >
                                Xoá
                              </button>
                            )}
                          </div>
                          <DndContext
                            collisionDetection={closestCenter}
                            onDragOver={(e) =>
                              handleDragOverVariantImages(globalIndex, e)
                            }
                          >
                            <SortableContext
                              items={variant.images.map((file) =>
                                typeof file === "string" ? file : file.name
                              )}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="flex flex-wrap gap-2">
                                {variant.images.map((file, idx) => (
                                  <SortTableItem
                                    selectedImages={selectedImages}
                                    setSelectedImages={setSelectedImages}
                                    key={
                                      typeof file !== "string"
                                        ? file.name
                                        : file
                                    }
                                    file={file}
                                    index={idx}
                                  />
                                ))}

                                <label
                                  htmlFor={`upload-${globalIndex}`}
                                  className={`border hover:cursor-pointer  border-gray-300 border-dashed rounded-md py-5 px-4 max-w-[100px] flex items-center justify-center ${
                                    (variant?.images.length || 0) > 0
                                      ? "col-span-1"
                                      : "col-span-5 row-span-2"
                                  }`}
                                >
                                  <div className="flex items-center justify-center">
                                    <span className="font-normal text-center text-gray-300 text-md">
                                      Upload image
                                    </span>
                                  </div>
                                  <input
                                    id={`upload-${globalIndex}`}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                      handleUploadImages(
                                        globalIndex,
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
                      <div className="flex flex-col">
                        <p className="text-[15px] uppercase font-semibold">
                          {Object.entries(variant.attributes)
                            .map(([, value]) => `${value}`)
                            .join(" - ")}
                        </p>
                        <div className="flex w-full mt-2">
                          <div className="flex flex-col gap-1 px-1 w-[35%]">
                            <label
                              className="text-sm font-medium text-gray-500"
                              htmlFor={`price-${globalIndex}`}
                            >
                              Giá
                            </label>
                            <input
                              id={`price-${globalIndex}`}
                              type="text"
                              value={variant.price?.toLocaleString("vi-VN")}
                              onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "");
                                handleChangeFieldVariants(
                                  globalIndex,
                                  "price",
                                  Number(raw)
                                );
                              }}
                              className="custom-input w-full"
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-[40%]">
                            <label
                              className="text-sm font-medium text-gray-500"
                              htmlFor={`sku-${globalIndex}`}
                            >
                              Sku
                            </label>
                            <input
                              id={`sku-${globalIndex}`}
                              type="text"
                              value={variant.sku}
                              onChange={(e) =>
                                handleChangeFieldVariants(
                                  globalIndex,
                                  "sku",
                                  e.target.value
                                )
                              }
                              className="custom-input w-full"
                            />
                          </div>
                          <div className="flex flex-col gap-1 px-1  w-[25%]">
                            <label
                              className="text-sm font-medium text-gray-500"
                              htmlFor={`quantity-${globalIndex}`}
                            >
                              Số lượng
                            </label>
                            <input
                              id={`quantity-${globalIndex}`}
                              type="number"
                              value={variant.quantity}
                              onChange={(e) =>
                                handleChangeFieldVariants(
                                  globalIndex,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="custom-input w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VariantDetail;
