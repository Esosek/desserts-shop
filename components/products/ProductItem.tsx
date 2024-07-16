import Image from "next/image";

import iconCart from "@/public/assets/images/icon-add-to-cart.svg";

import { Product } from "@/types/product";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <li>
      <div className="relative size-60 rounded-md overflow-clip">
        <Image
          src={product.image.desktop}
          alt={`Image of ${product.name}`}
          fill
          priority
        />
      </div>
      <button className="flex items-center gap-2 mx-auto bg-white border-rose-500 font-semibold text-sm border-[1px] rounded-full py-3 px-6 -translate-y-5 hover:text-red hover:border-red transition-colors duration-100">
        <Image src={iconCart} alt="Cart icon" />
        Add to Cart
      </button>
      <p>{product.category}</p>
      <p>{product.name}</p>
      <p>{product.price}</p>
    </li>
  );
}
