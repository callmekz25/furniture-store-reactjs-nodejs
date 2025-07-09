import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { useEffect, useState } from "react";

interface Props {
  variants: ISelectedVariant[];
  onSelectVariant: (value: ISelectedVariant | null) => void;
}

const ProductVariants = ({ variants, onSelectVariant }: Props) => {
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [selectedVariant, setSelectedVariant] =
    useState<ISelectedVariant | null>(null);

  const attributeNames = variants[0] ? Object.keys(variants[0].attributes) : [];

  const attributeValues = attributeNames.reduce((acc, name) => {
    const values = Array.from(
      new Set(variants.map((v) => v.attributes[name]).filter(Boolean))
    );
    acc[name] = values;
    return acc;
  }, {} as Record<string, string[]>);

  const findVariantByAttributes = (attrs: Record<string, string>) =>
    variants.find((v) =>
      attributeNames.every((name) => v.attributes[name] === attrs[name])
    ) || null;

  const updateSelectedVariant = (attrs: Record<string, string>) => {
    const variant = findVariantByAttributes(attrs);
    setSelectedVariant(variant);
    onSelectVariant(variant);
  };

  const getFirstValidValue = (
    name: string,
    baseAttrs: Record<string, string>
  ) => {
    for (const value of attributeValues[name] || []) {
      const testAttrs = { ...baseAttrs, [name]: value };
      const isValid = variants.some(
        (v) =>
          v.quantity > 0 &&
          attributeNames.every(
            (attr) => !testAttrs[attr] || v.attributes[attr] === testAttrs[attr]
          )
      );
      if (isValid) return value;
    }
    return null;
  };

  const handleSelect = (name: string, value: string) => {
    const index = attributeNames.indexOf(name);
    const updatedAttrs = { ...selectedAttributes, [name]: value };

    for (let i = index + 1; i < attributeNames.length; i++) {
      const nextAttr = attributeNames[i];
      const valid = getFirstValidValue(nextAttr, updatedAttrs);
      if (valid) updatedAttrs[nextAttr] = valid;
      else delete updatedAttrs[nextAttr];
    }

    setSelectedAttributes(updatedAttrs);
  };

  const isValueDisabled = (name: string, value: string) => {
    const index = attributeNames.indexOf(name);
    const previousAttrs = attributeNames.slice(0, index);
    const testAttrs = { ...selectedAttributes, [name]: value };

    return !variants.some(
      (v) =>
        v.quantity > 0 &&
        v.attributes[name] === value &&
        previousAttrs.every((prev) => v.attributes[prev] === testAttrs[prev])
    );
  };

  useEffect(() => {
    if (variants.length === 0) {
      setSelectedAttributes({});
      setSelectedVariant(null);
      onSelectVariant(null);
      return;
    }

    const initial = variants.find((v) => v.quantity > 0) || variants[0];
    setSelectedAttributes(initial.attributes);
    setSelectedVariant(initial);
    onSelectVariant(initial);
  }, [variants, onSelectVariant]);

  useEffect(() => {
    updateSelectedVariant(selectedAttributes);
  }, [selectedAttributes]);

  return (
    <div className="mt-4 flex flex-col gap-6 px-4">
      {attributeNames.map((name) => (
        <div key={name} className="flex items-center">
          <h4 className="min-w-[100px] text-sm font-semibold">{name}</h4>
          <div className="flex items-center gap-3 flex-wrap">
            {attributeValues[name].map((value) => {
              const isSelected =
                selectedAttributes[name] === value &&
                selectedVariant?.quantity > 0;
              const isDisabled = isValueDisabled(name, value);

              return (
                <button
                  key={value}
                  onClick={() => handleSelect(name, value)}
                  disabled={isDisabled}
                  className={`
                    border text-[12px] font-medium rounded px-3 py-2
                    ${
                      isSelected
                        ? "border-red-500 text-red-500"
                        : "border-gray-300"
                    }
                    ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;
