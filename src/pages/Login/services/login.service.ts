import axios from "axios";
import UserSession from "../../../interfaces/UserSession";

const login = async (
  username: string,
  password: string
): Promise<UserSession> => {
  try {
    return {
      token: "BhMlsuLMq95r3zPbwMJePAfzdL2BL4JicpQ6jWmYPYBr6pzi18CkoVFsEcUBcG4S",
      userId: "userId12345",
    };
    const url = `${process.env.REACT_APP_AUTH_API_URL}/login`;
    const response = await axios.post(url, { username, password });
    return response.data;
  } catch (error: any) {
    const message = `Error at login ${error.message}`;
    console.error(message);
    throw new Error(message);
  }
};

const LoginService = { login };

export default LoginService;
