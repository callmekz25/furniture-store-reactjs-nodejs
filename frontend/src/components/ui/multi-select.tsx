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

const MultiSelect = ({
  value,
  onChange,
  className,
  options,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
}) => {
  const toggleValue = (v: string) => {
    const newValue = value.includes(v)
      ? value.filter((item) => item !== v)
      : [...value, v];
    onChange(newValue);
  };

  const removeOption = (v: string) => {
    const newValue = value.filter((item) => item !== v);
    onChange(newValue);
  };

  const getOptions = () => {
    if (!value || value.length === 0)
      return [
        {
          label: "Chọn",
          value: "select",
        },
      ];

    return value.map((val) => {
      const opt = options.find((o) => o.value === val);
      return opt || { label: val, value: val };
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            " h-auto hover:bg-white justify-start flex  flex-wrap  px-3",
            className
          )}
        >
          {getOptions().map((option) => {
            return (
              <div
                key={option.value}
                className={`flex items-center font-semibold gap-2 ${
                  option.label !== "Chọn" ? "rounded bg-gray-100 p-1.5" : ""
                }`}
              >
                {option.label}
                {option.label !== "Chọn" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeOption(option.value);
                    }}
                  >
                    <XMarkIcon />
                  </button>
                )}
              </div>
            );
          })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[--radix-popover-trigger-width] p-1 max-h-[350px] overflow-y-auto">
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center hover:bg-gray-100 justify-between py-1.5 px-[2px] rounded-md transition-all duration-300 cursor-pointer"
            onClick={() => toggleValue(option.value)}
          >
            <Checkbox
              className="hidden"
              checked={value.includes(option.value)}
            />
            <span className="text-sm font-medium block px-2">
              {option.label}
            </span>
            {value.includes(option.value) && (
              <Check className="size-4 opacity-60" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
