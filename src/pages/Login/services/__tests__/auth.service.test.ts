import axios from "axios";
import AuthService from "../auth.service";
import UserSessionService from "../../../../services/userSession.service";

jest.mock("axios");
jest.mock("../../../../services/userSession.service");

const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
const mockGetSession = UserSessionService.getSession as jest.Mock;
const mockClearSession = UserSessionService.clearSession as jest.Mock;

describe("AuthService", () => {
  const username = "testuser";
  const password = "testpassword";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should make a POST request to the login API and return the response data", async () => {
      const apiResponse = {
        data: {
          token: "tokenFromApi",
          userId: "userIdFromApi",
        },
      };
      mockAxiosPost.mockResolvedValueOnce(apiResponse);

      const result = await AuthService.login(username, password);

      expect(mockAxiosPost).toHaveBeenCalledWith(
        `${process.env.REACT_APP_AUTH_API_URL}/login`,
        { username, password }
      );
      expect(result).toEqual(apiResponse.data);
    });

    it("should throw an error when the API request fails", async () => {
      const errorMessage = "Network Error";
      mockAxiosPost.mockRejectedValueOnce(new Error(errorMessage));
      jest.spyOn(console, "error").mockImplementation(() => {});
      await expect(AuthService.login(username, password)).rejects.toThrow(
        `Error at login ${errorMessage}`
      );
      expect(console.error).toHaveBeenCalledWith(
        `Error at login ${errorMessage}`
      );
    });
  });

  describe("logout", () => {
    const mockSession = {
      token: "mockToken",
      userId: "mockUserId",
    };

    beforeEach(() => {
      mockGetSession.mockReturnValue(mockSession);
    });

    it("should make a POST request to the logout API and clear the session", async () => {
      mockAxiosPost.mockResolvedValueOnce(undefined);

      await AuthService.logout();

      expect(mockAxiosPost).toHaveBeenCalledWith(
        `${process.env.REACT_APP_AUTH_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${mockSession.token}`,
            "User-Id": mockSession.userId,
          },
        }
      );
      expect(mockClearSession).toHaveBeenCalled();
    });

    it("should throw an error when the API request fails during logout", async () => {
      const errorMessage = "Logout Error";
      mockAxiosPost.mockRejectedValueOnce(new Error(errorMessage));
      jest.spyOn(console, "error").mockImplementation(() => {});

      await expect(AuthService.logout()).rejects.toThrow(
        `Error at logout ${errorMessage}`
      );
      expect(console.error).toHaveBeenCalledWith(
        `Error at logout ${errorMessage}`
      );
      expect(mockClearSession).not.toHaveBeenCalled();
    });
  });
});
