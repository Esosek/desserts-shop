"use client";
import Image from "next/image";
import { useContext } from "react";

import CartContext from "@/context/CartContext";
import iconCheck from "@/public/assets/images/icon-order-confirmed.svg";
import PrimaryButton from "../ui/PrimaryButton";

type ConfirmModalProps = {
  totalPrice: string;
  onClose: () => void;
};

export default function ConfirmModal({
  totalPrice,
  onClose,
}: ConfirmModalProps) {
  const cartCtx = useContext(CartContext);
  return (
    <>
      <div
        onClick={onClose}
        className="fixed top-0 bottom-0 w-full bg-black/50"
        data-testid="backdrop"
      ></div>
      <div className="fixed bottom-0 bg-white w-full max-w-md rounded-xl py-4 px-8 sm:bottom-auto">
        <Image src={iconCheck} alt="Checkout icon" className="size-8 my-4" />
        <h2 className="font-bold my-2 text-3xl">Order Confirmed</h2>
        <p className="text-rose-400 text-sm">We hope you enjoy your food!</p>
        <div className="bg-rose-100 px-4 rounded-md mt-6 text-sm">
          <ul className="overflow-y-scroll max-h-64">
            {cartCtx.items.map((item) => (
              <li
                key={item.product.id}
                className="grid grid-cols-[auto_1fr_auto] gap-3 items-center border-b-[1px] border-rose-300/25 py-4"
              >
                <div className="relative size-10 rounded-md overflow-clip">
                  <Image
                    src={item.product.image.thumbnail}
                    alt={`Thumbnail of ${item.product.name}`}
                    fill
                    sizes="2.5rem"
                  />
                </div>
                <div>
                  <p className="mb-1 font-semibold text-ellipsis line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-red-400 font-semibold">
                    {item.quantity}x
                    <span className="ml-4 text-rose-400 font-normal">
                      @ ${item.product.price.toFixed(2)}
                    </span>
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <p className="flex justify-between items-center py-4">
            Order Total <span className="font-bold text-lg">${totalPrice}</span>
          </p>
        </div>
        <PrimaryButton onClick={onClose}>Start New Order</PrimaryButton>
      </div>
    </>
  );
}
