"use client";
import { useState } from "react";

import { Product } from "@/types/Product.types";
import ProductItem from "./ProductItem";
import ProductFilter from "./PoductFilter";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("none");

  const filteredProducts =
    categoryFilter === "none"
      ? products
      : products.filter(
          (product) => product.category.toLocaleLowerCase() === categoryFilter
        );

  function onFilterChanged(newFilter: string) {
    setCategoryFilter(newFilter);
  }
  return (
    <div className="w-full">
      <div className="flex flex-col justify-between items-center gap-2 my-6 md:flex-row">
        <h1 className="font-bold text-3xl">Desserts</h1>
        <ProductFilter products={products} onFilterChanged={onFilterChanged} />
      </div>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-5 gap-y-7">
        {filteredProducts.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
