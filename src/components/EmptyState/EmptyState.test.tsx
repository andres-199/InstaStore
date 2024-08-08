import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from ".";
import "@testing-library/jest-dom/extend-expect";

describe("EmptyState Component", () => {
  it("should render the message prop correctly", () => {
    const testMessage = "No hay datos disponibles";
    render(<EmptyState message={testMessage} />);
    const messageElement = screen.getByText(testMessage);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent(testMessage);
  });
});
