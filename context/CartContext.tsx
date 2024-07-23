"use client";
import { createContext, useState, type PropsWithChildren } from "react";
import { Product } from "@/types/Product.types";

type CartContextType = {
  items: { product: Product; quantity: number }[];
  addItem: (product: Product) => void;
  removeItem: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const defaultValue = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultValue);

export function CartContextProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<{ product: Product; quantity: number }[]>(
    []
  );

  function addItem(product: Product) {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      // Increase quantity
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + 1,
        };
        return updatedItems;
      }

      // Add new item
      return [...prevItems, { product: product, quantity: 1 }];
    });
  }

  function removeItem(id: number, quantity = 1) {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.product.id === id);

      if (itemIndex < -1) {
        return prevItems;
      }

      // Decrement quantity
      else if (prevItems[itemIndex].quantity > quantity) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity - quantity,
        };
        return updatedItems;
      }
      // Remove the item completely
      return prevItems.filter((item) => item.product.id !== id);
    });
  }

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
