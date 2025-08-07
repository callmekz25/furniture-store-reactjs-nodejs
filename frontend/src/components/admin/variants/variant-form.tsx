import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortOptionVariant from "./sort-option-variant";
import { Plus, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractOptionVariantsFromAttributes } from "@/utils/extract-option-variants-from-attributes";
import { useContext, useEffect, useState } from "react";
import IVariant from "@/interfaces/variant/variant.interface";
import { v4 as uuidv4 } from "uuid";
import IOption from "@/interfaces/variant/option.interface";
import generateProductVariants from "@/utils/generate-variants";
import { ProductVariantsContext } from "@/context/product-variants.context";
const VariantForm = () => {
  const { productVariants, setProductVariants } = useContext(
    ProductVariantsContext
  );
  const [isHaveVariants, setIsHaveVariants] = useState(false);
  const [variants, setVariants] = useState<IVariant[]>([]);
  const handleDragOptionVariants = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const oldIndex = variants.findIndex((vr) => vr.id === active.id);
    const newIndex = variants.findIndex((vr) => vr.id === over.id);

    const newVariants = arrayMove(variants, oldIndex, newIndex);
    setVariants(newVariants);
  };
  useEffect(() => {
    if (productVariants && productVariants.length > 0) {
      const extract = extractOptionVariantsFromAttributes(productVariants);
      setVariants(extract);
    }
  }, [productVariants]);

  // Handle variant
  const handleChangeVariant = (updateVariant: IVariant) => {
    setVariants((prev) =>
      prev.map((vr) => (vr.id === updateVariant.id ? updateVariant : vr))
    );
  };

  const handleAddNewVariant = () => {
    const newVariant: IVariant = {
      id: uuidv4(),
      name: "",
      value: [],
    };
    setVariants((prev) => [...prev, newVariant]);
  };

  const handleDeleteVariant = (id) => {
    setVariants((prev) => prev.filter((vr) => vr.id !== id));
  };

  // Handle option of variant

  const handleChangeOption = (variantId, option: IOption, newValue) => {
    setVariants((prev) =>
      prev.map((vr) => {
        if (vr.id !== variantId) return vr;

        const updatedValues = vr.value.map((opt) =>
          opt.id === option.id ? { ...opt, value: newValue } : opt
        );

        return { ...vr, value: updatedValues };
      })
    );
  };

  const handleAddOption = (variantId) => {
    const newOption: IOption = {
      id: uuidv4(),
      value: "",
    };
    setVariants((prev) =>
      prev.map((vr) => {
        if (vr.id !== variantId) return vr;

        return {
          ...vr,
          value: [...vr.value, newOption],
        };
      })
    );
  };

  const handleDeleteOption = (variantId, optionId) => {
    const newVariants = variants.map((vr) => {
      if (vr.id !== variantId) return vr;
      return {
        ...vr,
        value: vr.value.filter((opt) => opt.id !== optionId),
      };
    });

    setVariants(newVariants);
    handleDoneVariants(newVariants);
  };

  const handleDoneVariants = (variants) => {
    // Variants  [{name: "Màu sắc", value: ["Đỏ", "Xám"]}] => {Màu sắc: ["Đỏ", "Xám"]}
    const attributes = variants.reduce(
      (
        acc: {
          [key: string]: IOption[];
        },
        variant
      ) => {
        acc[variant.name] = variant.value;
        return acc;
      },
      {}
    );
    // Just generate new variant keep old variant
    const productVariantsGenerate = generateProductVariants(
      attributes,
      productVariants
    );
    setProductVariants(productVariantsGenerate);
    console.log("Final product variants: ", productVariantsGenerate);
  };
  return (
    <div className="p-4">
      <p className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Variant Settings</span>
        <Button
          onClick={() => {
            setIsHaveVariants(true);
            handleAddNewVariant();
          }}
          type="button"
          variant="outline"
          className=" font-semibold flex items-center px-3 rounded-lg text-[13px]"
        >
          <Plus />
          Add Variant
        </Button>
      </p>
      <div className=" mt-4 rounded-lg text-sm  p-2 w-full">
        {variants && variants.length > 0 && (
          <>
            <DndContext
              collisionDetection={closestCenter}
              onDragOver={handleDragOptionVariants}
            >
              <SortableContext
                items={variants.map((vr) => vr.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3">
                  {variants.map((vr) => {
                    return (
                      <SortOptionVariant
                        key={vr.id}
                        variant={vr}
                        onChange={handleChangeVariant}
                        onDelete={handleDeleteVariant}
                        onChangeOption={handleChangeOption}
                        onAddOption={handleAddOption}
                        onDeleteOption={handleDeleteOption}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          </>
        )}
        {isHaveVariants && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddNewVariant();
            }}
            className="flex border bordr-gray-300 py-2 px-4 mt-4 rounded-lg font-medium items-center gap-2 w-full"
          >
            <PlusCircleIcon className="size-4" />
            <span>Add another options</span>
          </button>
        )}
        {variants && variants.length > 0 && (
          <div className="flex items-center justify-end mt-2">
            <Button
              onPointerDown={(e) => e.stopPropagation()}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDoneVariants(variants);
              }}
              className="text-sm py-1"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariantForm;
