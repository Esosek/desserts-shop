import ProductList from "@/components/products/ProductList";
import getMeals from "@/lib/products";

export default function Home() {
  const meals = getMeals();
  return (
    <main>
      <ProductList products={meals} />
    </main>
  );
}
