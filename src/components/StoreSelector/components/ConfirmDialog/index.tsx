import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Store from "../../../../interfaces/Store";
import Order from "../../../../interfaces/Order";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  store: Store;
  order: Order;
}

export enum ConfirmDialogDir {
  TITLE = "Confirmar asignación",
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  store,
  order,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{ConfirmDialogDir.TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro que deseas asignar a <b>{store.name}</b> a la orden{" "}
          <b>{order.id}</b> en {order.deliveryAddress}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
