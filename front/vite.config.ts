import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Aliases added in addition of tsconfig (https://stackoverflow.com/a/77249075)
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "."),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
  plugins: [react()],
});
