import React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UseGetOrders } from "../hooks/UseGetOrders";
import OrderItem from "../../../components/OrderItem";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyState from "../../../components/EmptyState";

export enum OrderListMessage {
  CAN_NOT_LOAD_ORDERS = "Hubo un error al cargar las órdenes. Por favor, intenta nuevamente.",
  EMPTY_STATE = "No hay órdenes disponibles para asignar.",
}

const OrderList: React.FC = () => {
  const { error, loading, orders } = UseGetOrders();
  const handleClickShowMap = () => {};

  const handleClickAssignStore = () => {};

  return (
    <>
      {!loading && orders.length === 0 && (
        <EmptyState message={OrderListMessage.EMPTY_STATE} />
      )}
      {loading && <LoadingScreen />}
      {error && (
        <Container>
          <Alert severity="error" sx={{ mt: 2 }}>
            {OrderListMessage.CAN_NOT_LOAD_ORDERS}
          </Alert>
        </Container>
      )}
      {!error && !loading && orders && (
        <Container sx={{ mt: 4 }}>
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
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order.id}>
                <OrderItem
                  order={order}
                  onClickShowMap={handleClickShowMap}
                  onClickAssignStore={handleClickAssignStore}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default OrderList;
