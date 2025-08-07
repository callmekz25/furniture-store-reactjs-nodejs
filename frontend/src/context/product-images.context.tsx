import React, { createContext, useState } from "react";
type ProductImagesContextType = {
  images: (string | File)[];
  setImages: React.Dispatch<React.SetStateAction<(string | File)[]>>;
};

export const ProductImagesContext = createContext<
  ProductImagesContextType | undefined
>(undefined);

export const ProductImagesProvider = ({
  initial,
  children,
}: {
  initial: (string | File)[];
  children: React.ReactNode;
}) => {
  const [images, setImages] = useState<(string | File)[]>(initial);
  return (
    <ProductImagesContext.Provider value={{ images, setImages }}>
      {children}
    </ProductImagesContext.Provider>
  );
};
