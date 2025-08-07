import ISelectedVariant from "@/interfaces/product/selected-variant.interface";
import React, { createContext, useState } from "react";
type ProductVariantsContextType = {
  productVariants: ISelectedVariant[];
  setProductVariants: React.Dispatch<React.SetStateAction<ISelectedVariant[]>>;
};
export const ProductVariantsContext = createContext<
  ProductVariantsContextType | undefined
>(undefined);

export const ProductVariantsProvider = ({
  initial = [],
  children,
}: {
  initial: ISelectedVariant[] | [];
  children: React.ReactNode;
}) => {
  const [productVariants, setProductVariants] =
    useState<ISelectedVariant[]>(initial);
  return (
    <ProductVariantsContext.Provider
      value={{ productVariants, setProductVariants }}
    >
      {children}
    </ProductVariantsContext.Provider>
  );
};
