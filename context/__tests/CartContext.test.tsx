import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";

import CartContext, { CartContextProvider } from "../CartContext";
import { Product } from "@/types/Product.types";
import { mockData } from "../MockCartContext";

describe("CartContext", () => {
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

  const TestingComponent = () => {
    const { items, addItem, removeItem, clearCart } = useContext(CartContext);
    return (
      <>
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>{item.quantity}</p>
              </li>
            );
          })}
        </ul>
        <button onClick={() => addItem(mockProduct)}>add product</button>
        <button onClick={() => removeItem(mockProduct.id)}>
          remove product
        </button>
        <button onClick={() => removeItem(mockProduct.id, 3)}>
          clear product
        </button>
        <button onClick={clearCart}>clear cart</button>
      </>
    );
  };

  test("provides products in cart with specified quantity", () => {
    render(
      <CartContextProvider initialValue={mockData}>
        <TestingComponent />
      </CartContextProvider>
    );
    const cartItemElements = screen.getAllByRole("listitem");
    const quantityElement1 = screen.getByText("2");
    const quantityElement2 = screen.getByText("1");

    expect(cartItemElements).toHaveLength(2);
    expect(quantityElement1).toBeInTheDocument();
    expect(quantityElement2).toBeInTheDocument();
  });

  test("adds a new product with quantity 1 to cart when addItem is called", async () => {
    render(
      <CartContextProvider initialValue={[]}>
        <TestingComponent />
      </CartContextProvider>
    );
    const addButton = screen.getByRole("button", {
      name: "add product",
    });

    await userEvent.click(addButton);
    const productNameElement = screen.getByText("Test product");
    const quantityElement = screen.getByText("1");

    expect(productNameElement).toBeInTheDocument();
    expect(quantityElement).toBeInTheDocument();
  });

  test("increments a quantity of an existing product when addItem is called", async () => {
    render(
      <CartContextProvider initialValue={[{ ...mockProduct, quantity: 2 }]}>
        <TestingComponent />
      </CartContextProvider>
    );
    const addButton = screen.getByRole("button", {
      name: "add product",
    });

    await userEvent.click(addButton);
    const quantityElement = screen.getByText("3");

    expect(quantityElement).toBeInTheDocument();
  });

  test("decrements a quantity of a product by 1 when removeItem is called if its bigger than 1", async () => {
    render(
      <CartContextProvider initialValue={[{ ...mockProduct, quantity: 3 }]}>
        <TestingComponent />
      </CartContextProvider>
    );
    const removeButton = screen.getByRole("button", {
      name: "remove product",
    });

    await userEvent.click(removeButton);
    const quantityElement = screen.getByText("2");

    expect(quantityElement).toBeInTheDocument();
  });

  test("removes a product from cart when removeItem is called with quantity equal to current quantity ", async () => {
    render(
      <CartContextProvider initialValue={[{ ...mockProduct, quantity: 3 }]}>
        <TestingComponent />
      </CartContextProvider>
    );
    const removeButton = screen.getByRole("button", {
      name: "remove product",
    });

    await userEvent.tripleClick(removeButton);
    const cartItemElements = screen.queryByRole("listitem");

    expect(cartItemElements).not.toBeInTheDocument();
  });

  test("clears all products when clearCart is called", async () => {
    render(
      <CartContextProvider initialValue={mockData}>
        <TestingComponent />
      </CartContextProvider>
    );
    const clearButton = screen.getByRole("button", {
      name: "clear cart",
    });

    await userEvent.click(clearButton);
    const cartItemElements = screen.queryByRole("listitem");

    expect(cartItemElements).not.toBeInTheDocument();
  });
});
