"use client";
import Image from "next/image";
import { useContext } from "react";

import iconCarbonNeutral from "@/public/assets/images/icon-carbon-neutral.svg";

import EmptyCart from "./EmptyCart";
import CartContext from "@/context/CartContext";
import CartItem from "./CartItem";
import ConfirmModal from "./ConfirmModal";
import PrimaryButton from "../ui/PrimaryButton";

export default function Cart() {
  const cartItems = useContext(CartContext).items;
  const cartItemQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    .toFixed(2);

  const handleConfirm = () => {};

  let content: JSX.Element | JSX.Element[] = <EmptyCart />;

  if (cartItems.length > 0) {
    content = (
      <>
        {cartItems.map((item) => (
          <CartItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
        <div className="flex justify-between items-center my-4">
          <p className="text-sm">Order Total</p>
          <p className="text-lg font-bold">${totalPrice}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm bg-rose-50 rounded-md p-3">
          <Image src={iconCarbonNeutral} alt="Tree icon" />
          <p>
            This is a <span className="font-semibold">carbon-neutral</span>{" "}
            delivery
          </p>
        </div>
        <PrimaryButton onClick={handleConfirm}>Confirm Order</PrimaryButton>
      </>
    );
  }
  return (
    <>
      <ConfirmModal onClose={() => {}} />
      <div className=" bg-white my-4 px-6 w-full rounded-md md:my-0 md:w-auto md:min-w-96">
        <h2 className="justify-self-start text-red-400 text-2xl font-bold mt-6 mb-2">
          Your Cart ({cartItemQuantity})
        </h2>
        {content}
      </div>
    </>
  );
}
