import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import theme from "../../config/theme";
import { useLogin } from "./hooks/UseLogin";

const LoginErrorDefaultState = {
  username: false,
  password: false,
};

const Login: React.FC = () => {
  const { handleLogin, loading, error } = useLogin();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState(LoginErrorDefaultState);

  const validateUsername = () => {
    if (!username) {
      setFormError((formErrorState) => ({ ...formErrorState, username: true }));
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setFormError((formErrorState) => ({ ...formErrorState, password: true }));
      return false;
    }
    return true;
  };

  const handleClickLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateUsername() && validatePassword()) {
      handleLogin(username, password);
    }
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setFormError((formErrorState) => ({ ...formErrorState, username: false }));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFormError((formErrorState) => ({ ...formErrorState, password: false }));
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom right, #fff 0%, #fff 50%, #79d89f 50%, ${theme.palette.primary.main} 100%)`,
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "434px",
          height: "80vh",
          borderRadius: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          alignItems: "center",
          pb: 3,
        }}
      >
        <Typography variant="h2" marginTop="4rem">
          Login
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            width: "350px",
          }}
        >
          <TextField
            error={formError.username}
            onChange={handleChangeUsername}
            value={username}
            type="text"
            label="Nombre de usuario"
            variant="outlined"
            name="username"
          />
          <TextField
            error={formError.password}
            onChange={handleChangePassword}
            value={password}
            type="password"
            label="Contraseña"
            variant="outlined"
            name="password"
          />
        </Box>
        <Button
          disabled={loading}
          onClick={handleClickLogin}
          size="large"
          variant="contained"
          sx={{ width: "165px" }}
          name="submit"
        >
          Login
        </Button>
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        <Typography variant="body2" sx={{ marginTop: "auto" }}>
          InstaStore
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
