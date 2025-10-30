import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserSession from "../../../interfaces/UserSession";
import UserSessionService from "../../../services/userSession.service";
import { Routes } from "../../../router/routes";

const { login } = AuthService;
const { setSession } = UserSessionService;

export enum UseLoginError {
  LOGIN_FAILED = "Login failed. Please check your credentials and try again.",
}

export const UseLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateLoginresponse = (response: UserSession) => {
    if (!response.token || !response.userId) {
      throw new Error(UseLoginError.LOGIN_FAILED);
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
