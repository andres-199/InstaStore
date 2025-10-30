import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import { UseGetOrders } from "../hooks/UseGetOrders";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyState from "../../../components/EmptyState";
import Order from "../../../interfaces/Order";
import Store from "../../../interfaces/Store";
import StoreSelector, { View } from "../../../components/StoreSelector";
import OrderItem from "./components/OrderItem";
import { UseAssignStore } from "../hooks/UseAssignStore";
import { UseLogout } from "../../Login/hooks/UseLogout";

export enum OrderListDir {
  CAN_NOT_LOAD_ORDERS = "Hubo un error al cargar las órdenes. Por favor, intenta nuevamente.",
  EMPTY_STATE = "No hay órdenes disponibles para asignar.",
  CAN_NOT_ASSIGN_STORE = "Ocurrió un error al intentar asignar la tienda a la orden. Por favor, intenta nuevamente.",
}

const OrderList: React.FC = () => {
  const {
    error: errorLogout,
    loading: loadingLogout,
    handleLogout,
  } = UseLogout();
  const {
    error: errorOrders,
    loading: loadingOrders,
    orders,
    fetchOrders,
  } = UseGetOrders();
  const {
    error: errorAssignStore,
    loading: loadingAssignStore,
    handleAssignStore,
  } = UseAssignStore();
  const [selectedOrderState, setSelectedOrderState] = useState<{
    order: Order;
    view?: View;
  } | null>(null);

  const closeStoreSelector = () => {
    setSelectedOrderState(null);
  };

  const handleClickShowMap = (order: Order) => {
    setSelectedOrderState({ order, view: View.MAP });
  };

  const handleSelectedStore = async (orderId: string, store: Store) => {
    closeStoreSelector();
    await handleAssignStore(orderId, store.id);
    fetchOrders();
  };

  const handleClickAssignStore = (order: Order) => {
    setSelectedOrderState({ order });
  };

  const handleClickLogout = async () => {
    await handleLogout();
  };

  return (
    <>
      {errorLogout && (
        <Container>
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorLogout}
          </Alert>
        </Container>
      )}
      <Container sx={{ mt: 4 }}>
        <Tooltip title="Cerrar sesión">
          <Fab
            disabled={loadingLogout}
            onClick={handleClickLogout}
            color="secondary"
            sx={{ position: "fixed", top: 24, right: 24 }}
          >
            <LogoutIcon />
          </Fab>
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            pb: 3,
          }}
        >
          <Typography variant="h4" color="primary">
            InstaStore
          </Typography>
          <Typography variant="body2" color="GrayText">
            Asigna tiendas a tus pedidos
          </Typography>
        </Box>
        <>
          {(loadingOrders || loadingAssignStore) && (
            <LoadingScreen sx={{ mb: 2 }} />
          )}
          {errorAssignStore && (
            <Container>
              <Alert severity="error" sx={{ mb: 2 }}>
                {OrderListDir.CAN_NOT_ASSIGN_STORE}
              </Alert>
            </Container>
          )}
          {errorOrders && (
            <Container>
              <Alert severity="error" sx={{ mb: 2 }}>
                {OrderListDir.CAN_NOT_LOAD_ORDERS}
              </Alert>
            </Container>
          )}

          {!loadingOrders && orders.length === 0 && (
            <EmptyState message={OrderListDir.EMPTY_STATE} />
          )}
        </>
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <OrderItem
                order={order}
                onClickShowMap={(e) => {
                  e.preventDefault();
                  handleClickShowMap(order);
                }}
                onClickAssignStore={(e) => {
                  e.preventDefault();
                  handleClickAssignStore(order);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {!!selectedOrderState && (
        <StoreSelector
          view={selectedOrderState.view}
          order={selectedOrderState.order}
          onClose={closeStoreSelector}
          onStoreSelect={(store) =>
            handleSelectedStore(selectedOrderState.order.id, store)
          }
        />
      )}
    </>
  );
};

export default OrderList;
