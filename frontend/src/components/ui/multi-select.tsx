import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IOptionMultiSelect } from "@/interfaces/multi-select/option.interface";

const MultiSelect = ({
  selected,
  onChange,
  className,
  options,
}: {
  selected: IOptionMultiSelect[];
  onChange: (value: IOptionMultiSelect[]) => void;
  className?: string;
  options: IOptionMultiSelect[];
}) => {
  const selectedId = selected.map((v) => v._id);

  const toggleValue = (id: string) => {
    const exists = selectedId.includes(id);

    let newValue: IOptionMultiSelect[];

    if (exists) {
      newValue = selected.filter((item) => item._id !== id);
    } else {
      const found = options.find((o) => o._id === id);
      if (!found) return;
      newValue = [...selected, found];
    }

    onChange(newValue);
  };

  const removeOption = (id: string) => {
    const newValue = selected.filter((item) => item._id !== id);
    onChange(newValue);
  };

  const getOptions = () => {
    if (!selected || selected.length === 0)
      return [
        {
          name: "Chọn",
          _id: "select",
        },
      ];
    return selected;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "h-auto hover:bg-white justify-start flex flex-wrap px-3",
            className
          )}
        >
          {getOptions().map((option) => (
            <div
              key={option._id}
              className={`flex items-center font-semibold gap-2 ${
                option.name !== "Chọn" ? "rounded bg-gray-100 p-1.5" : ""
              }`}
            >
              {option.name}
              {option.name !== "Chọn" && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    removeOption(option._id);
                  }}
                >
                  <XMarkIcon />
                </span>
              )}
            </div>
          ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[--radix-popover-trigger-width] p-1 max-h-[350px] overflow-y-auto">
        {options.map((option) => (
          <div
            key={option._id}
            className="flex items-center hover:bg-gray-100 justify-between py-1.5 px-[2px] rounded-md transition-all duration-300 cursor-pointer"
            onClick={() => toggleValue(option._id)}
          >
            <Checkbox
              className="hidden"
              checked={selectedId.includes(option._id)}
            />
            <span className="text-sm font-medium block px-2">
              {option.name}
            </span>
            {selectedId.includes(option._id) && (
              <Check className="size-4 opacity-60" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
