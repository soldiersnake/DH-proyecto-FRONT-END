import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
});
