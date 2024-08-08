import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from ".";
import { useLogin } from "./hooks/UseLogin";

jest.mock("./hooks/UseLogin", () => ({
  useLogin: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      handleLogin: jest.fn(),
      loading: false,
      error: null,
    });
  });

  test("renders login form with username and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("shows error when username is empty and submit is clicked", () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    expect(screen.getByLabelText(/Username/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("shows error when password is empty and submit is clicked", () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    expect(screen.getByLabelText(/Password/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("calls handleLogin with correct credentials when form is valid", () => {
    const mockHandleLogin = jest.fn();
    (useLogin as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      loading: false,
      error: null,
    });

    render(<Login />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockHandleLogin).toHaveBeenCalledWith("testuser", "password123");
  });

  test("displays error message if error prop is not null", () => {
    (useLogin as jest.Mock).mockReturnValue({
      handleLogin: jest.fn(),
      loading: false,
      error: "Login failed",
    });

    render(<Login />);

    expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
  });
});
