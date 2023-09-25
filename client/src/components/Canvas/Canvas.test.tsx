import { render, fireEvent } from "@testing-library/react";
import Canvas from "./Canvas";
import { drawInitialCanvas } from "../../websocketHelpers/socketIO";

// Mock the UserContext module to provide mock values
jest.mock("../../hooks/UserContext", () => ({
  UserContext: { user: { color: "mockColor", gridSize: 1 }, socket: {} },
}));

// Mock the socket.io methods
jest.mock("../../websocketHelpers/socketIO", () => ({
  drawInitialCanvas: jest.fn(),
  listenForCanvasUpdates: jest.fn(),
  disconnectCanvasSockets: jest.fn(),
}));

describe("Canvas Component", () => {
  it("should render without errors", () => {
    const { container } = render(<Canvas />);
    expect(container).toBeDefined();
  });

  it("should draw on canvas when mouse events occur", () => {
    const { getByTestId } = render(<Canvas />);
    const canvas = getByTestId("canvas");

    fireEvent.mouseDown(canvas);
    fireEvent.mouseMove(canvas);
    fireEvent.mouseUp(canvas);

    // You can assert here that the canvas has been drawn as expected.
    // You might need to use testing utilities like pixel color comparisons.
  });
});
