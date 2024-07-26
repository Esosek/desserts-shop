import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductFilter from "../PoductFilter";
import { mockData } from "@/context/MockCartContext";

describe("ProductFilter", () => {
  const onFilterChanged = jest.fn();
  test("renders options for all product categories", () => {
    render(
      <ProductFilter products={mockData} onFilterChanged={onFilterChanged} />
    );
    const optionElements = screen.getAllByRole("option");

    // 2 test products + "none"
    expect(optionElements).toHaveLength(3);
  });

  test("calls onFilterChanged when user select a category", async () => {
    render(
      <ProductFilter products={mockData} onFilterChanged={onFilterChanged} />
    );
    const selectElement = screen.getByRole("combobox");

    await userEvent.selectOptions(selectElement, "Waffle");

    expect(onFilterChanged).toHaveBeenCalledWith("waffle");
  });

  test("renders only none category when products is empty", () => {
    render(<ProductFilter products={[]} onFilterChanged={onFilterChanged} />);
    const optionElements = screen.getAllByRole("option");

    expect(optionElements).toHaveLength(1);
  });
});
