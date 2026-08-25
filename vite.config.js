import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        // vendor libs alag chunks me — better browser caching
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase") || id.includes("@firebase"))
              return "firebase";
            if (id.includes("motion") || id.includes("framer"))
              return "motion";
            if (id.includes("react")) return "react";
            return "vendor";
          }
        },
      },
    },
  },
});
