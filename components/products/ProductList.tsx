import { Meal } from "@/types/meal";

type ProductListProps = {
  meals: Meal[];
};

export default function ProductList(props: ProductListProps) {
  return (
    <div>
      <h1 className="font-bold">Desserts</h1>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}
