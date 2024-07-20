import { Product } from "@/types/product";
import ProductItem from "./ProductItem";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl my-6">Desserts</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-5 gap-y-7">
        {products.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
