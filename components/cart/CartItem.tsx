import { useContext } from "react";

import CartContext from "@/context/CartContext";
import { Product } from "@/types/product";

type CartItemProps = {
  product: Product;
  quantity: number;
};

export default function CartItem({ product, quantity }: CartItemProps) {
  const { removeItem } = useContext(CartContext);
  const totalProductPrice = (product.price * quantity).toFixed(2);

  const handleRemoveClick = () => removeItem(product.id, quantity);

  return (
    <div className="flex justify-between items-center border-b-[1px] border-rose-100 py-4">
      <div className="text-sm">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="space-x-2">
          <span className="text-red-400 font-semibold">{quantity}x </span>
          <span className="text-rose-400">@ ${product.price.toFixed(2)} </span>
          <span className="text-rose-500 font-semibold">
            ${totalProductPrice}
          </span>
        </p>
      </div>

      <button
        onClick={handleRemoveClick}
        className="group rounded-full border-2 p-[2px] border-rose-300 hover:border-rose-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
          className="fill-rose-300 group-hover:fill-rose-500"
        >
          <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
        </svg>
      </button>
    </div>
  );
}
