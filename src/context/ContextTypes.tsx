import { ReactNode } from "react";
import { ProductsType } from "../types/ProductsType.type";

export type ProviderType = {
  children: ReactNode;
};

export type FormContextType = {
  product: ProductsType;
  setProduct: Function;
  initialProduct: ProductsType;
};

export type CartContextType = {
  purchaseMade: boolean;
  setPurchaseMade: Function;
};

export type ToastContextType = {
  toastActive: boolean;
  setToastActive: Function;
};
