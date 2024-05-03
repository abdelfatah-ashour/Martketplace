// __mocks__/vitest-env.d.ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/lib/setup-jsdom.ts",
    css: true,
  },
});
