import { createContext, useState } from "react";
import { ProductsType } from "../types/ProductsType.type";
import { FormContextType, ProviderType } from "./ContextTypes";
import { v4 as uuid } from "uuid";

export const FormContext = createContext({} as FormContextType);

export const FormProvider = ({ children }: ProviderType) => {
  const [product, setProduct] = useState<ProductsType>({
    id: uuid(),
    name: "",
    image: "",
    description: "",
    value: 0,
    stock: 0,
    qtInCart: 0,
  });

  const initialProduct = {
    id: uuid(),
    name: "",
    image: "",
    description: "",
    value: 0,
    stock: 0,
    qtInCart: 0,
  };

  return (
    <FormContext.Provider value={{ product, setProduct, initialProduct }}>
      {children}
    </FormContext.Provider>
  );
};
