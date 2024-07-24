import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PrimaryButton from "../PrimaryButton";

describe("PrimaryButton", () => {
  const onClick = jest.fn();
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    render(<PrimaryButton onClick={onClick}>Test Button</PrimaryButton>);
    buttonElement = screen.getByText("Test Button");
  });
  test("renders button label", () => {
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick when pressed", async () => {
    await userEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalled();
  });
});
