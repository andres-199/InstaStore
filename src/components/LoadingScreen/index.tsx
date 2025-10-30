import react from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

interface LoadingScreenProps {
  sx?: SxProps<Theme>;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.4,
        ...sx,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingScreen;
