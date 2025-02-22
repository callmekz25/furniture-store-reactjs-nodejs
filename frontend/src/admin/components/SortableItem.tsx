import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({
  file,
  index,
}: {
  file: File;
  index: number;
}) => {
  // Dùng file name là id
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 100ms ease",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative p-2 border border-gray-300 rounded-md flex items-center justify-center cursor-grab overflow-hiddend ${
        index === 0
          ? "row-span-2 col-span-2 border-gray-200"
          : "border-gray-300"
      } flex items-center justify-center cursor-grab`}
    >
      {index === 5 ? (
        <span className="text-center">+{file.length - 5} more</span>
      ) : (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt=""
            className="object-contain w-full h-full"
          />
          {/* Overlay khi hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </>
      )}
    </div>
  );
};
