import { redirect } from "react-router-dom";
import UserSessionService from "../../services/userSession.service";
import { Routes } from "../routes";

const SessionValidator = () => {
  const { hasSession } = UserSessionService;
  if (hasSession()) {
    return true;
  }
  return redirect(Routes.LOGIN);
};

export default SessionValidator;
