"use client";
import Image from "next/image";
import { useContext } from "react";

import { Product } from "@/types/Product.types";
import iconCart from "@/public/assets/images/icon-add-to-cart.svg";
import CartContext from "@/context/CartContext";

type AddProductBtnProps = {
  product: Product;
  quantity: number;
};

export default function AddProductBtn({
  product,
  quantity,
}: AddProductBtnProps) {
  const { addItem, removeItem } = useContext(CartContext);

  const handleDecrement = () => removeItem(product.id, 1);
  const handleAddItem = () => addItem(product);

  return quantity > 0 ? (
    <div className="flex items-center justify-between gap-2 min-w-40 w-fit mx-auto text-rose-50 bg-red-400 border-red-400 font-semibold text-sm border-[1px] rounded-full py-3 px-3 -translate-y-5">
      <button
        onClick={handleDecrement}
        className="group size-5 rounded-full border-[1px] border-rose-50 p-1 hover:bg-rose-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="2"
          fill="none"
          viewBox="0 0 10 2"
          className="group-hover:stroke-red-400"
        >
          <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
        </svg>
      </button>
      {quantity}
      <button
        onClick={handleAddItem}
        className="group size-5 rounded-full border-[1px] border-rose-50 p-1 hover:bg-rose-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
          className="group-hover:stroke-red-400"
        >
          <path
            fill="#fff"
            d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
          />
        </svg>
      </button>
    </div>
  ) : (
    <button
      onClick={handleAddItem}
      className="flex items-center justify-center gap-2 min-w-40 mx-auto bg-white border-rose-400 font-semibold text-sm border-[1px] rounded-full py-3 px-6 -translate-y-5 hover:text-red-400 hover:border-red transition-colors duration-100"
    >
      <Image src={iconCart} alt="Cart icon" />
      Add to Cart
    </button>
  );
}
