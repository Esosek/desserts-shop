"use client";
import Image from "next/image";
import { useContext, useMemo } from "react";

import { Product } from "@/types/Product.types";
import AddProductBtn from "./AddProductBtn";
import CartContext from "@/context/CartContext";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  const { items } = useContext(CartContext);

  const quantity = useMemo(() => {
    const item = items.find((item) => item.product.id === product.id);
    return item ? item.quantity : 0;
  }, [items, product.id]);

  const isSelected = useMemo(() => quantity > 0, [quantity]);

  return (
    <li className="w-full">
      <div
        className={`${
          isSelected ? "ring-2 ring-red-400" : undefined
        } w-full rounded-md overflow-clip`}
      >
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
      <AddProductBtn product={product} quantity={quantity ?? 0} />
      <p className="text-sm text-rose-300 mb-1">{product.category}</p>
      <h2 className="font-semibold">{product.name}</h2>
      <p className="text-red-400 font-semibold">${product.price.toFixed(2)}</p>
    </li>
  );
}
