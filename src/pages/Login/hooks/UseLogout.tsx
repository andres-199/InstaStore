import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const { logout } = AuthService;

export const UseLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logout();
      navigate("/login");
    } catch (err: any) {
      const errorMessage = `Failed to logout: ${err.message}`;
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};
