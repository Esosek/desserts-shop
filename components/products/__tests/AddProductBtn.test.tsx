import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockCartContextProvider from "@/context/MockCartContext";
import AddProductBtn from "../AddProductBtn";
import { Product } from "@/types/Product.types";

describe("AddProductBtn", () => {
  const mockupProduct: Product = {
    id: 0,
    image: {
      thumbnail: "",
      mobile: "",
      tablet: "",
      desktop: "",
    },
    name: "Test product",
    category: "testing",
    price: 99.9,
  };
  const increaseQuantity = jest.fn();
  const decreaseQuantity = jest.fn();

  const renderTree = (quantity: number) =>
    render(
      <MockCartContextProvider
        addItem={increaseQuantity}
        removeItem={decreaseQuantity}
      >
        <AddProductBtn product={mockupProduct} quantity={quantity} />
      </MockCartContextProvider>
    );

  test('renders "add to cart" when cart quantity is 0', () => {
    renderTree(0);
    const btnElement = screen.getByRole("button", { name: /add to cart/i });

    expect(btnElement).toBeInTheDocument();
  });

  test("renders control arrows when cart quantity is bigger than 0", () => {
    renderTree(3);
    const decrementBtnElement = screen.getByTestId("decrement-button");
    const incrementBtnElement = screen.getByTestId("increment-button");

    expect(decrementBtnElement).toBeInTheDocument();
    expect(incrementBtnElement).toBeInTheDocument();
  });

  test("calls removeItem with correct params when decrement is clicked", async () => {
    renderTree(3);
    const decrementBtnElement = screen.getByTestId("decrement-button");

    await userEvent.click(decrementBtnElement);

    expect(decreaseQuantity).toHaveBeenCalledWith(mockupProduct.id);
  });

  test("calls addItem with correct params when increment is clicked", async () => {
    renderTree(3);
    const incrementBtnElement = screen.getByTestId("increment-button");

    await userEvent.click(incrementBtnElement);

    expect(increaseQuantity).toHaveBeenCalledWith(mockupProduct);
  });
});
