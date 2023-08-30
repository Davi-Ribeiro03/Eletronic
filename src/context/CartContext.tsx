import React, { ReactNode, useState } from "react";
import { createContext } from "react";
import { CartContextType, ProviderType } from "./ContextTypes";

export const CartContext = createContext({} as CartContextType);

const CartProvider = ({ children }: ProviderType) => {
  const [purchaseMade, setPurchaseMade] = useState(false);

  return (
    <CartContext.Provider value={{ purchaseMade, setPurchaseMade }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
