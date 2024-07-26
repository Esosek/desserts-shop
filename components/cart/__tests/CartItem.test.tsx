import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import CartItem from "../CartItem";
import MockCartContextProvider from "@/context/MockCartContext";

describe("CartItem", () => {
  const mockProduct = {
    id: 0,
    image: {
      thumbnail: "/assets/images/image-waffle-thumbnail.jpg",
      mobile: "/assets/images/image-waffle-mobile.jpg",
      tablet: "/assets/images/image-waffle-tablet.jpg",
      desktop: "/assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    quantity: 3,
  };

  const mockCartItem = <CartItem product={mockProduct} />;

  test("renders product details and quantity", () => {
    render(mockCartItem);
    const productNameElement = screen.getByText("Waffle with Berries");
    const productPrice = screen.getByText("$6.50", { exact: false });
    const productQuantity = screen.getByText("3x");

    expect(productNameElement).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
  });

  test("renders correct total price", () => {
    render(mockCartItem);
    const totalPrice = (3 * 6.5).toFixed(2);
    const totalPriceElement = screen.getByText(`$${totalPrice}`);

    expect(totalPriceElement).toBeInTheDocument();
  });

  test("calls removeItem with correct arguments when remove button is clicked", async () => {
    const removeItem = jest.fn();
    render(
      <MockCartContextProvider removeItem={removeItem}>
        {mockCartItem}
      </MockCartContextProvider>
    );
    const removeButton = screen.getByRole("button");

    await userEvent.click(removeButton);

    waitFor(
      () => {
        expect(removeItem).toHaveBeenCalledWith(0, 3);
      },
      { timeout: 500 }
    );
  });
});
