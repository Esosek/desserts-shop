"use client";

import { Product } from "@/types/product";
import ProductItem from "./ProductItem";
import ProductFilter from "./PoductFilter";
import { useState } from "react";

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
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl my-6">Desserts</h1>
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
