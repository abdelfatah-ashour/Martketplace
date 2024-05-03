// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { config } from "../src/lib/config";
import { mockCategories } from "./mockData";

const { apiUrl } = config;

export const handlers = [
  http.get(`${apiUrl}/products/categories`, async () => {
    return HttpResponse.json(mockCategories, { status: 200 });
  }),

  http.get(`${apiUrl}/products`, async () => {
    return HttpResponse.json(mockCategories, { status: 200 });
  }),
];
