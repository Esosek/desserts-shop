import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "../ProductList";
import { Product } from "@/types/Product.types";

describe("ProductList", () => {
  const mockProducts: Product[] = [
    {
      id: 0,
      image: {
        thumbnail: "/assets/images/image-creme-brulee-thumbnail.jpg",
        mobile: "/assets/images/image-creme-brulee-mobile.jpg",
        tablet: "/assets/images/image-creme-brulee-tablet.jpg",
        desktop: "/assets/images/image-creme-brulee-desktop.jpg",
      },
      name: "Test product 1",
      category: "testing category",
      price: 99.9,
    },
    {
      id: 1,
      image: {
        thumbnail: "/assets/images/image-creme-brulee-thumbnail.jpg",
        mobile: "/assets/images/image-creme-brulee-mobile.jpg",
        tablet: "/assets/images/image-creme-brulee-tablet.jpg",
        desktop: "/assets/images/image-creme-brulee-desktop.jpg",
      },
      name: "Test product 2",
      category: "category 2",
      price: 50.25,
    },
  ];
  test("renders all products if there is no filter", () => {
    render(<ProductList products={mockProducts} />);
    const productElements = screen.getAllByRole("listitem");

    expect(productElements.length).toBe(2);
  });

  test("does NOT render any list items if products are empty", () => {
    render(<ProductList products={[]} />);
    const productElements = screen.queryAllByRole("listitem");

    expect(productElements.length).toBe(0);
  });

  test("renders only single category when filtered", async () => {
    render(<ProductList products={mockProducts} />);

    await userEvent.selectOptions(screen.getByRole("combobox"), ["category 2"]);
    const productElements = screen.getAllByRole("listitem");

    expect(productElements.length).toBe(1);
  });
});
