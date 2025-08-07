import { Checkbox } from "@/components/ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

export const SortTableItem = ({
  file,
  index,
  main,
  selectedImages,
  setSelectedImages,
}: {
  file: File | string;
  index: number;
  main?: boolean;
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
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
      className={`relative  border border-gray-300 w-full h-full rounded-md flex items-center justify-center cursor-grab overflow-hidden ${
        main ? "" : "max-w-[100px]"
      }`}
    >
      {index === 100 ? (
        <span className="text-center">+{previewUrl.length - 5} more</span>
      ) : (
        <div className="relative group w-full h-full">
          <img
            src={previewUrl}
            alt="Ảnh sản phẩm"
            className="object-contain w-full h-full"
          />

          <div className="absolute pointer-events-none inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <Checkbox
            checked={selectedImages.includes(id)}
            onPointerDown={(e) => e.stopPropagation()}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedImages((prev) => [...prev, id]);
              } else {
                setSelectedImages((prev) => prev.filter((url) => url !== id));
              }
            }}
            className="absolute bg-white top-2 left-2 z-10 
           opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        </div>
      )}
    </div>
  );
};
