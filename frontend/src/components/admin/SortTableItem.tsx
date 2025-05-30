import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

export const SortableItem = ({
  file,
  index,
  main = true,
}: {
  file: File | string;
  index: number;
  main: boolean;
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const id = typeof file === "string" ? file : file.name;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 100ms ease",
  };

  useEffect(() => {
    if (typeof file === "string") {
      setPreviewUrl(file);
    } else {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url); // Cleanup khi unmount
      };
    }
  }, [file]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative p-2 border border-gray-300 rounded-md flex items-center justify-center cursor-grab overflow-hidden ${
        main === false ? "size-20" : ""
      }`}
    >
      {index === 100 ? (
        <span className="text-center">+{previewUrl.length - 5} more</span>
      ) : (
        <>
          <img
            src={previewUrl}
            alt=""
            className="object-contain w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </>
      )}
    </div>
  );
};
