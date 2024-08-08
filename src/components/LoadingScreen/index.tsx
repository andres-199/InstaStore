import react from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.1,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingScreen;
