import { render } from "@testing-library/react";
import ConnectedUsers from "./ConnectedUsers";

describe("ConnectedUsers Component", () => {
  it("should render without errors", () => {
    const { container } = render(<ConnectedUsers />);
    expect(container).toBeDefined();
  });
});
