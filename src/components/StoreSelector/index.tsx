import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Store from "../../interfaces/Store";
import StoreList from "./components/StoreList";
import { UseGetStores } from "./hooks/UseGetStores";
import Order from "../../interfaces/Order";
import MapView from "./components/MapView";
import ConfirmDialog from "./components/ConfirmDialog";
import theme from "../../config/theme";
import EmptyState from "../EmptyState";

const StateIconButton = styled(IconButton)(() => ({
  "&.selected": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export interface StoreSelectorProps {
  order: Order;
  onClose: () => void;
  onStoreSelect: (store: Store) => void;
  view?: View;
}

export enum View {
  LIST = "list",
  MAP = "map",
}

export enum StoreSelectorDir {
  LOAD_STORES_ERROR = "Hubo un error al cargar las tiendas. Por favor, intenta nuevamente.",
  EMPTY_STATE = "No hay resultado de tiendas para mostrar.",
}

const StoreSelector: React.FC<StoreSelectorProps> = ({
  order,
  onClose,
  onStoreSelect,
  view = View.LIST,
}) => {
  const { error, loading, stores } = UseGetStores(order.id);
  const [selectedView, setSelectedView] = useState(view);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleChangeView = (newView: View) => {
    setSelectedView(newView);
  };

  const handleSelectStore = (store: Store) => {
    if (store.isOpen) {
      setSelectedStore(store);
    }
  };

  const handleCloseConfirm = () => {
    setSelectedStore(null);
  };

  const handleConfirmSelectedStore = () => {
    if (selectedStore) {
      onStoreSelect(selectedStore);
      setSelectedStore(null);
    }
  };

  return (
    <>
      <Dialog open={!!order} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <AdsClickIcon sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography variant="h6">
              Seleccionar tienda para la orden <b>{order.id}</b>
            </Typography>
            <Typography variant="body2">en {order.deliveryAddress}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            <StateIconButton
              onClick={(e) => {
                e.preventDefault();
                handleChangeView(View.LIST);
              }}
              className={selectedView === View.LIST ? "selected" : ""}
            >
              <GridViewIcon />
            </StateIconButton>
            <StateIconButton
              onClick={(e) => {
                e.preventDefault();
                handleChangeView(View.MAP);
              }}
              className={selectedView === View.MAP ? "selected" : ""}
            >
              <MapIcon />
            </StateIconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ minHeight: "100px" }} dividers>
          {loading && (
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress />
            </Grid>
          )}
          {error && (
            <Alert severity="error">{StoreSelectorDir.LOAD_STORES_ERROR}</Alert>
          )}
          {!loading && !error && (
            <>
              {stores.length === 0 && (
                <EmptyState message={StoreSelectorDir.EMPTY_STATE} />
              )}
              {selectedView === View.LIST && (
                <StoreList stores={stores} onClickStore={handleSelectStore} />
              )}
              {selectedView === View.MAP && (
                <MapView
                  onStoreSelect={handleSelectStore}
                  order={order}
                  stores={stores}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      {!!selectedStore && (
        <ConfirmDialog
          store={selectedStore}
          order={order}
          open={!!selectedStore}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirmSelectedStore}
        />
      )}
    </>
  );
};

export default StoreSelector;
