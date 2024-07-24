import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmModal from "../ConfirmModal";
import MockCartContextProvider, { mockData } from "@/context/MockCartContext";

describe("ConfirmModal", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    render(
      <MockCartContextProvider items={mockData}>
        <ConfirmModal totalPrice="34.40" onClose={onCloseMock} />
      </MockCartContextProvider>
    );
  });

  test("renders icon, confirmation text, product items and start new order button", () => {
    const iconElement = screen.getByAltText("Checkout icon");
    const confirmTextElement = screen.getByText(/confirmed/i);
    const newOrderButton = screen.getByRole("button", { name: /new order/i });
    const productItemElements = screen.getAllByRole("listitem");

    expect(iconElement).toBeInTheDocument();
    expect(confirmTextElement).toBeInTheDocument();
    expect(newOrderButton).toBeInTheDocument();
    expect(productItemElements.length).toBeGreaterThan(0);
  });

  test("renders correct total price", () => {
    const totalPriceElement = screen.getByText("$34.40");

    expect(totalPriceElement).toBeInTheDocument();
  });

  test("onClose is called when start new order button is clicked", async () => {
    const newOrderButton = screen.getByRole("button");

    await userEvent.click(newOrderButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("onClose is called when backdrop is clicked", async () => {
    const backdrop = screen.getByTestId("backdrop");

    await userEvent.click(backdrop);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
