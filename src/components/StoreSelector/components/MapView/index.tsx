import React from "react";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Store from "../../../../interfaces/Store";
import Order from "../../../../interfaces/Order";
import theme from "../../../../config/theme";

const fadeAnimation = keyframes`
  0%, 100% {
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 3em 0 ${theme.palette.primary.light};
    border-radius: 5px
  }
`;

const markerIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconSize: [25, 41],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface MapViewProps {
  stores: Store[];
  order: Order;
  onStoreSelect: (store: Store) => void;
}

const MapView: React.FC<MapViewProps> = ({ stores, order, onStoreSelect }) => {
  const defaultPosition: L.LatLngExpression = [
    order.coordinates.lat,
    order.coordinates.long,
  ];

  const handleClickStore = (store: Store) => {
    if (store.isOpen) {
      onStoreSelect(store);
    }
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={15}
      style={{ minHeight: "70vh", height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={defaultPosition} icon={markerIcon}>
        <Tooltip direction="auto" permanent>
          <Box sx={{ animation: `${fadeAnimation} 2s infinite ease-in-out` }}>
            <Box
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <ReceiptLongIcon sx={{ width: "1rem", height: "1rem" }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {order.id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <PersonIcon sx={{ width: "1rem", height: "1rem" }} />
              <Typography variant="body1"> {order.client}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <LocationOnIcon
                sx={{
                  width: "1rem",
                  height: "1rem",
                }}
              />
              <Typography variant="body2">{order.deliveryAddress}</Typography>
            </Box>
          </Box>
        </Tooltip>
      </Marker>
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.coordinates.lat, store.coordinates.long]}
          icon={markerIcon}
          eventHandlers={{
            click: () => {
              handleClickStore(store);
            },
          }}
        >
          <Tooltip
            interactive={store.isOpen}
            direction="auto"
            permanent
            eventHandlers={{
              click: () => {
                handleClickStore(store);
              },
            }}
          >
            <Box>
              <Typography variant="body2">{store.name}</Typography>
              {store.isOpen && (
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    color: "primary.main",
                  }}
                >
                  <DeliveryDiningIcon sx={{ width: "1rem", height: "1rem" }} />
                  <Typography variant="body2">
                    {store.nextDeliveryTime} minutos
                  </Typography>
                </Box>
              )}
              {!store.isOpen && (
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    color: "text.disabled",
                  }}
                >
                  <StoreIcon sx={{ width: "1rem", height: "1rem" }} />
                  <Typography variant="body2">Cerrado</Typography>
                </Box>
              )}
            </Box>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
