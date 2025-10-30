import { renderHook, act } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { UseLogout } from "../../hooks/UseLogout";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../services/auth.service", () => ({
  logout: jest.fn(),
}));

describe("UseLogout", () => {
  const mockLogout = AuthService.logout as jest.Mock;

  beforeEach(() => {
    mockNavigate.mockReset();
    mockLogout.mockReset();
  });

  test("should initialize with default values", () => {
    const { result } = renderHook(() => UseLogout());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("should call AuthService.logout and navigate to /login on success", async () => {
    mockLogout.mockResolvedValueOnce(undefined);

    const { result, waitForNextUpdate } = renderHook(() => UseLogout());

    act(() => {
      result.current.handleLogout();
    });

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should set error if logout fails", async () => {
    const errorMessage = "Logout failed";
    mockLogout.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => UseLogout());

    act(() => {
      result.current.handleLogout();
    });

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(`Failed to logout: ${errorMessage}`);
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
