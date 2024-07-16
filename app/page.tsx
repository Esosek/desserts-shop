import ProductList from "@/components/products/ProductList";
import getMeals from "@/lib/products";

export default function Home() {
  const meals = getMeals();
  return (
    <main className="px-4 py-2 md:py-16 md:px-20">
      <ProductList products={meals} />
    </main>
  );
}
