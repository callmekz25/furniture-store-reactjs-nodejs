import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import IOption from "@/interfaces/variant/option.interface";

const generateProductVariants = (
  variants: {
    [key: string]: IOption[];
  },
  oldVariants: ISelectedVariant[] = []
): ISelectedVariant[] => {
  const variantKeys = Object.keys(variants);

  // Combinations is array sub array
  const combinations = variantKeys.reduce(
    (
      acc: {
        id: string;
        name: string;
        value: string;
      }[][],
      key: string
    ) => {
      const values = variants[key]
        .filter((v) => v.value.trim() !== "")
        .map((v) => ({
          id: v.id,
          name: key,
          value: v.value,
        }));

      if (acc.length === 0) return values.map((v) => [v]);

      return acc.flatMap((existing) =>
        values.map((newValue) => [...existing, newValue])
      );
    },
    []
  );
  console.log(combinations);

  // Map old variant with key attribute and value is selectedVariant
  const oldMap = new Map<string, ISelectedVariant>();
  oldVariants.forEach((variant) => {
    const key = JSON.stringify(variant.attributes);
    oldMap.set(key, variant);
  });
  console.log(oldMap);

  return combinations.map((variantCombo) => {
    const attributes = variantCombo.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {} as { [key: string]: string });

    const key = JSON.stringify(attributes);
    const old = oldMap.get(key);

    if (old) {
      return old;
    }
    // Default init variant
    return {
      attributes,
      quantity: 50,
      price: 1000,
      fakePrice: 2000,
      sku: "",
      images: [],
    };
  });
};

export default generateProductVariants;
