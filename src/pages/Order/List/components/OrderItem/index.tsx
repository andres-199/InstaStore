import React, { MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import { Box, CardActions } from "@mui/material";
import Order from "../../../../../interfaces/Order";

interface OrderItemProps {
  order: Order;
  onClickAssignStore: (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
  onClickShowMap: (e: MouseEvent<HTMLButtonElement>) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  onClickAssignStore,
  onClickShowMap,
  order,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          ID: {order.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Cliente: {order.client}
        </Typography>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <LocationOnIcon sx={{ width: "1rem", height: "1rem" }} />
          <Typography variant="body2">{order.deliveryAddress}</Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          gap: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onClickAssignStore}
        >
          Assignar tienda
        </Button>
        <IconButton
          data-testid="icon-button"
          color="secondary"
          onClick={onClickShowMap}
        >
          <LocationOnIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default OrderItem;
