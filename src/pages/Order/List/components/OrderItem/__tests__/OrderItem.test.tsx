import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderItem from "..";
import "@testing-library/jest-dom/extend-expect";
import Order from "../../../../../../interfaces/Order";

describe("OrderItem Component", () => {
  const mockOrder: Order = {
    id: "order-1234",
    client: "Juan Pérez",
    deliveryAddress: "Calle 123 # 45-67, Bogotá, Colombia",
    coordinates: {
      lat: 4.63385,
      long: -74.08546,
    },
  };

  const mockOnClickAssignStore = jest.fn();
  const mockOnClickShowMap = jest.fn();

  beforeEach(() => {
    render(
      <OrderItem
        order={mockOrder}
        onClickAssignStore={mockOnClickAssignStore}
        onClickShowMap={mockOnClickShowMap}
      />
    );
  });

  it("should render order information correctly", () => {
    expect(screen.getByText(new RegExp(mockOrder.id, "i"))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockOrder.client, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockOrder.deliveryAddress, "i"))
    ).toBeInTheDocument();
  });

  it("should call onClickAssignStore when Assignar tienda button is clicked", () => {
    const assignButton = screen.getByText(/Assignar tienda/i);
    fireEvent.click(assignButton);
    expect(mockOnClickAssignStore).toHaveBeenCalled();
  });

  it("should call onClickShowMap when location icon is clicked", () => {
    const locationButton = screen.getByTestId("icon-button");
    fireEvent.click(locationButton);
    expect(mockOnClickShowMap).toHaveBeenCalled();
  });
});
