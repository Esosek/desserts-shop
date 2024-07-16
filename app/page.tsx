import ProductList from "@/components/products/ProductList";
import getMeals from "@/lib/products";

export default function Home() {
  const meals = getMeals();
  return (
    <main className="py-16 px-20">
      <ProductList products={meals} />
    </main>
  );
}
