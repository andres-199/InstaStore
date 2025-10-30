import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Store from "../../../../../interfaces/Store";
import StoreList from "..";

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

describe("StoreList", () => {
  it("renders the correct number of StoreItem components", () => {
    render(<StoreList stores={mockStores} onClickStore={jest.fn()} />);
    const storeItems = screen.getAllByTestId("store-item");
    expect(storeItems).toHaveLength(mockStores.length);
  });

  it("renders the correct store names", () => {
    render(<StoreList stores={mockStores} onClickStore={jest.fn()} />);
    expect(screen.getByText(mockStores[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockStores[1].name)).toBeInTheDocument();
  });

  it("calls onClickStore when a StoreItem is clicked", () => {
    const mockOnClickStore = jest.fn();
    render(<StoreList stores={mockStores} onClickStore={mockOnClickStore} />);
    fireEvent.click(screen.getByText(mockStores[0].name));
    expect(mockOnClickStore).toHaveBeenCalledWith(mockStores[0]);
  });

  it("passes the correct store to each StoreItem", () => {
    const mockOnClickStore = jest.fn();
    render(<StoreList stores={mockStores} onClickStore={mockOnClickStore} />);
    mockStores.forEach((store) => {
      expect(screen.getByText(store.name)).toBeInTheDocument();
    });
  });
});
