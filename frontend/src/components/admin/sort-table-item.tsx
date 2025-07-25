import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

export const SortTableItem = ({
  file,
  index,
}: {
  file: File | string;
  index: number;
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
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative p-2 border border-gray-300 w-full h-full rounded-md flex items-center justify-center cursor-grab overflow-hidden max-w-[100px]`}
    >
      {index === 100 ? (
        <span className="text-center">+{previewUrl.length - 5} more</span>
      ) : (
        <>
          <img
            src={previewUrl}
            alt=""
            className="object-contain  w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20 w-full opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </>
      )}
    </div>
  );
};
