import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/login.service";
import UserSession from "../../../interfaces/UserSession";
import { UseUserSession } from "../../../hooks/UseUserSession";
import { Routes } from "../../../router/routes";

const { login } = LoginService;

export const useLogin = () => {
  const { setSession } = UseUserSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateLoginresponse = (response: UserSession) => {
    if (!response.token || !response.userId) {
      throw new Error(
        "Login failed. Please check your credentials and try again."
      );
    }
    return true;
  };

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      const isSuccess = validateLoginresponse(response);
      if (isSuccess) {
        setSession(response);
        navigate(Routes.ORDER_LIST);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};
