import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Store from "../../../../../../../interfaces/Store";
import StoreItem from "..";
import theme from "../../../../../../../config/theme";

const mockStoreOpen: Store = {
  id: "1",
  name: "Tienda 1",
  isOpen: true,
  coordinates: { lat: 10, long: 10 },
  nextDeliveryTime: 30,
};

const mockStoreClosed: Store = {
  id: "2",
  name: "Tienda 2",
  isOpen: false,
  coordinates: { lat: 20, long: 20 },
  nextDeliveryTime: 60,
};

describe("StoreItem", () => {
  it("renders the store name and status correctly", () => {
    render(<StoreItem store={mockStoreOpen} onClick={jest.fn()} />);
    expect(screen.getByText(mockStoreOpen.name)).toBeInTheDocument();
    expect(screen.getByText("Abierto")).toBeInTheDocument();
    expect(screen.getByText("Próxima entrega: 30 minutos")).toBeInTheDocument();
  });

  it("renders 'Cerrado' when the store is closed", () => {
    render(<StoreItem store={mockStoreClosed} onClick={jest.fn()} />);
    expect(screen.getByText(mockStoreClosed.name)).toBeInTheDocument();
    expect(screen.getByText("Cerrado")).toBeInTheDocument();
    expect(screen.getByText("Próxima entrega: 60 minutos")).toBeInTheDocument();
  });

  it("applies the correct background color when the store is open", () => {
    render(<StoreItem store={mockStoreOpen} onClick={jest.fn()} />);
    const card = screen.getByText(mockStoreOpen.name).closest(".MuiCard-root");
    expect(card).toHaveStyle("background-color: white");
  });

  it("applies the correct background color when the store is closed", () => {
    render(<StoreItem store={mockStoreClosed} onClick={jest.fn()} />);
    const card = screen
      .getByText(mockStoreClosed.name)
      .closest(".MuiCard-root");
    expect(card).toHaveStyle("background-color: " + theme.palette.grey[200]);
  });

  it("calls onClick when the store is open and clicked", () => {
    const mockOnClick = jest.fn();
    render(<StoreItem store={mockStoreOpen} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText(mockStoreOpen.name));
    expect(mockOnClick).toHaveBeenCalledWith(mockStoreOpen);
  });

  it("does not call onClick when the store is closed and clicked", () => {
    const mockOnClick = jest.fn();
    render(<StoreItem store={mockStoreClosed} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText(mockStoreClosed.name));
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
