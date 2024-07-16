import { Product } from "@/types/product";
import ProductItem from "./ProductItem";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h1 className="font-bold">Desserts</h1>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
