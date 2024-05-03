// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { config } from "../src/lib/config";
import { mockCategories, mockProducts } from "./mockData";

const { apiUrl } = config;

export const handlers = [
  http.get(`${apiUrl}/products/categories`, () =>
    HttpResponse.json(mockCategories, { status: 200 })
  ),
  http.get(`${apiUrl}/products/category/${mockCategories[0]}`, () =>
    HttpResponse.json(mockProducts, { status: 200 })
  ),
];
