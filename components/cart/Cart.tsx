"use client";
import { useContext } from "react";

import EmptyCart from "./EmptyCart";
import CartContext from "@/context/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartItems = useContext(CartContext).items;
  const cartItemQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <div className=" bg-white my-4 px-6 pb-10 w-full rounded-md md:my-0 md:w-auto md:min-w-96">
      <h2 className="justify-self-start text-red text-2xl font-bold mt-6 mb-2">
        Your Cart ({cartItemQuantity})
      </h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
