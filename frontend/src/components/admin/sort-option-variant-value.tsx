import IOption from "@/interfaces/variant/option.interface";
import IVariant from "@/interfaces/variant/variant.interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, TrashIcon } from "lucide-react";
import { memo } from "react";
const SortOptionVariantValue = ({
  option,
  variant,
  onChange,
  onDelete,
}: {
  option: IOption;
  variant: IVariant;
  onChange: (variantId: string, option: IOption, newValue: string) => void;
  onDelete: (variantId: string, optionId: string) => void;
}) => {
  // Dùng file name là id
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 100ms ease",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="pl-2">
        <div className="flex items-center gap-2">
          <span {...attributes} {...listeners}>
            <GripVertical className="size-4" />
          </span>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="" className=" opacity-60 font-medium">
              Option value
            </label>
            <div className="relative">
              <input
                type="text"
                className="custom-input py-2 pr-8 w-full font-medium"
                value={option.value}
                onChange={(e) => {
                  e.stopPropagation();

                  onChange(variant.id, option, e.target.value);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                onPointerDown={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  onDelete(variant.id, option.id);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className=" absolute right-4 top-[50%] -translate-y-1/2"
              >
                <TrashIcon className="size-4 " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(SortOptionVariantValue);
