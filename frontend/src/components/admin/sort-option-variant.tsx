import { arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, PlusCircleIcon } from "lucide-react";
import { memo, useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import SortOptionVariantValue from "./sort-option-variant-value";
import { Button } from "../ui/button";
import IVariant from "@/interfaces/variant/variant.interface";
import IOption from "@/interfaces/variant/option.interface";
const SortOptionVariant = ({
  variant,
  onChange,
  onDelete,
  onChangeOption,
  onAddOption,
  onDeleteOption,
}: {
  variant: IVariant;
  onChange: (value: IVariant) => void;
  onDelete: (id: string) => void;
  onChangeOption: (
    variantId: string,
    option: IOption,
    newValue: string
  ) => void;
  onAddOption: (variantId: string) => void;
  onDeleteOption: (variantId, optionId) => void;
}) => {
  const [expandVariant, setExpandVariant] = useState(false);
  // Dùng file name là id
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: variant.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 100ms ease",
  };

  const handleDragOptionValue = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const oldIndex = variant.value.findIndex((ov) => ov.id === active.id);
    const newIndex = variant.value.findIndex((ov) => ov.id === over.id);
    console.log(oldIndex, newIndex);
    const newValue = arrayMove(variant.value, oldIndex, newIndex);
    onChange({
      ...variant,
      value: newValue,
    });
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="border border-gray-200 rounded-lg p-4 ">
        <div className="">
          {expandVariant || variant.name === "" ? (
            <>
              <div className="flex items-center gap-2">
                <span {...attributes} {...listeners}>
                  <GripVertical className="size-5" />
                </span>
                <div className="flex flex-col gap-1 flex-1">
                  <label htmlFor="" className=" opacity-60 font-medium">
                    Option name
                  </label>
                  <input
                    type="text"
                    className="custom-input py-2 font-medium "
                    value={variant.name}
                    onChange={(e) => {
                      e.stopPropagation();

                      onChange({
                        ...variant,
                        name: e.target.value,
                      });
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              {variant && variant.value.length > 0 && (
                <DndContext
                  collisionDetection={closestCenter}
                  onDragOver={handleDragOptionValue}
                >
                  <SortableContext
                    items={variant.value.map((opt) => opt.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col gap-3 mt-4">
                      {variant.value.map((ol) => {
                        return (
                          <SortOptionVariantValue
                            key={ol.id}
                            option={ol}
                            onChange={onChangeOption}
                            variant={variant}
                            onDelete={onDeleteOption}
                          />
                        );
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
                  onAddOption(variant.id);
                }}
                className="flex border ml-8 bordr-gray-300 py-2 px-4 mt-4 rounded-lg font-medium items-center gap-2 flex-1"
              >
                <PlusCircleIcon className="size-4" />
                <span>Add another value</span>
              </button>

              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(variant.id);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                variant="outline"
                className="mt-4 ml-8 py-1 font-semibold"
              >
                Delete
              </Button>
            </>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setExpandVariant(true);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex items-center gap-2 w-full"
            >
              <span {...attributes} {...listeners}>
                <GripVertical className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-start">{variant.name}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {variant?.value.map((opt) => {
                    return (
                      <div className="bg-gray-200 py-1 px-3 rounded font-bold text-[12px]">
                        {opt.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(SortOptionVariant);
