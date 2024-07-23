import { screen, render } from "@testing-library/react";
import event from "@testing-library/user-event";

import Cart from "./Cart";
import { mockCartContext } from "@/context/MockCartContext";
import mockData from "@/data/data.json";

describe("Cart", () => {
  const mockInitialData = [
    { product: { ...mockData[0], id: 0 }, quantity: 2 },
    { product: { ...mockData[1], id: 1 }, quantity: 1 },
  ];

  test("renders cake image and 'Your added items will appear here' when empty", () => {
    render(mockCartContext(<Cart />, []));

    const emptyCartImg = screen.getByAltText("Image of cake");
    const emptyCartText = screen.getByText("Your added items will appear here");

    expect(emptyCartImg).toBeInTheDocument();
    expect(emptyCartText).toBeInTheDocument();
  });

  test("does not render confirm button when cart is empty", () => {
    render(mockCartContext(<Cart />, []));

    const btnElement = screen.queryByRole("button");

    expect(btnElement).toBeNull();
  });

  test("renders list items when cart is NOT empty", () => {
    render(mockCartContext(<Cart />, mockInitialData));

    const cartItems = screen.queryAllByRole("listitem");

    expect(cartItems.length).toBeGreaterThan(0);
  });

  test("renders confirm button when cart is NOT empty", () => {
    render(mockCartContext(<Cart />, mockInitialData));

    const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

    expect(confirmButton).toBeInTheDocument();
  });

  test("correctly calculates and renders order total price", () => {
    render(mockCartContext(<Cart />, mockInitialData));
    const totalPrice = mockInitialData.reduce(
      (acc: number, value) => acc + value.quantity * value.product.price,
      0
    );

    const totalText = screen.getByText(`$${totalPrice.toFixed(2)}`);

    expect(totalText).toBeInTheDocument();
  });

  test("opens ConfirmModal and prevents body scroll when confirm button is pressed ", async () => {
    render(mockCartContext(<Cart />, mockInitialData));

    const confirmButton = screen.getByRole("button", { name: "Confirm Order" });
    await event.click(confirmButton);
    const confirmModal = screen.getByText("Order Confirmed");

    expect(document.body.style.overflow).toBe("hidden");
    expect(confirmModal).toBeInTheDocument();
  });

  test("clears cart context and enables body scroll when ConfirmModal is closed", async () => {
    render(mockCartContext(<Cart />, mockInitialData));

    const confirmButton = screen.getByRole("button", { name: "Confirm Order" });
    await event.click(confirmButton);
    const closeModalBtn = screen.getByRole("button", {
      name: "Start New Order",
    });
    await event.click(closeModalBtn);
    const cartItemElements = screen.queryAllByRole("listitem");

    expect(document.body.style.overflow).toBe("auto");
    expect(cartItemElements).toHaveLength(0);
  });
});
