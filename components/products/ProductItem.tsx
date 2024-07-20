import Image from "next/image";

import iconCart from "@/public/assets/images/icon-add-to-cart.svg";

import { Product } from "@/types/product";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <li className="w-full">
      <div className="w-full rounded-md overflow-clip">
        <picture className="block relative h-60">
          <source srcSet={product.image.mobile} media="(max-width: 640px)" />
          <source
            srcSet={product.image.tablet}
            media="(min-width: 641px) and (max-width: 1023px)"
          />
          <source srcSet={product.image.desktop} media="(min-width: 1024px)" />
          <Image
            src={product.image.desktop}
            alt={`Image of ${product.name}`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 100vw, 100vw"
            className="object-cover"
          />
        </picture>
      </div>
      <button className="flex items-center gap-2 mx-auto bg-white border-rose-400 font-semibold text-sm border-[1px] rounded-full py-3 px-6 -translate-y-5 hover:text-red hover:border-red transition-colors duration-100">
        <Image src={iconCart} alt="Cart icon" />
        Add to Cart
      </button>
      <p className="text-sm text-rose-300 mb-1">{product.category}</p>
      <h2 className="font-semibold">{product.name}</h2>
      <p className="text-red font-semibold">${product.price.toPrecision(3)}</p>
    </li>
  );
}
