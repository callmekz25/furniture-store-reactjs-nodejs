import { useAppDispatch } from "@/redux/hook";
import { updateOptionValue } from "@/redux/slices/variant.slice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { memo } from "react";
const SortOptionVariantValue = ({
  optionValue,
  variant,
}: {
  optionValue: {
    id: string;
    value: string;
  };
  variant: {
    id: string;
    name: string;
  };
}) => {
  // Dùng file name là id
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: optionValue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 100ms ease",
  };

  const dispatch = useAppDispatch();

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div className="pl-2">
        <div className="flex items-center gap-2">
          <GripVertical className="size-4" />
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">Option value </label>
            <input
              type="text"
              className="custom-input py-2"
              value={optionValue.value}
              onChange={(e) => {
                e.stopPropagation();
                dispatch(
                  updateOptionValue({
                    variantId: variant.id,
                    optionId: optionValue.id,
                    value: e.target.value,
                  })
                );
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(SortOptionVariantValue);
