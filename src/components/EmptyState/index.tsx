import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <Container>
    <Typography variant="h6" align="center" sx={{ mt: 2 }}>
      {message}
    </Typography>
  </Container>
);

export default EmptyState;
