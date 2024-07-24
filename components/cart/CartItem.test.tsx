import { render, screen } from "@testing-library/react";

import CartItem from "./CartItem";
import { CartContextProvider } from "@/context/CartContext";
import Cart from "./Cart";

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
  };

  const mockCartItem = <CartItem product={mockProduct} quantity={3} />;

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

  test("is NOT rendered when removed from Cart", () => {
    render(
      <CartContextProvider
        initialValue={[{ product: mockProduct, quantity: 3 }]}
      >
        <Cart />
      </CartContextProvider>
    );
  });
});
