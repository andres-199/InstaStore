import React, { MouseEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Store from "../../../../../../interfaces/Store";

interface StoreItemProps {
  store: Store;
  onClick: (store: Store) => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ store, onClick }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.preventDefault();
    store.isOpen && onClick(store);
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        backgroundColor: store.isOpen ? "white" : "grey.200",
      }}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px !important",
        }}
      >
        <Typography sx={{ mb: 1 }} variant="h6" component="div">
          {store.name}
        </Typography>
        {store.isOpen ? (
          <Typography variant="body2" color="primary">
            Abierto
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Cerrado
          </Typography>
        )}
        <Typography variant="body2">
          Próxima entrega: {store.nextDeliveryTime} minutos
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StoreItem;
