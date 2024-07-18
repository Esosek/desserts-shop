import data from "@/data/data.json";

export default function getProducts() {
  return data.map((product, index) => ({ ...product, id: index }));
}
