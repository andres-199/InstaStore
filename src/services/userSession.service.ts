import Cookies from "js-cookie";
import UserSession from "../interfaces/UserSession";

enum UserSessionAttribute {
  TOKEN = "token",
  USER_ID = "userId",
}

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

const clearSession = () => {
  setSession({ token: "", userId: "" });
};

const hasSession = () => {
  const session = getSession();
  return !!session.token && !!session.userId;
};

const UserSessionService = { setSession, getSession, hasSession, clearSession };
export default UserSessionService;
