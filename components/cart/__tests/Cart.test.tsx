import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import Cart from "../Cart";
import MockCartContextProvider, { mockData } from "@/context/MockCartContext";

import { CartContextProvider } from "@/context/CartContext";

describe("Cart", () => {
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
      <MockCartContextProvider items={mockData}>
        <Cart />
      </MockCartContextProvider>
    );

    const cartItems = screen.queryAllByRole("listitem");

    expect(cartItems.length).toBeGreaterThan(0);
  });

  test("renders confirm button when cart is NOT empty", () => {
    render(
      <MockCartContextProvider items={mockData}>
        <Cart />
      </MockCartContextProvider>
    );

    const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

    expect(confirmButton).toBeInTheDocument();
  });

  test("correctly calculates and renders order total price", () => {
    render(
      <MockCartContextProvider items={mockData}>
        <Cart />
      </MockCartContextProvider>
    );
    const totalPrice = mockData.reduce(
      (acc: number, value) => acc + value.quantity * value.product.price,
      0
    );

    const totalText = screen.getByText(`$${totalPrice.toFixed(2)}`);

    expect(totalText).toBeInTheDocument();
  });

  test("opens ConfirmModal and prevents body scroll when confirm button is pressed ", async () => {
    render(
      <MockCartContextProvider items={mockData}>
        <Cart />
      </MockCartContextProvider>
    );

    const confirmButton = screen.getByRole("button", { name: "Confirm Order" });
    await userEvent.click(confirmButton);
    const confirmModal = screen.getByText(/confirmed/i);

    expect(document.body.style.overflow).toBe("hidden");
    expect(confirmModal).toBeInTheDocument();
  });

  test("clears cart context and enables body scroll when ConfirmModal is closed", async () => {
    render(
      <CartContextProvider initialValue={mockData}>
        <Cart />
      </CartContextProvider>
    );

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    await userEvent.click(confirmButton);
    const closeModalBtn = screen.getByRole("button", {
      name: /new order/i,
    });
    await userEvent.click(closeModalBtn);
    const cartItemElements = screen.queryAllByRole("listitem");

    expect(document.body.style.overflow).toBe("auto");
    expect(cartItemElements).toHaveLength(0);
  });

  test("does NOT render a cart item when its remove buttton is clicked", async () => {
    render(
      <CartContextProvider initialValue={mockData}>
        <Cart />
      </CartContextProvider>
    );
    const removeButtons = screen.getAllByTestId("remove-button");

    await userEvent.click(removeButtons[0]);
    const cartItemElements = screen.queryAllByRole("listitem");

    expect(cartItemElements.length).toBe(1);
  });
});