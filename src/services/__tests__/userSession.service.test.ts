import Cookies from "js-cookie";
import UserSession from "../../interfaces/UserSession";
import UserSessionService from "../userSession.service";

jest.mock("js-cookie");

describe("UserSessionService", () => {
  const mockSession: UserSession = {
    token: "mockToken",
    userId: "mockUserId",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("setSession", () => {
    it("should set the session cookies with the correct values", () => {
      UserSessionService.setSession(mockSession);

      expect(Cookies.set).toHaveBeenCalledWith("token", mockSession.token, {
        expires: 1,
      });
      expect(Cookies.set).toHaveBeenCalledWith("userId", mockSession.userId, {
        expires: 1,
      });
    });
  });

  describe("getSession", () => {
    it("should return the session from cookies", () => {
      (Cookies.get as jest.Mock).mockImplementation((key: string) => {
        return mockSession[key as keyof UserSession] ?? "";
      });

      const session = UserSessionService.getSession();

      expect(session).toEqual(mockSession);
      expect(Cookies.get).toHaveBeenCalledWith("token");
      expect(Cookies.get).toHaveBeenCalledWith("userId");
    });

    it("should return an empty session if cookies are not set", () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      const session = UserSessionService.getSession();

      expect(session).toEqual({ token: "", userId: "" });
    });
  });

  describe("clearSession", () => {
    it("should clear the session by setting empty values in cookies", () => {
      UserSessionService.clearSession();

      expect(Cookies.set).toHaveBeenCalledWith("token", "", { expires: 1 });
      expect(Cookies.set).toHaveBeenCalledWith("userId", "", { expires: 1 });
    });
  });

  describe("hasSession", () => {
    it("should return true if session exists", () => {
      (Cookies.get as jest.Mock).mockImplementation((key: string) => {
        return mockSession[key as keyof UserSession] ?? "";
      });

      const result = UserSessionService.hasSession();

      expect(result).toBe(true);
    });

    it("should return false if session does not exist", () => {
      jest.spyOn(UserSessionService, "getSession").mockReturnValue({
        token: "",
        userId: "",
      });

      const result = UserSessionService.hasSession();

      expect(result).toBe(false);
    });
  });
});
