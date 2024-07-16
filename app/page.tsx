import ProductList from "@/components/products/ProductList";
import getMeals from "@/lib/meals";

export default function Home() {
  const meals = getMeals();
  return (
    <main>
      <ProductList meals={meals} />
    </main>
  );
}
