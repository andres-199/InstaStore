import { renderHook, act } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserSessionService from "../../../../services/userSession.service";
import { UseLogin, UseLoginError } from "../UseLogin";
import { Routes } from "../../../../router/routes";
import UserSession from "../../../../interfaces/UserSession";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));
jest.mock("../../services/auth.service");
jest.mock("../../../../services/userSession.service");

const mockLogin = AuthService.login as jest.MockedFunction<
  typeof AuthService.login
>;
const mockSetSession = UserSessionService.setSession as jest.MockedFunction<
  typeof UserSessionService.setSession
>;

const mockUserSession: UserSession = {
  token: "mockToken",
  userId: "mockUserId",
};

const testuser = "testuser";
const password = "password";

describe("UseLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set loading to true while logging in", async () => {
    mockLogin.mockResolvedValueOnce(mockUserSession);

    const { result, waitForNextUpdate } = renderHook(() => UseLogin());

    act(() => {
      result.current.handleLogin(testuser, "testpassword");
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
  });

  it("should set session and navigate on successful login", async () => {
    mockLogin.mockResolvedValueOnce(mockUserSession);

    const { result, waitForNextUpdate } = renderHook(() => UseLogin());

    act(() => {
      result.current.handleLogin(testuser, "testpassword");
    });

    await waitForNextUpdate();

    expect(mockLogin).toHaveBeenCalledWith(testuser, "testpassword");
    expect(mockSetSession).toHaveBeenCalledWith(mockUserSession);
    expect(mockNavigate).toHaveBeenCalledWith(Routes.ORDER_LIST);
    expect(result.current.error).toBeNull();
  });

  it("should handle login failure with error message", async () => {
    const err = "Login failed";
    const mockError = new Error(err);
    mockLogin.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => UseLogin());

    act(() => {
      result.current.handleLogin(testuser, password);
    });

    await waitForNextUpdate();

    expect(mockLogin).toHaveBeenCalledWith(testuser, password);
    expect(result.current.error).toBe(err);
    expect(result.current.loading).toBe(false);
  });

  it("should throw an error if login response is invalid", async () => {
    const invalidSession = { token: "", userId: "" };
    mockLogin.mockResolvedValueOnce(invalidSession as UserSession);

    const { result, waitForNextUpdate } = renderHook(() => UseLogin());

    act(() => {
      result.current.handleLogin(testuser, "testpassword");
    });

    await waitForNextUpdate();

    expect(result.current.error).toBe(UseLoginError.LOGIN_FAILED);
    expect(result.current.loading).toBe(false);
    expect(mockSetSession).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
