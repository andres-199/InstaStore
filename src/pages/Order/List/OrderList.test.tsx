import React from "react";
import { render, screen } from "@testing-library/react";
import OrderList, { OrderListMessage } from ".";
import { UseGetOrders } from "../hooks/UseGetOrders";
import "@testing-library/jest-dom";

jest.mock("../hooks/UseGetOrders", () => ({
  UseGetOrders: jest.fn(),
}));

jest.mock("../../../components/OrderItem", () => () => <div>OrderItem</div>);
jest.mock("../../../components/LoadingScreen", () => () => (
  <div>Loading...</div>
));
jest.mock(
  "../../../components/EmptyState",
  () =>
    ({ message }: { message: string }) =>
      <div>{message}</div>
);

describe("OrderList", () => {
  test("should show loading state", () => {
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: null,
      loading: true,
      orders: [],
    });

    render(<OrderList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should show error message", () => {
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: true,
      loading: false,
      orders: [],
    });

    render(<OrderList />);

    expect(
      screen.getByText(OrderListMessage.CAN_NOT_LOAD_ORDERS)
    ).toBeInTheDocument();
  });

  test("should show empty state when there are no orders", () => {
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      orders: [],
    });

    render(<OrderList />);

    expect(screen.getByText(OrderListMessage.EMPTY_STATE)).toBeInTheDocument();
  });

  test("should display orders when they exist", () => {
    const mockOrders = [
      { id: "1", client: "Client A", deliveryAddress: "Address A" },
      { id: "2", client: "Client B", deliveryAddress: "Address B" },
    ];
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      orders: mockOrders,
    });

    render(<OrderList />);

    expect(screen.getByText("InstaStore")).toBeInTheDocument();
    expect(screen.getAllByText("OrderItem").length).toBe(mockOrders.length);
  });
});
