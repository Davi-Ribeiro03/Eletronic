import { createContext } from "react";
import { useState, ReactNode } from "react";
import { ToastContextType } from "./ContextTypes";

export const ToastContext = createContext({} as ToastContextType);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastActive, setToastActive] = useState<boolean>(false);

  return (
    <ToastContext.Provider value={{ toastActive, setToastActive }}>
      {children}
    </ToastContext.Provider>
  );
};
