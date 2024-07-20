import Cart from "@/components/cart/Cart";
import ProductList from "@/components/products/ProductList";
import { CartContextProvider } from "@/context/CartContext";
import getMeals from "@/lib/products";

export default function Home() {
  const meals = getMeals();
  return (
    <main className="grid justify-items-center items-start gap-8 px-4 py-2 md:py-16 md:px-20 md:grid-cols-[1fr_auto]">
      <CartContextProvider>
        <ProductList products={meals} />
        <Cart />
      </CartContextProvider>
    </main>
  );
}
