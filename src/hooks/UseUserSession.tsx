import Cookies from "js-cookie";
import UserSession from "../interfaces/UserSession";

enum UserSessionAttribute {
  TOKEN = "token",
  USER_ID = "userId",
}

export const UseUserSession = () => {
  const setCookies = (session: UserSession) => {
    Cookies.set(UserSessionAttribute.TOKEN, session.token, { expires: 1 });
    Cookies.set(UserSessionAttribute.USER_ID, session.userId, { expires: 1 });
  };

  const getFromCookies = () => {
    const token = Cookies.get(UserSessionAttribute.TOKEN) ?? "";
    const userId = Cookies.get(UserSessionAttribute.USER_ID) ?? "";
    return { token, userId };
  };

  const getSession = (): UserSession => {
    return getFromCookies();
  };

  const setSession = (session: UserSession) => {
    setCookies(session);
  };

  return { setSession, getSession };
};
