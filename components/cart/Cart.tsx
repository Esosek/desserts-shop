"use client";
import { useContext } from "react";

import EmptyCart from "./EmptyCart";
import CartContext from "@/context/CartContext";

export default function Cart() {
  const cartItemQuantity = useContext(CartContext).items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <div className=" bg-white my-4 px-6 pb-10 min-w-80 rounded-md md:my-0">
      <h2 className="justify-self-start text-red text-lg font-bold my-6">
        Your Cart ({cartItemQuantity})
      </h2>
      <EmptyCart />
    </div>
  );
}
