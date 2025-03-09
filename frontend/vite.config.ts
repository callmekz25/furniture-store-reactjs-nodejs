import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // optimizeDeps: {
  //   force: true, // Buộc reload lại dependencies
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
