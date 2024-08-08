import { redirect } from "react-router-dom";
import UserSessionService from "../../services/userSession.service";
import { Routes } from "../routes";

const LoginValidator = () => {
  const { hasSession } = UserSessionService;
  if (hasSession()) {
    return redirect(Routes.ORDER_LIST);
  }
  return true;
};

export default LoginValidator;
