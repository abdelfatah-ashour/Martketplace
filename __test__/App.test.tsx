import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { mockCategories, mockProducts } from "../__mocks__/mockData";
import { config } from "../src/lib/config";
import Products from "../src/pages/Products";
import categoriesService from "../src/services/categoriesService";
import productsService from "../src/services/productsService";

const { apiUrl } = config;

afterAll(() => {
  cleanup();
});

const server = setupServer(
  http.get(`${apiUrl}/products`, () =>
    HttpResponse.json(mockProducts, { status: 200 })
  ),
  http.get(`${apiUrl}/products/categories`, () =>
    HttpResponse.json(mockCategories, { status: 200 })
  ),
  http.get(`${apiUrl}/products/category/${mockCategories[0]}`, () =>
    HttpResponse.json(mockCategories, { status: 200 })
  )
);

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
