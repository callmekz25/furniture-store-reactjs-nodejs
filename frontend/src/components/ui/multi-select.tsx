import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MultiSelect = ({
  className,
  options,
}: {
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleValue = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const getLabel = () => {
    if (selected.length === 0) return "Chọn...";
    if (selected.includes("all")) return "Tất cả";
    return selected
      .map((val) => {
        const opt = options.find((o) => o.value === val);
        return opt?.label;
      })
      .join(", ");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("min-w-[250px] justify-between px-3", className)}
        >
          {getLabel()}
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
              checked={selected.includes(option.value)}
            />
            <span className="text-sm font-medium block px-2">
              {option.label}
            </span>
            {selected.includes(option.value) && (
              <Check className="size-4 opacity-60" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
