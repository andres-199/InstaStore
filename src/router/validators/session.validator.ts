import { redirect } from "react-router-dom";
import { UseUserSession } from "../../hooks/UseUserSession";
import { Routes } from "../routes";

const SessionValidator = () => {
  const { getSession } = UseUserSession();
  const session = getSession();
  if (session.userId && session.token) {
    return true;
  }
  return redirect(Routes.LOGIN);
};

export default SessionValidator;
