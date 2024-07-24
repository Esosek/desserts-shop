import { screen, render } from "@testing-library/react";
import event, { userEvent } from "@testing-library/user-event";

import Cart from "../Cart";
import MockCartContextProvider from "@/context/MockCartContext";
import mockData from "@/data/data.json";
import { CartContextProvider } from "@/context/CartContext";

describe("Cart", () => {
  const mockInitialData = [
    { product: { ...mockData[0], id: 0 }, quantity: 2 },
    { product: { ...mockData[1], id: 1 }, quantity: 1 },
  ];

  test("renders cake image and 'Your added items will appear here' when empty", () => {
    render(
      <MockCartContextProvider items={[]}>
        <Cart />
      </MockCartContextProvider>
    );

    const emptyCartImg = screen.getByAltText("Image of cake");
    const emptyCartText = screen.getByText("Your added items will appear here");

    expect(emptyCartImg).toBeInTheDocument();
    expect(emptyCartText).toBeInTheDocument();
  });

  test("does not render confirm button when cart is empty", () => {
    render(
      <MockCartContextProvider items={[]}>
        <Cart />
      </MockCartContextProvider>
    );

    const btnElement = screen.queryByRole("button");

    expect(btnElement).toBeNull();
  });

  test("renders list items when cart is NOT empty", () => {
    render(
      <MockCartContextProvider items={mockInitialData}>
        <Cart />
      </MockCartContextProvider>
    );

    const cartItems = screen.queryAllByRole("listitem");

    expect(cartItems.length).toBeGreaterThan(0);
  });

  test("renders confirm button when cart is NOT empty", () => {
    render(
      <MockCartContextProvider items={mockInitialData}>
        <Cart />
      </MockCartContextProvider>
    );

    const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

    expect(confirmButton).toBeInTheDocument();
  });

  test("correctly calculates and renders order total price", () => {
    render(
      <MockCartContextProvider items={mockInitialData}>
        <Cart />
      </MockCartContextProvider>
    );
    const totalPrice = mockInitialData.reduce(
      (acc: number, value) => acc + value.quantity * value.product.price,
      0
    );

    const totalText = screen.getByText(`$${totalPrice.toFixed(2)}`);

    expect(totalText).toBeInTheDocument();
  });

  test("opens ConfirmModal and prevents body scroll when confirm button is pressed ", async () => {
    render(
      <MockCartContextProvider items={mockInitialData}>
        <Cart />
      </MockCartContextProvider>
    );

    const confirmButton = screen.getByRole("button", { name: "Confirm Order" });
    await event.click(confirmButton);
    const confirmModal = screen.getByText(/confirmed/i);

    expect(document.body.style.overflow).toBe("hidden");
    expect(confirmModal).toBeInTheDocument();
  });

  test("clears cart context and enables body scroll when ConfirmModal is closed", async () => {
    render(
      <CartContextProvider initialValue={mockInitialData}>
        <Cart />
      </CartContextProvider>
    );

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    await event.click(confirmButton);
    const closeModalBtn = screen.getByRole("button", {
      name: /new order/i,
    });
    await event.click(closeModalBtn);
    const cartItemElements = screen.queryAllByRole("listitem");

    expect(document.body.style.overflow).toBe("auto");
    expect(cartItemElements).toHaveLength(0);
  });

  test("does NOT render a cart item when its remove buttton is clicked", async () => {
    render(
      <CartContextProvider initialValue={mockInitialData}>
        <Cart />
      </CartContextProvider>
    );
    const removeButtons = screen.getAllByTestId("remove-button");

    await userEvent.click(removeButtons[0]);
    const cartItemElements = screen.queryAllByRole("listitem");

    expect(cartItemElements.length).toBe(1);
  });
});
