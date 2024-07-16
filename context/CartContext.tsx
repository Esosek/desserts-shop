import { createContext, type PropsWithChildren } from "react";

type CartContextType = {};

const defaultValue = {};

const CartContext = createContext<CartContextType>(defaultValue);

export function CartContextProvider({ children }: PropsWithChildren) {
  return (
    <CartContext.Provider value={defaultValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
