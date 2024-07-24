import { ReactNode } from "react";

import productData from "@/data/data.json";
import CartContext from "./CartContext";
import { Product, ProductQuantity } from "@/types/Product.types";

type MockCartContextProviderType = {
  children: ReactNode;
  items?: ProductQuantity[];
  addItem?: (product: Product) => void;
  removeItem?: (productId: number, quantity?: number) => void;
  clearCart?: () => void;
};

export default function MockCartContextProvider({
  children,
  items = [],
  addItem = () => {},
  removeItem = () => {},
  clearCart = () => {},
}: MockCartContextProviderType) {
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const mockData = [
  { product: { ...productData[0], id: 0 }, quantity: 2 },
  { product: { ...productData[1], id: 1 }, quantity: 1 },
];
