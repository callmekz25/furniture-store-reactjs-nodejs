import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, PlusCircleIcon } from "lucide-react";
import { memo, useEffect } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import SortOptionVariantValue from "./sortOptionVariantValue";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addNameVariant,
  addOptionValue,
  updateIndexOption,
} from "@/redux/slices/variant.slice";
const SortOptionVariant = ({ variant }: { variant: object }) => {
  // Dùng file name là id
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: variant.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 100ms ease",
  };
  const optionValues = useAppSelector(
    (state) =>
      state.variant.variant.find((vr) => vr.id === variant.id)?.value || []
  );

  const dispatch = useAppDispatch();

  const handleDragOptionValue = (event) => {
    const { active, over } = event;
    console.log(active, over);

    if (!over || active.id === over.id) return;
    const oldIndex = optionValues.findIndex((ov) => ov.id === active.id);
    const newIndex = optionValues.findIndex((ov) => ov.id === over.id);
    console.log(oldIndex, newIndex);

    dispatch(
      updateIndexOption({
        variantId: variant.id,
        oldIndex: oldIndex,
        newIndex: newIndex,
      })
    );
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div className="border border-gray-200 rounded-lg p-4 ">
        <div className="flex items-center gap-2">
          <GripVertical className="size-5" />
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="">Option name </label>
            <input
              type="text"
              className="custom-input py-2"
              value={variant.name}
              onChange={(e) => {
                e.stopPropagation();
                dispatch(
                  addNameVariant({ id: variant.id, name: e.target.value })
                );
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        {optionValues && optionValues.length > 0 && (
          <DndContext
            collisionDetection={closestCenter}
            onDragOver={handleDragOptionValue}
          >
            {/* Định nghĩa danh sách có thể kéo thả, items phải là danh sách các id không trùng lặp và ổn định */}
            <SortableContext
              items={optionValues.map((ol) => ol.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3 mt-4">
                {optionValues.map((ol) => {
                  return (
                    <SortOptionVariantValue
                      key={ol.id}
                      optionValue={ol}
                      variant={variant}
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
            e.stopPropagation(); // Ngăn sự kiện lan truyền lên cha

            dispatch(addOptionValue({ variantId: variant.id }));
          }}
          className="flex border ml-8 bordr-gray-300 py-2 px-4 mt-4 rounded-lg font-medium items-center gap-2 flex-1"
        >
          <PlusCircleIcon className="size-4" />
          <span>Add options value</span>
        </button>
      </div>
    </div>
  );
};
export default memo(SortOptionVariant);
