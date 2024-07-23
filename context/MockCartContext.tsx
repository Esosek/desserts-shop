import { ReactNode } from "react";

import { ProductQuantity } from "@/types/Product.types";
import { CartContextProvider } from "./CartContext";

export const mockCartContext = (
  children: ReactNode,
  initialValue: ProductQuantity[] = []
) => (
  <CartContextProvider initialValue={initialValue}>
    {children}
  </CartContextProvider>
);
