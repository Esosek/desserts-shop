import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Product } from "@/types/Product.types";
import ProductItem from "../ProductItem";
import { CartContextProvider } from "@/context/CartContext";
import MockCartContextProvider from "@/context/MockCartContext";

describe("ProductItem", () => {
  const mockProduct: Product = {
    id: 0,
    image: {
      thumbnail: "/assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "/assets/images/image-creme-brulee-mobile.jpg",
      tablet: "/assets/images/image-creme-brulee-tablet.jpg",
      desktop: "/assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Test product",
    category: "testing",
    price: 99.9,
  };

  test("renders product category, name and price", () => {
    render(<ProductItem product={mockProduct} />);
    const nameElement = screen.getByText("Test product");
    const categoryElement = screen.getByText("testing");
    const priceElement = screen.getByText("$99.90");

    expect(nameElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test('renders "add to cart" button when product is NOT in cart', () => {
    render(
      <CartContextProvider>
        <ProductItem product={mockProduct} />
      </CartContextProvider>
    );
    const addCartButton = screen.getByRole("button", { name: /add to cart/i });

    expect(addCartButton).toBeInTheDocument();
  });

  test("renders quantity and control buttons when product is in cart", () => {
    render(
      <MockCartContextProvider items={[{ ...mockProduct, quantity: 3 }]}>
        <ProductItem product={mockProduct} />
      </MockCartContextProvider>
    );

    const decrementButton = screen.getByTestId("decrement-button");
    const incrementButton = screen.getByTestId("increment-button");
    const quantityElement = screen.getByText("3");

    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(quantityElement).toBeInTheDocument();
  });

  test("renders quantity and control buttons when 'add to cart' button is clicked", async () => {
    render(
      <CartContextProvider>
        <ProductItem product={mockProduct} />
      </CartContextProvider>
    );
    const addCartButton = screen.getByRole("button", { name: /add to cart/i });

    await userEvent.click(addCartButton);
    const decrementButton = screen.getByTestId("decrement-button");
    const incrementButton = screen.getByTestId("increment-button");
    const quantityElement = screen.getByText("1");

    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(quantityElement).toBeInTheDocument();
  });
});
