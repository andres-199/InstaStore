import React from "react";
import Grid from "@mui/material/Grid";
import Store from "../../../../interfaces/Store";
import StoreItem from "./components/StoreItem";

interface StoreListProps {
  stores: Store[];
  onClickStore: (store: Store) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onClickStore }) => {
  return (
    <Grid container spacing={3}>
      {stores.map((store) => (
        <Grid
          data-testid="store-item"
          item
          xs={12}
          sm={6}
          md={4}
          key={store.id}
        >
          <StoreItem onClick={onClickStore} store={store} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoreList;
