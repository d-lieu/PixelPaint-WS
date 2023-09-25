import { render } from "@testing-library/react";
import ColorPicker from "./ColorPicker";

describe("Color Picker Component", () => {
  it("should render without errors", () => {
    const { container } = render(<ColorPicker />);
    expect(container).toBeDefined();
  });
});
