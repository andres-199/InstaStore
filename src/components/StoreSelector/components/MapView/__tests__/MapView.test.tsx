import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Store from "../../../../../interfaces/Store";
import Order from "../../../../../interfaces/Order";
import MapView from "..";

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

describe("MapView", () => {
  it("renders the map with the order marker", () => {
    render(
      <MapView
        stores={mockStores}
        order={mockOrder}
        onStoreSelect={jest.fn()}
      />
    );

    expect(screen.getByText(mockOrder.id)).toBeInTheDocument();
    expect(screen.getByText(mockOrder.client)).toBeInTheDocument();
    expect(screen.getByText(mockOrder.deliveryAddress)).toBeInTheDocument();
  });

  it("renders store markers with the correct information", () => {
    render(
      <MapView
        stores={mockStores}
        order={mockOrder}
        onStoreSelect={jest.fn()}
      />
    );

    expect(screen.getByText(mockStores[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockStores[1].name)).toBeInTheDocument();
    expect(screen.getByText("30 minutos")).toBeInTheDocument();
    expect(screen.getByText("Cerrado")).toBeInTheDocument();
  });

  it("calls onStoreSelect when an open store is clicked", () => {
    const mockOnStoreSelect = jest.fn();
    render(
      <MapView
        stores={mockStores}
        order={mockOrder}
        onStoreSelect={mockOnStoreSelect}
      />
    );

    fireEvent.click(screen.getByText(mockStores[0].name));

    expect(mockOnStoreSelect).toHaveBeenCalledWith(mockStores[0]);
  });

  it("does not call onStoreSelect when a closed store is clicked", () => {
    const mockOnStoreSelect = jest.fn();
    render(
      <MapView
        stores={mockStores}
        order={mockOrder}
        onStoreSelect={mockOnStoreSelect}
      />
    );

    fireEvent.click(screen.getByText(mockStores[1].name));

    expect(mockOnStoreSelect).not.toHaveBeenCalled();
  });
});
