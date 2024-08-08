import React, { MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import Order from "../../interfaces/Order";
import { CardActions } from "@mui/material";

interface OrderItemProps {
  order: Order;
  onClickAssignStore: (e: MouseEvent<HTMLButtonElement>) => void;
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
        <Typography variant="body2">
          <LocationOnIcon fontSize="small" /> {order.deliveryAddress}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          mb: 1,
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
