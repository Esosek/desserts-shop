import { Product } from "@/types/Product.types";
import { ChangeEvent } from "react";

type ProductFilterProps = {
  products: Product[];
  onFilterChanged: (newFilter: string) => void;
};

export default function ProductFilter({
  products,
  onFilterChanged,
}: ProductFilterProps) {
  const categories = products.reduce((acc: string[], value) => {
    if (!acc.includes(value.category)) {
      acc.push(value.category);
    }
    return acc;
  }, []);

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    onFilterChanged(event.currentTarget.value);
  }
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="filter-select" className="text-sm">
        Filter by category
      </label>
      <select
        id="filter-select"
        name="filter-select"
        onChange={handleFilterChange}
        className="p-2 rounded-md bg-rose-100"
      >
        <option value="none">None</option>
        {categories.map((cat) => (
          <option key={cat.toLowerCase()} value={cat.toLowerCase()}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
