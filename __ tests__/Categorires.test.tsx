import { cleanup, render } from "@testing-library/react";
import CategoriesFilter from "../src/components/CategoriesFilter";
import { mockFetch } from "./mocks";

window.fetch = mockFetch();

jest.mock("../src/lib/config.ts", () => ({
  config: {
    apiUrl: "https://fakestoreapi.com",
  },
}));

afterEach(() => {
  cleanup();
});

describe("Categories", () => {
  describe("Render", () => {
    it("Categories must be contain heading 'Shop by category'", () => {
      const { getByRole } = render(<CategoriesFilter />);

      expect(getByRole("heading", { level: 2 }).innerHTML).toMatch(
        /shop by category/i
      );
    });
  });
});
