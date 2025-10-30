import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StoreSelector, { StoreSelectorDir, View } from "../";
import Store from "../../../interfaces/Store";
import Order from "../../../interfaces/Order";
import { UseGetStores } from "../hooks/UseGetStores";

jest.mock("../hooks/UseGetStores");

const mockUseGetStores = UseGetStores as jest.MockedFunction<
  typeof UseGetStores
>;

const mockStores: Store[] = [
  {
    id: "1",
    name: "Tienda 1",
    isOpen: true,
    coordinates: { lat: 10, long: 10 },
    nextDeliveryTime: 30,
  },
  {
    id: "2",
    name: "Tienda 2",
    isOpen: false,
    coordinates: { lat: 20, long: 20 },
    nextDeliveryTime: 60,
  },
];

const mockOrder: Order = {
  id: "order-123",
  client: "Juan Pérez",
  deliveryAddress: "Calle 123 # 45-67",
  coordinates: { lat: 5, long: 5 },
};

describe("StoreSelector", () => {
  it("renders loading state", () => {
    mockUseGetStores.mockReturnValue({
      loading: true,
      error: null,
      stores: [],
    });
    render(
      <StoreSelector
        order={mockOrder}
        onClose={jest.fn()}
        onStoreSelect={jest.fn()}
        view={View.LIST}
      />
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseGetStores.mockReturnValue({
      loading: false,
      error: "Error",
      stores: [],
    });
    render(
      <StoreSelector
        order={mockOrder}
        onClose={jest.fn()}
        onStoreSelect={jest.fn()}
        view={View.LIST}
      />
    );
    expect(
      screen.getByText(StoreSelectorDir.LOAD_STORES_ERROR)
    ).toBeInTheDocument();
  });

  it("renders store list when view is LIST", () => {
    mockUseGetStores.mockReturnValue({
      loading: false,
      error: null,
      stores: mockStores,
    });
    render(
      <StoreSelector
        order={mockOrder}
        onClose={jest.fn()}
        onStoreSelect={jest.fn()}
        view={View.LIST}
      />
    );
    expect(screen.getByText(mockStores[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockStores[1].name)).toBeInTheDocument();
  });

  it("calls onStoreSelect when a store is selected and confirms", () => {
    mockUseGetStores.mockReturnValue({
      loading: false,
      error: null,
      stores: mockStores,
    });
    const mockOnStoreSelect = jest.fn();
    render(
      <StoreSelector
        order={mockOrder}
        onClose={jest.fn()}
        onStoreSelect={mockOnStoreSelect}
        view={View.LIST}
      />
    );

    const store = screen.getByText(mockStores[0].name);
    fireEvent.click(store);

    const confirmButton = screen.getByRole("button", { name: /Confirmar/i });
    fireEvent.click(confirmButton);

    expect(mockOnStoreSelect).toHaveBeenCalledWith(mockStores[0]);
  });

  it("does not call onStoreSelect when selection is canceled", () => {
    mockUseGetStores.mockReturnValue({
      loading: false,
      error: null,
      stores: mockStores,
    });
    const mockOnStoreSelect = jest.fn();
    render(
      <StoreSelector
        order={mockOrder}
        onClose={jest.fn()}
        onStoreSelect={mockOnStoreSelect}
        view={View.LIST}
      />
    );

    const store = screen.getByText(mockStores[0].name);
    fireEvent.click(store);

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnStoreSelect).not.toHaveBeenCalled();
  });

  it("closes the dialog when the cancel button is clicked", () => {
    mockUseGetStores.mockReturnValue({
      loading: false,
      error: null,
      stores: mockStores,
    });
    const mockOnClose = jest.fn();
    render(
      <StoreSelector
        order={mockOrder}
        onClose={mockOnClose}
        onStoreSelect={jest.fn()}
        view={View.LIST}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
