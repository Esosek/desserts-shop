import Image from "next/image";

import iconCart from "@/public/assets/images/icon-add-to-cart.svg";

import { Product } from "@/types/product";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <li className="w-full sm:max-w-60">
      <div className="relative h-60 w-full rounded-md overflow-clip">
        <Image
          src={product.image.desktop}
          alt={`Image of ${product.name}`}
          fill
          priority
          className="object-cover"
        />
      </div>
      <button className="flex items-center gap-2 mx-auto bg-white border-rose-400 font-semibold text-sm border-[1px] rounded-full py-3 px-6 -translate-y-5 hover:text-red hover:border-red transition-colors duration-100">
        <Image src={iconCart} alt="Cart icon" />
        Add to Cart
      </button>
      <p className="text-sm text-rose-300 mb-1">{product.category}</p>
      <p className="font-semibold">{product.name}</p>
      <p className="text-red font-semibold">${product.price.toPrecision(3)}</p>
    </li>
  );
}
