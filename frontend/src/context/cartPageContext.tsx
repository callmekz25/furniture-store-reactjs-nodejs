import { createContext, useState } from "react";
export const PageContext = createContext<
  { isCartPage: boolean; setIsCartPage: (value: boolean) => void } | undefined
>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCartPage, setIsCartPage] = useState(false);
  return (
    <PageContext.Provider value={{ isCartPage, setIsCartPage }}>
      {children}
    </PageContext.Provider>
  );
};
