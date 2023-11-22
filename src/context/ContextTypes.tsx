import { ReactNode } from "react";
import { ProductsType } from "../types/ProductsType.type";

export type ProviderType = {
  children: ReactNode;
};

export type FormContextType = {
  product: ProductsType;
  setProduct: Function;
  initialProduct: ProductsType;
  // modalIsOpen: boolean;
  // setIsOpen: Function;
  // openModal: Function;
  // closeModal: Function;
};

export type CartContextType = {
  purchaseMade: boolean;
  setPurchaseMade: Function;
};

export type ToastContextType = {
  toastActive: boolean;
  setToastActive: Function;
};
