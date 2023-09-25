import { render } from "@testing-library/react";
import UserModal from "./UserModal";

describe("UserModel Component", () => {
  it("should render without errors", () => {
    const { container } = render(<UserModal />);
    expect(container).toBeDefined();
  });
});
