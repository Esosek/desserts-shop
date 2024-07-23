export type Product = {
  id: number;
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
  name: string;
  category: string;
  price: number;
};

export type ProductQuantity = {
  product: Product;
  quantity: number;
};
