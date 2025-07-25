import IVariant from "@/interfaces/variant/variant.interface";
import IOption from "@/interfaces/variant/option.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import { v4 as uuidv4 } from "uuid";
export function extractOptionVariantsFromAttributes(
  variants: ISelectedVariant[]
): IVariant[] {
  const attributeMap: Record<string, Set<string>> = {};

  variants.forEach((variant) => {
    Object.entries(variant.attributes).forEach(([key, value]) => {
      if (!attributeMap[key]) {
        attributeMap[key] = new Set();
      }
      attributeMap[key].add(value);
    });
  });

  const result: IVariant[] = Object.entries(attributeMap).map(
    ([key, valueSet]) => ({
      id: uuidv4(),
      name: key,
      value: Array.from(valueSet).map(
        (val) => ({ id: uuidv4(), value: val } as IOption)
      ),
    })
  );

  return result;
}
