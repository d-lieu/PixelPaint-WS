import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BrushSizeInput from "./BrushSizeInput";

// Mock the useContext hook for the UserContext
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("BrushSizeInput Component", () => {
  const userContextValue = {
    user: {
      name: "Test User",
      color: "blue",
      gridSize: 1,
    },
    setUser: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (React.useContext as jest.Mock).mockReturnValue(userContextValue);
  });

  it("renders correctly", () => {
    const { container, getByText } = render(<BrushSizeInput />);

    // Check if the component renders without errors
    expect(container).toBeDefined();

    // Check if the label "brush size" is present
    expect(getByText("brush size")).toBeInTheDocument();
  });

  it("updates gridSize on input change", () => {
    const { getByRole } = render(<BrushSizeInput />);
    const inputElement = getByRole("textbox");

    // Simulate a user typing a new value in the input field
    fireEvent.change(inputElement, { target: { value: "5" } });

    // Expect setUser to have been called with the updated gridSize
    expect(userContextValue.setUser).toHaveBeenCalledWith({
      ...userContextValue.user,
      gridSize: 5,
    });
  });
});
