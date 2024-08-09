import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog, { ConfirmDialogDir } from "..";
import Order from "../../../../../interfaces/Order";
import Store from "../../../../../interfaces/Store";

const mockStore: Store = {
  id: "1",
  name: "Tienda 1",
  isOpen: true,
  coordinates: { lat: 10, long: 10 },
  nextDeliveryTime: 30,
};

const mockOrder: Order = {
  id: "order-123",
  client: "Juan Pérez",
  deliveryAddress: "Calle 123 # 45-67",
  coordinates: { lat: 5, long: 5 },
};

describe("ConfirmDialog", () => {
  it("renders the dialog with the correct information", () => {
    render(
      <ConfirmDialog
        open={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        store={mockStore}
        order={mockOrder}
      />
    );

    expect(screen.getByText(new RegExp(mockOrder.id, "i"))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockOrder.deliveryAddress, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockStore.name, "i"))
    ).toBeInTheDocument();
  });

  it("calls onClose when the cancel button is clicked", () => {
    const mockOnClose = jest.fn();
    render(
      <ConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={jest.fn()}
        store={mockStore}
        order={mockOrder}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onConfirm when the confirm button is clicked", () => {
    const mockOnConfirm = jest.fn();
    render(
      <ConfirmDialog
        open={true}
        onClose={jest.fn()}
        onConfirm={mockOnConfirm}
        store={mockStore}
        order={mockOrder}
      />
    );

    const confirmButton = screen.getByRole("button", { name: /Confirmar/i });
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("does not render the dialog when open is false", () => {
    render(
      <ConfirmDialog
        open={false}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        store={mockStore}
        order={mockOrder}
      />
    );

    expect(screen.queryByText(ConfirmDialogDir.TITLE)).not.toBeInTheDocument();
  });
});
