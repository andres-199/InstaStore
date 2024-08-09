import axios from "axios";
import UserSession from "../../../interfaces/UserSession";
import UserSessionService from "../../../services/userSession.service";

const login = async (
  username: string,
  password: string
): Promise<UserSession> => {
  try {
    /*   return {
      token: "BhMlsuLMq95r3zPbwMJePAfzdL2BL4JicpQ6jWmYPYBr6pzi18CkoVFsEcUBcG4S",
      userId: "userId12345",
    }; */
    const url = `${process.env.REACT_APP_AUTH_API_URL}/login`;
    const response = await axios.post(url, { username, password });
    return response.data;
  } catch (error: any) {
    const message = `Error at login ${error.message}`;
    console.error(message);
    throw new Error(message);
  }
};

const logout = async (): Promise<void> => {
  try {
    const userSession = UserSessionService.getSession();
    const url = `${process.env.REACT_APP_AUTH_API_URL}/logout`;
    await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${userSession.token}`,
          "User-Id": userSession.userId,
        },
      }
    );
    UserSessionService.clearSession();
  } catch (error: any) {
    const message = `Error at logout ${error.message}`;
    console.error(message);
    throw new Error(message);
  }
};

const AuthService = { login, logout };

export default AuthService;
