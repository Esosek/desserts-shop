import { Product } from "@/types/product";
import ProductItem from "./ProductItem";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h1 className="font-bold text-3xl my-6">Desserts</h1>
      <ul className="flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
