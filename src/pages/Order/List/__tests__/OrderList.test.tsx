import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderList, { OrderListDir } from "../";
import "@testing-library/jest-dom";
import { UseLogout } from "../../../Login/hooks/UseLogout";
import { UseAssignStore } from "../../hooks/UseAssignStore";
import { UseGetOrders } from "../../hooks/UseGetOrders";
import Store from "../../../../interfaces/Store";
import Order from "../../../../interfaces/Order";

const store: Store = {
  id: "storeId",
  name: "Store A",
  isOpen: true,
  nextDeliveryTime: 10,
  coordinates: { lat: 0, long: 0 },
};

jest.mock("../../../../components/StoreSelector", () => (props: any) => {
  return (
    <div>
      <button
        data-testid="store-selector-confirm"
        onClick={() => props.onStoreSelect(store)}
      >
        Confirm Store Selection
      </button>
    </div>
  );
});

jest.mock("../../../Login/hooks/UseLogout", () => ({
  UseLogout: jest.fn(),
}));

jest.mock("../../hooks/UseGetOrders", () => ({
  UseGetOrders: jest.fn(),
}));

jest.mock("../../hooks/UseAssignStore", () => ({
  UseAssignStore: jest.fn(),
}));

jest.mock("../components/OrderItem", () => (props: any) => (
  <div>
    <div>OrderItem</div>
    <button
      onClick={props.onClickAssignStore}
      data-testid="assign-store-button"
    >
      Asignar tienda
    </button>
  </div>
));
jest.mock("../../../../components/LoadingScreen", () => () => (
  <div>Loading...</div>
));
jest.mock(
  "../../../../components/EmptyState",
  () =>
    ({ message }: { message: string }) =>
      <div>{message}</div>
);

describe("OrderList", () => {
  jest.clearAllMocks();
  const mockLogout = jest.fn();
  const mockAssignStore = jest.fn();
  const mockFetchOrders = jest.fn();

  beforeEach(() => {
    (UseLogout as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      handleLogout: mockLogout,
    });

    (UseAssignStore as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      handleAssignStore: mockAssignStore,
    });

    (UseGetOrders as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      orders: [],
      fetchOrders: mockFetchOrders,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should show loading state", () => {
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: null,
      loading: true,
      orders: [],
      fetchOrders: jest.fn(),
    });

    render(<OrderList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should show error message when failing to load orders", () => {
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: true,
      loading: false,
      orders: [],
      fetchOrders: jest.fn(),
    });

    render(<OrderList />);

    expect(
      screen.getByText(OrderListDir.CAN_NOT_LOAD_ORDERS)
    ).toBeInTheDocument();
  });

  test("should show empty state when there are no orders", () => {
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      orders: [],
      fetchOrders: jest.fn(),
    });

    render(<OrderList />);

    expect(screen.getByText(OrderListDir.EMPTY_STATE)).toBeInTheDocument();
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
      fetchOrders: jest.fn(),
    });

    render(<OrderList />);

    expect(screen.getAllByText("OrderItem").length).toBe(mockOrders.length);
  });

  test("should handle logout click", async () => {
    render(<OrderList />);

    const logoutButton = screen.getByRole("button", { name: /cerrar sesión/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  test("should handle assign store and refresh orders", async () => {
    const mockOrders: Order[] = [
      {
        id: "1",
        client: "Client A",
        deliveryAddress: "Address A",
        coordinates: { lat: 0, long: 0 },
      },
    ];
    (UseGetOrders as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      orders: mockOrders,
      fetchOrders: mockFetchOrders,
    });

    render(<OrderList />);

    const assignButton = screen.getByTestId("assign-store-button");
    fireEvent.click(assignButton);

    const confirmButton = screen.getByTestId("store-selector-confirm");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockAssignStore).toHaveBeenCalledWith(mockOrders[0].id, store.id);
      expect(mockFetchOrders).toHaveBeenCalled();
    });
  });

  test("should show error message when failing to assign store", async () => {
    (UseAssignStore as jest.Mock).mockReturnValue({
      error: OrderListDir.CAN_NOT_ASSIGN_STORE,
      loading: false,
      handleAssignStore: mockAssignStore,
    });

    render(<OrderList />);

    expect(
      screen.getByText(OrderListDir.CAN_NOT_ASSIGN_STORE)
    ).toBeInTheDocument();
  });
});
