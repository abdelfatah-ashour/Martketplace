import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { server } from "../__mocks__/server";
import Products from "../src/pages/Products";
import categoriesService from "../src/services/categoriesService";
import productsService from "../src/services/productsService";

afterAll(() => {
  cleanup();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Products", () => {
  describe("Render", async () => {
    it("Categories filter must be render correctly.", () => {
      const elem = render(<Products />);
      expect(elem).toMatchSnapshot();
    });

    it("Categories filter must be contain heading 'Shop by category'", async () => {
      renderHook(productsService);
      const { getByRole } = await waitFor(() => render(<Products />));

      const elem = await getByRole("heading", { level: 2 }).innerHTML;
      expect(elem).toMatch(/shop by category/i);
    });

    it("Categories must be render correct", async () => {
      renderHook(categoriesService);

      const { getAllByRole } = await waitFor(() => render(<Products />));

      const buttons = getAllByRole("button").length;
      expect(buttons).toBeTruthy();
    });

    it("Products must be render correct", async () => {
      renderHook(productsService);

      const { getAllByRole } = await waitFor(() => render(<Products />));

      const buttons = getAllByRole("button").length;
      expect(buttons).toBeTruthy();
    });
  });

  describe("Behaviors", async () => {
    it("Fetch and render products when select a category", async () => {
      renderHook(productsService);
      const { findAllByRole } = await waitFor(() => render(<Products />));

      const btnCategories = await findAllByRole("button");

      fireEvent.click(btnCategories[0]);

      const products = await waitFor(
        () => findAllByRole("heading", { level: 3 }),
        {
          timeout: 3000,
        }
      );

      expect(products.length).toBeTruthy();
    });
  });
});
