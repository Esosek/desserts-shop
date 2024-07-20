import Image from "next/image";

import iconCart from "@/public/assets/images/icon-add-to-cart.svg";
import iconIncrement from "@/public/assets/images/icon-increment-quantity.svg";
import iconDecrement from "@/public/assets/images/icon-decrement-quantity.svg";

type AddProductBtnProps = {
  quantity: number;
};

export default function AddProductBtn({ quantity }: AddProductBtnProps) {
  function handleDecrement() {}

  function handleIncrement() {}
  return quantity > 0 ? (
    <div className="flex items-center justify-between gap-2 min-w-40 w-fit mx-auto text-rose-50 bg-red-400 border-red-400 font-semibold text-sm border-[1px] rounded-full py-3 px-6 -translate-y-5">
      <button onClick={handleDecrement}>
        <Image src={iconDecrement} alt="Decrement icon" />
      </button>
      {quantity}
      <button
        onClick={handleIncrement}
        className="rounded-full border-[1px] border-rose-100 p-1"
      >
        <Image src={iconIncrement} alt="Increment icon" />
      </button>
    </div>
  ) : (
    <button className="flex items-center justify-center gap-2 min-w-40 mx-auto bg-white border-rose-400 font-semibold text-sm border-[1px] rounded-full py-3 px-6 -translate-y-5 hover:text-red-400 hover:border-red transition-colors duration-100">
      <Image src={iconCart} alt="Cart icon" />
      Add to Cart
    </button>
  );
}
